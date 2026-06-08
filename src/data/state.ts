import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  AccountPull,
  FrenchieState,
  HealthEntry,
  HeatReading,
  LifeStage,
  Medication,
  MemoryEntry,
  MoodScan,
  PupAccount,
  PupProfile,
  SafetyLevel,
} from "../types";
import { isNameTaken, pullPup, pushPup, registerPup, deletePup } from "../services/supabase";
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

const profile: PupProfile = {
  id: makeId(),
  name: "Mochi",
  ownerName: "Heather",
  weightLbs: 24.2,
  birthDate: new Date(2021, 5, 14).toISOString(),
  hasBreathingNotes: true,
  breathingNotes: "Mild snoring at night. Avoid long walks above 78 F.",
  avatarSymbol: "paw",
  isPremium: false,
  subscriptionStatus: "trial",
  onboardingCompleted: true,
  createdAt: now(),
  updatedAt: now(),
};

const seedHeat = (): HeatReading[] => {
  const reading = { temperatureF: 76, humidity: 58 };
  return [
    {
      id: makeId(),
      date: now(),
      ...reading,
      ...evaluateHeat(reading.temperatureF, reading.humidity),
    },
  ];
};

export const createInitialState = (): FrenchieState => ({
  profile,
  healthEntries: [
    {
      id: makeId(),
      date: new Date(Date.now() - 86400000).toISOString(),
      breathingEffort: 0.32,
      snoringLevel: 0.42,
      sleepHours: 12.5,
      weightLbs: 24.2,
      activity: "Moderate",
      note: "Easy breathing after a shaded morning walk.",
    },
    {
      id: makeId(),
      date: new Date(Date.now() - 86400000 * 3).toISOString(),
      breathingEffort: 0.48,
      snoringLevel: 0.56,
      sleepHours: 11.8,
      weightLbs: 24,
      activity: "Low",
      note: "Warm afternoon. Swapped walk for indoor games.",
    },
  ],
  memories: [
    {
      id: makeId(),
      date: new Date(Date.now() - 86400000 * 2).toISOString(),
      caption: "First patio brunch of the season, parked under the fan.",
      stage: "Adult",
      milestone: "Calm outing",
      symbol: "camera",
      colorHex: 0xd8b0a6,
    },
    {
      id: makeId(),
      date: new Date(Date.now() - 86400000 * 12).toISOString(),
      caption: "Graduated from the tiny harness to the sage walking set.",
      stage: "Puppyhood",
      milestone: "New gear",
      symbol: "ribbon",
      colorHex: 0x98bfa5,
    },
  ],
  medications: [
    {
      id: makeId(),
      name: "Joint support",
      dosage: "1 chew",
      schedule: "Morning with breakfast",
      givenToday: true,
      dueTime: new Date().toISOString(),
    },
  ],
  moodScans: [
    {
      id: makeId(),
      date: now(),
      moodTitle: "Cozy supervisor",
      moodEmoji: "Calm",
      confidence: 0.91,
      summary: "Relaxed posture, soft eyes, and low energy. Great day for calm enrichment.",
      energyTag: "Low-key",
      note: "Mock scan generated locally.",
    },
  ],
  heatReadings: seedHeat(),
  horoscope: {
    id: makeId(),
    date: now(),
    starSign: "Gemini Frenchie",
    title: "Snack diplomacy wins today",
    body: "Mochi's charm is unusually persuasive. Keep training rewards tiny and frequent, then bank a quiet nap before the warmest part of the day.",
    tip: "Check pavement with the back of your hand before any afternoon outing.",
    saved: true,
  },
  walkTimer: { active: false, seconds: 0 },
  account: null,
  syncStatus: "local",
  syncMessage: "Local mode. Create an account to sync this pup across devices.",
  paywallSeen: false,
});

const mergeUnique = <T extends { id: string }>(local: T[], incoming: T[]) => {
  const ids = new Set(local.map((item) => item.id));
  return [...local, ...incoming.filter((item) => !ids.has(item.id))];
};

const fromPull = (pull: AccountPull, fallbackName: string, passcode: string): FrenchieState => {
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
    : { ...fallback.profile, name: fallbackName, ownerName: pull.owner_name ?? "", userId: pull.account_id };

  const account: PupAccount = {
    accountId: pull.account_id,
    name: fallbackName,
    passcode,
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
    AsyncStorage.getItem(STORAGE_KEY)
      .then(async (saved) => {
        if (saved && mounted) {
          const restored = JSON.parse(saved) as FrenchieState;
          setState(restored);
          // Initialize RevenueCat with stored account if available
          await configureRevenueCat(restored.account?.accountId);
          if (restored.account) {
            await identifyUser(restored.account.accountId);
            const isPremium = await checkPremium();
            if (isPremium && mounted) {
              setState((s) => ({
                ...s,
                profile: { ...s.profile, subscriptionStatus: "premium", isPremium: true },
              }));
            }
          }
        } else {
          await configureRevenueCat();
        }
      })
      .catch(() => undefined)
      .finally(() => mounted && setReady(true));
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
    setState((value) => ({ ...value, syncStatus: "syncing", syncMessage: "Syncing Frenchie Buddy with the cloud..." }));
    if (!current.account) {
      setState((value) => ({ ...value, syncStatus: "local", syncMessage: "Sign in to sync this pup." }));
      return;
    }
    try {
      await pushPup(
        current.account.name,
        current.account.passcode,
        current.account.accountId,
        current.profile,
        current.healthEntries,
        current.memories,
        current.medications,
        current.moodScans,
        current.heatReadings
      );
      const pulled = await pullPup(current.account.name, current.account.passcode);
      const remote = fromPull(pulled, current.account.name, current.account.passcode);
      setState((value) => ({
        ...value,
        healthEntries: mergeUnique(value.healthEntries, remote.healthEntries),
        memories: mergeUnique(value.memories, remote.memories),
        medications: mergeUnique(value.medications, remote.medications),
        moodScans: mergeUnique(value.moodScans, remote.moodScans),
        heatReadings: mergeUnique(value.heatReadings, remote.heatReadings),
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
      scanMood(note: string) {
        const moods = [
          ["Zoomie diplomat", "Play", "High spark, playful face, and a strong case for five-minute games.", "Playful"],
          ["Cozy supervisor", "Calm", "Relaxed posture and soft eyes. Keep the day gentle and predictable.", "Calm"],
          ["Snack detective", "Focus", "Alert expression and bright focus. Training treats may be unusually persuasive.", "Curious"],
        ] as const;
        const pick = moods[Math.floor(Math.random() * moods.length)];
        patch((current) => ({
          ...current,
          moodScans: [
            {
              id: makeId(),
              date: now(),
              moodTitle: pick[0],
              moodEmoji: pick[1],
              confidence: 0.88 + Math.random() * 0.08,
              summary: pick[2],
              energyTag: pick[3],
              note: note.trim() || "Mock mood scan generated locally.",
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
        await deletePup(current.account.name, current.account.passcode);
        await logOutRevenueCat();
        await AsyncStorage.removeItem(STORAGE_KEY);
        setState({
          ...createInitialState(),
          account: null,
          syncStatus: "local",
          syncMessage: "Account deleted. All cloud data has been removed.",
        });
      },
      async signOut() {
        await logOutRevenueCat();
        patch((current) => ({
          ...createInitialState(),
          account: null,
          syncStatus: "local",
          syncMessage: current.account ? "Signed out. Local sample data is ready for the next pup." : current.syncMessage,
        }));
      },
      async signUp(name: string, passcode: string, ownerName: string) {
        if (!name.trim()) throw new Error("Please enter your Frenchie's name.");
        if (passcode.length < 6) throw new Error("Please choose a passcode of at least 6 characters.");
        const taken = await isNameTaken(name);
        if (taken) throw new Error("That Frenchie name is already taken.");
        const accountId = await registerPup(name, passcode, ownerName);
        await identifyUser(accountId);
        setState((current) => ({
          ...current,
          profile: { ...current.profile, name: name.trim(), ownerName: ownerName.trim(), userId: accountId, updatedAt: now() },
          account: { accountId, name: name.trim(), passcode, ownerName: ownerName.trim() },
          syncStatus: "synced",
          syncMessage: "Account created. Syncing your local pup next.",
        }));
      },
      async signIn(name: string, passcode: string) {
        if (!name.trim()) throw new Error("Please enter your Frenchie's name.");
        if (passcode.length < 6) throw new Error("Please enter the account passcode (6+ characters).");
        const pulled = await pullPup(name, passcode);
        await identifyUser(pulled.account_id);
        const isPremium = await checkPremium();
        const restored = fromPull(pulled, name.trim(), passcode);
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
