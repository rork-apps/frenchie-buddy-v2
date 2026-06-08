import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AccountPull,
  FrenchieState,
  HealthEntry,
  LifeStage,
  PupAccount,
  PupProfile,
  SafetyLevel,
} from "../types";
import {
  signUpEmail,
  signInEmail,
  signOut as sbSignOut,
  getSession,
  pullSnapshot,
  pushSnapshot,
  deleteAccount as sbDeleteAccount,
  type Session,
} from "../services/supabase";
import {
  configureRevenueCat,
  identifyUser,
  checkPremium,
  restorePurchases as rcRestorePurchases,
  logOutRevenueCat,
} from "../services/revenuecat";

const STORAGE_KEY = "frenchie_buddy.state.v1";

const now = () => new Date().toISOString();
export const makeId = () => "id-" + Math.random().toString(36).slice(2) + "-" + Date.now().toString(36);

const clamp = (value: number, min: number, max: number, fallback: number) => {
  if (!Number.isFinite(value)) return fallback;
  return Math.min(Math.max(value, min), max);
};

const heatLevel = (temperatureF: number, humidity: number): SafetyLevel => {
  const risk = temperatureF + humidity * 0.32;
  if (temperatureF >= 88 || risk >= 110) return "Danger";
  if (temperatureF >= 78 || risk >= 96) return "Caution";
  return "Safe";
};

export const evaluateHeat = (temperatureF: number, humidity: number) => {
  const level = heatLevel(temperatureF, humidity);
  const conditionLabel =
    level === "Safe"
      ? "Short walks are reasonable. Bring water and watch breathing."
      : level === "Caution"
        ? "Keep the walk brief, shaded, and slow. Stop if panting ramps up."
        : "Skip the walk. Try indoor enrichment and cool-down time.";
  return { level, conditionLabel };
};

// Empty profile defaults — the user fills these at onboarding. NO seeded sample dog.
const emptyProfile: PupProfile = {
  id: makeId(),
  name: "",
  ownerName: "",
  weightLbs: 0,
  birthDate: now(),
  hasBreathingNotes: false,
  breathingNotes: "",
  avatarSymbol: "paw",
  isPremium: false,
  subscriptionStatus: "free",
  onboardingCompleted: false,
  createdAt: now(),
  updatedAt: now(),
};

// Static bundled content (the daily tip rotates through real, breed-accurate care
// guidance — this is shipped content, NOT fabricated user data).
const DAILY_TIPS = [
  { starSign: "Today's care note", title: "Pavement check first", body: "Press the back of your hand to the sidewalk for 7 seconds. If it's too hot for you, it's too hot for your Frenchie's paws and breathing.", tip: "Walk in early morning or after sunset on warm days." },
  { starSign: "Today's care note", title: "Short sniff, big win", body: "A slow 10-minute sniff route is more enriching — and far safer in the heat — than a long fast walk for a flat-faced breed.", tip: "Let the nose lead; cool down indoors right after." },
  { starSign: "Today's care note", title: "Watch the breathing", body: "Loud, fast, or labored breathing after light activity is your cue to stop and cool down. Frenchies can't shed heat by panting as well as other breeds.", tip: "Offer water and shade at the first sign of effort." },
] as const;

const tipForToday = () => {
  const day = Math.floor(Date.parse(now()) / 86400000) % DAILY_TIPS.length;
  const pick = DAILY_TIPS[day];
  return { id: makeId(), date: now(), starSign: pick.starSign, title: pick.title, body: pick.body, tip: pick.tip, saved: true };
};

export const createInitialState = (): FrenchieState => ({
  profile: emptyProfile,
  healthEntries: [],
  memories: [],
  medications: [],
  moodScans: [],
  heatReadings: [],
  horoscope: tipForToday(),
  walkTimer: { active: false, seconds: 0 },
  account: null,
  syncStatus: "local",
  syncMessage: "Create an account to sync your Frenchie across devices.",
  paywallSeen: false,
});

const fromPull = (pull: AccountPull, session: Session): FrenchieState => {
  const fallback = createInitialState();
  const pulledProfile = pull.profile;
  const nextProfile: PupProfile = pulledProfile
    ? {
        id: pulledProfile.id,
        userId: pull.account_id,
        name: pulledProfile.name,
        ownerName: pulledProfile.owner_name ?? pull.owner_name ?? "",
        weightLbs: clamp(pulledProfile.weight_lbs, 1, 250, 24),
        birthDate: pulledProfile.birth_date,
        hasBreathingNotes: pulledProfile.has_breathing_notes ?? true,
        breathingNotes: pulledProfile.breathing_notes ?? "",
        avatarSymbol: pulledProfile.avatar_symbol ?? "paw",
        isPremium: pulledProfile.is_premium,
        subscriptionStatus: pulledProfile.is_premium ? "premium" : "free",
        onboardingCompleted: true,
        createdAt: pulledProfile.created_at ?? now(),
        updatedAt: pulledProfile.updated_at ?? now(),
      }
    : { ...fallback.profile, name: "", ownerName: pull.owner_name ?? "", userId: session.userId, onboardingCompleted: true };

  const account: PupAccount = {
    accountId: session.userId,
    email: session.email,
    name: nextProfile.name,
    ownerName: nextProfile.ownerName,
  };

  return {
    ...fallback,
    profile: nextProfile,
    account,
    healthEntries: (pull.health ?? []).map((entry) => ({
      id: entry.id,
      userId: entry.user_id,
      date: entry.date,
      breathingEffort: clamp(entry.breathing_effort, 0, 1, 0.35),
      snoringLevel: clamp(entry.snoring_level, 0, 1, 0.4),
      sleepHours: clamp(entry.sleep_hours, 0, 24, 12),
      weightLbs: clamp(entry.weight_lbs, 1, 250, 24),
      activity: entry.activity === "Low" || entry.activity === "High" ? entry.activity : "Moderate",
      note: entry.note,
    })),
    memories: (pull.memories ?? []).map((entry) => ({
      id: entry.id,
      userId: entry.user_id,
      date: entry.date,
      caption: entry.caption,
      stage: (["Puppyhood", "Adult", "Senior"].includes(entry.stage) ? entry.stage : "Adult") as LifeStage,
      milestone: entry.milestone,
      symbol: entry.symbol,
      colorHex: entry.color_hex,
    })),
    medications: (pull.medications ?? []).map((entry) => ({
      id: entry.id,
      userId: entry.user_id,
      name: entry.name,
      dosage: entry.dosage,
      schedule: entry.schedule,
      givenToday: entry.given_today,
      dueTime: entry.due_time,
    })),
    moodScans: (pull.moods ?? []).map((entry) => ({
      id: entry.id,
      userId: entry.user_id,
      date: entry.date,
      moodTitle: entry.mood_title,
      moodEmoji: entry.mood_emoji,
      confidence: clamp(entry.confidence, 0, 1, 0.9),
      summary: entry.summary,
      energyTag: entry.energy_tag,
      note: entry.note,
    })),
    heatReadings: (pull.heat_readings ?? []).map((entry) => ({
      id: entry.id,
      userId: entry.user_id,
      date: entry.date,
      temperatureF: clamp(entry.temperature_f, -100, 180, 72),
      humidity: clamp(entry.humidity, 0, 100, 45),
      level: entry.level === "Caution" || entry.level === "Danger" ? entry.level : "Safe",
      conditionLabel: entry.condition_label,
    })),
    syncStatus: "synced",
    syncMessage: "Cloud data restored.",
  };
};

export const useFrenchieStore = () => {
  const [state, setState] = useState<FrenchieState>(() => createInitialState());
  const stateRef = useRef(state);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        // 1. Restore cached state for instant (offline-friendly) first paint.
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved && mounted) setState(JSON.parse(saved) as FrenchieState);
        // 2. Reconcile against the real Supabase Auth session.
        const session = await getSession();
        await configureRevenueCat(session?.userId);
        if (!session) {
          if (mounted) setState((s) => ({ ...s, account: null }));
          return;
        }
        await identifyUser(session.userId);
        try {
          const pulled = await pullSnapshot();
          const remote = fromPull(pulled, session);
          const isPremium = await checkPremium();
          if (mounted)
            setState((s) => ({
              ...s,
              account: remote.account,
              profile: isPremium ? { ...remote.profile, subscriptionStatus: "premium", isPremium: true } : remote.profile,
              healthEntries: remote.healthEntries,
              memories: remote.memories,
              medications: remote.medications,
              moodScans: remote.moodScans,
              heatReadings: remote.heatReadings,
              syncStatus: "synced",
              syncMessage: "Last synced just now.",
            }));
        } catch {
          // Offline: keep cached data, but trust the session for the auth gate.
          if (mounted)
            setState((s) => ({
              ...s,
              account: s.account ?? { accountId: session.userId, email: session.email, name: s.profile.name, ownerName: s.profile.ownerName },
              syncStatus: "failed",
              syncMessage: "You're offline. Showing your last saved data.",
            }));
        }
      } catch {
        // ignore — fall through to ready
      } finally {
        if (mounted) setReady(true);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (ready) void AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [ready, state]);

  const patch = useCallback((recipe: (current: FrenchieState) => FrenchieState) => {
    setState((current) => recipe(current));
  }, []);

  const sync = useCallback(async () => {
    const current = stateRef.current;
    if (!current.account) {
      setState((value) => ({ ...value, syncStatus: "local", syncMessage: "Create an account to sync your Frenchie." }));
      return;
    }
    setState((value) => ({ ...value, syncStatus: "syncing", syncMessage: "Syncing with the cloud…" }));
    try {
      // Push local state, then take the server's merged snapshot as the source of truth.
      const pulled = await pushSnapshot(
        current.profile,
        current.healthEntries,
        current.memories,
        current.medications,
        current.moodScans,
        current.heatReadings,
      );
      const remote = fromPull(pulled, { userId: current.account.accountId, email: current.account.email });
      setState((value) => ({
        ...value,
        profile: { ...remote.profile, subscriptionStatus: value.profile.subscriptionStatus, isPremium: value.profile.isPremium },
        healthEntries: remote.healthEntries,
        memories: remote.memories,
        medications: remote.medications,
        moodScans: remote.moodScans,
        heatReadings: remote.heatReadings,
        syncStatus: "synced",
        syncMessage: "Last synced just now.",
      }));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Sync failed.";
      setState((value) => ({ ...value, syncStatus: "failed", syncMessage: message }));
    }
  }, []);

  const actions = useMemo(
    () => ({
      setHeat(temperatureF: number, humidity: number) {
        const reading = { id: makeId(), date: now(), temperatureF, humidity, ...evaluateHeat(temperatureF, humidity) };
        patch((current) => ({ ...current, heatReadings: [reading, ...current.heatReadings].slice(0, 20) }));
      },
      addHealth(entry: Omit<HealthEntry, "id" | "date">) {
        patch((current) => ({
          ...current,
          profile: { ...current.profile, weightLbs: entry.weightLbs, updatedAt: now() },
          healthEntries: [{ id: makeId(), date: now(), ...entry }, ...current.healthEntries],
        }));
      },
      toggleMedication(id: string) {
        patch((current) => ({
          ...current,
          medications: current.medications.map((med) => (med.id === id ? { ...med, givenToday: !med.givenToday } : med)),
        }));
      },
      addMedication(name: string) {
        if (!name.trim()) return;
        patch((current) => ({
          ...current,
          medications: [
            {
              id: makeId(),
              name: name.trim(),
              dosage: "As directed",
              schedule: "Daily reminder",
              givenToday: false,
              dueTime: now(),
            },
            ...current.medications,
          ],
        }));
      },
      addMemory(caption: string, stage: LifeStage) {
        if (!caption.trim()) return;
        patch((current) => ({
          ...current,
          memories: [
            {
              id: makeId(),
              date: now(),
              caption: caption.trim(),
              stage,
              milestone: stage === "Puppyhood" ? "Growing up" : "Daily joy",
              symbol: "camera",
              colorHex: stage === "Senior" ? 0xc9b49b : 0xd8b0a6,
            },
            ...current.memories,
          ],
        }));
      },
      // Manual mood log — the OWNER records how their Frenchie seems today.
      // No AI/photo analysis (constitution: no in-app AI). Real, user-entered data.
      logMood(mood: { moodTitle: string; energyTag: string; summary: string; note: string }) {
        if (!mood.moodTitle.trim()) return;
        patch((current) => ({
          ...current,
          moodScans: [
            {
              id: makeId(),
              date: now(),
              moodTitle: mood.moodTitle,
              moodEmoji: mood.energyTag,
              confidence: 1,
              summary: mood.summary,
              energyTag: mood.energyTag,
              note: mood.note.trim(),
            },
            ...current.moodScans,
          ],
        }));
      },
      refreshHoroscope() {
        const variants = [
          ["Nap timing is strategy", "The stars favor a cool-room reset before social plans. Choose shade first, compliments second."],
          ["Tiny walk, big confidence", "A short sniff route will feel richer than distance today. Let the nose lead, then cool down early."],
          ["Snack diplomacy wins today", "Training rewards work best in tiny bursts. Keep the mood light and the pavement test honest."],
        ] as const;
        const pick = variants[Math.floor(Math.random() * variants.length)];
        patch((current) => ({
          ...current,
          horoscope: { ...current.horoscope, id: makeId(), date: now(), title: pick[0], body: pick[1], saved: true },
        }));
      },
      startWalk() {
        patch((current) => ({ ...current, walkTimer: { active: true, startedAt: now(), seconds: 0 } }));
      },
      stopWalk() {
        patch((current) => ({ ...current, walkTimer: { active: false, seconds: current.walkTimer.seconds } }));
      },
      tickWalk() {
        patch((current) =>
          current.walkTimer.active
            ? { ...current, walkTimer: { ...current.walkTimer, seconds: current.walkTimer.seconds + 1 } }
            : current
        );
      },
      async restorePurchases(): Promise<boolean> {
        const isPremium = await rcRestorePurchases();
        if (isPremium) {
          patch((current) => ({
            ...current,
            profile: { ...current.profile, subscriptionStatus: "premium", isPremium: true },
          }));
        }
        return isPremium;
      },
      setPremiumStatus(status: "free" | "trial" | "premium") {
        patch((current) => ({
          ...current,
          paywallSeen: true,
          profile: { ...current.profile, subscriptionStatus: status, isPremium: status === "premium" },
        }));
      },
      async deleteAccount() {
        const current = stateRef.current;
        if (!current.account) throw new Error("No account to delete.");
        await sbDeleteAccount();
        await logOutRevenueCat();
        await AsyncStorage.removeItem(STORAGE_KEY);
        setState({
          ...createInitialState(),
          account: null,
          syncStatus: "local",
          syncMessage: "Account deleted. All your data has been removed.",
        });
      },
      async signOut() {
        await sbSignOut();
        await logOutRevenueCat();
        await AsyncStorage.removeItem(STORAGE_KEY);
        setState({
          ...createInitialState(),
          account: null,
          syncStatus: "local",
          syncMessage: "Signed out.",
        });
      },
      // signUp(email, password, pupName, ownerName) — real Supabase Auth.
      async signUp(email: string, password: string, pupName: string, ownerName: string) {
        if (!email.trim()) throw new Error("Please enter your email.");
        if (password.length < 6) throw new Error("Password must be at least 6 characters.");
        if (!pupName.trim()) throw new Error("Please enter your Frenchie's name.");
        const session = await signUpEmail(email, password);
        await identifyUser(session.userId);
        const profile: PupProfile = {
          ...createInitialState().profile,
          name: pupName.trim(),
          ownerName: ownerName.trim(),
          userId: session.userId,
          onboardingCompleted: true,
          updatedAt: now(),
        };
        // Create the profile row on the server immediately.
        await pushSnapshot(profile, [], [], [], [], []);
        setState((current) => ({
          ...current,
          profile,
          account: { accountId: session.userId, email: session.email, name: pupName.trim(), ownerName: ownerName.trim() },
          syncStatus: "synced",
          syncMessage: "Account created.",
        }));
      },
      async signIn(email: string, password: string) {
        if (!email.trim()) throw new Error("Please enter your email.");
        if (!password) throw new Error("Please enter your password.");
        const session = await signInEmail(email, password);
        await identifyUser(session.userId);
        const pulled = await pullSnapshot();
        const isPremium = await checkPremium();
        const restored = fromPull(pulled, session);
        if (isPremium) {
          restored.profile.subscriptionStatus = "premium";
          restored.profile.isPremium = true;
        }
        setState(restored);
      },
      sync,
    }),
    [patch, sync]
  );

  return { state, ready, actions };
};
