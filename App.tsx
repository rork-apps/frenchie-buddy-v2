import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Linking,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { HEALTH_DISCLAIMER, premiumBenefits } from "./src/data/templates";
import { evaluateHeat, useFrenchieStore } from "./src/data/state";
import { colors } from "./src/theme/colors";
import type { LifeStage } from "./src/types";
import {
  getPackages,
  purchasePackage,
  type OfferingPackages,
} from "./src/services/revenuecat";
import {
  Screen,
  Gauge,
  Stepper,
  Metric,
  Progress,
  MoodCard,
  ActionButton,
  ActionPill,
  SettingsRow,
  Field,
  EmptyState,
  levelBorder,
  styles,
  onboard,
} from "./src/components/ui";

// ── Legal URLs (replace with real customer URLs before release) ──
const PRIVACY_URL = "https://frenchiebuddy.com/privacy";
const TERMS_URL = "https://frenchiebuddy.com/terms";
const SUPPORT_URL = "https://frenchiebuddy.com/support";

// ── Types ──
type Tab = "safety" | "pulse" | "health" | "journal" | "profile";
type Sheet = "auth" | "health" | "memory" | "medication" | "mood" | "paywall" | null;

type ScreenProps = {
  state: ReturnType<typeof useFrenchieStore>["state"];
  actions: ReturnType<typeof useFrenchieStore>["actions"];
  open: (sheet: Sheet) => void;
};

// ── Tab config ──
const tabs: { id: Tab; label: string; icon: React.ComponentProps<typeof Ionicons>["name"] }[] = [
  { id: "safety", label: "Safety", icon: "speedometer-outline" },
  { id: "pulse", label: "Pulse", icon: "sparkles-outline" },
  { id: "health", label: "Health", icon: "medical-outline" },
  { id: "journal", label: "Journal", icon: "book-outline" },
  { id: "profile", label: "Profile", icon: "person-circle-outline" },
];

// ══════════════════════════════════════════════════════════════════
// Onboarding flow
// ══════════════════════════════════════════════════════════════════

type OnboardingStep = "welcome" | "signup" | "signin";

const ONBOARDING_FEATURES = [
  { icon: "speedometer-outline" as const, title: "Heat Safety Meter", desc: "Know when it's too hot to walk before you step outside." },
  { icon: "medical-outline" as const, title: "Breathing & Health Log", desc: "Track breathing effort, weight, sleep, and medications daily." },
  { icon: "book-outline" as const, title: "Memory Journal", desc: "Capture milestones and favorite moments across every life stage." },
  { icon: "sparkles-outline" as const, title: "Daily Pulse & Mood", desc: "Breed-specific care tips and mood tracking for your Frenchie." },
];

const OnboardingScreen = ({ actions }: { actions: ReturnType<typeof useFrenchieStore>["actions"] }) => {
  const [step, setStep] = useState<OnboardingStep>("welcome");
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const handleSignUp = async () => {
    setBusy(true);
    setError("");
    try {
      await actions.signUp(name, passcode, owner);
      await actions.sync();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const handleSignIn = async () => {
    setBusy(true);
    setError("");
    try {
      await actions.signIn(name, passcode);
      await actions.sync();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign in failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  if (step === "welcome") {
    return (
      <View style={styles.app}>
        <StatusBar style="dark" />
        <ScrollView
          style={styles.screen}
          contentContainerStyle={onboard.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={onboard.hero}>
            <View style={onboard.logoCircle}>
              <Ionicons name="paw" size={48} color={colors.primary} />
            </View>
            <Text style={onboard.appTitle}>Frenchie Buddy</Text>
            <Text style={onboard.tagline}>
              The care companion built for flat-faced breeds.
            </Text>
          </View>

          {ONBOARDING_FEATURES.map((f) => (
            <View key={f.title} style={onboard.featureRow}>
              <View style={onboard.featureIcon}>
                <Ionicons name={f.icon} size={22} color={colors.primary} />
              </View>
              <View style={onboard.featureText}>
                <Text style={onboard.featureTitle}>{f.title}</Text>
                <Text style={onboard.featureDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}

          <View style={onboard.buttonGroup}>
            <ActionButton
              icon="paw-outline"
              label="Create an account"
              onPress={() => { setStep("signup"); setError(""); }}
            />
            <ActionButton
              icon="log-in-outline"
              label="I already have an account"
              onPress={() => { setStep("signin"); setError(""); }}
              secondary
            />
          </View>

          <View style={styles.legalRow}>
            <Pressable onPress={() => Linking.openURL(TERMS_URL)}>
              <Text style={styles.legalLink}>Terms</Text>
            </Pressable>
            <Text style={styles.legalDot}> · </Text>
            <Pressable onPress={() => Linking.openURL(PRIVACY_URL)}>
              <Text style={styles.legalLink}>Privacy</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    );
  }

  if (step === "signup") {
    return (
      <View style={styles.app}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={{ flex: 1 }}
        >
          <ScrollView
            style={styles.screen}
            contentContainerStyle={onboard.container}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Pressable onPress={() => setStep("welcome")} style={onboard.backButton}>
              <Ionicons name="arrow-back" size={22} color={colors.primary} />
              <Text style={onboard.backText}>Back</Text>
            </Pressable>

            <View style={onboard.logoCircle}>
              <Ionicons name="paw" size={38} color={colors.primary} />
            </View>
            <Text style={onboard.formTitle}>Create your pup's profile</Text>
            <Text style={onboard.formSubtitle}>
              Give your Frenchie a name and secure it with a passcode.
            </Text>

            <Field label="Frenchie's name" value={name} onChangeText={setName} placeholder="Mochi" autoCapitalize="words" />
            <Field label="Your name" value={owner} onChangeText={setOwner} placeholder="Heather" autoCapitalize="words" />
            <Field label="Passcode" value={passcode} onChangeText={setPasscode} placeholder="6+ characters" secureTextEntry />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}

            <ActionButton
              icon="checkmark-circle-outline"
              label={busy ? "Creating account..." : "Create account"}
              onPress={handleSignUp}
            />

            <Pressable style={onboard.switchRow} onPress={() => { setStep("signin"); setError(""); }}>
              <Text style={onboard.switchText}>Already have an account? </Text>
              <Text style={onboard.switchLink}>Sign in</Text>
            </Pressable>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    );
  }

  // signin
  return (
    <View style={styles.app}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          style={styles.screen}
          contentContainerStyle={onboard.container}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <Pressable onPress={() => setStep("welcome")} style={onboard.backButton}>
            <Ionicons name="arrow-back" size={22} color={colors.primary} />
            <Text style={onboard.backText}>Back</Text>
          </Pressable>

          <View style={onboard.logoCircle}>
            <Ionicons name="paw" size={38} color={colors.primary} />
          </View>
          <Text style={onboard.formTitle}>Welcome back</Text>
          <Text style={onboard.formSubtitle}>
            Sign in with your Frenchie's name and passcode to restore your data.
          </Text>

          <Field label="Frenchie's name" value={name} onChangeText={setName} placeholder="Mochi" autoCapitalize="words" />
          <Field label="Passcode" value={passcode} onChangeText={setPasscode} placeholder="6+ characters" secureTextEntry />

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <ActionButton
            icon="log-in-outline"
            label={busy ? "Signing in..." : "Sign in"}
            onPress={handleSignIn}
          />

          <Pressable style={onboard.switchRow} onPress={() => { setStep("signup"); setError(""); }}>
            <Text style={onboard.switchText}>Don't have an account? </Text>
            <Text style={onboard.switchLink}>Create one</Text>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

// ══════════════════════════════════════════════════════════════════
// Root
// ══════════════════════════════════════════════════════════════════

export default function App() {
  const { state, ready, actions } = useFrenchieStore();
  const [tab, setTab] = useState<Tab>("safety");
  const [sheet, setSheet] = useState<Sheet>(null);

  useEffect(() => {
    const timer = setInterval(actions.tickWalk, 1000);
    return () => clearInterval(timer);
  }, [actions.tickWalk]);

  if (!ready) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator color={colors.primary} />
        <Text style={styles.loadingText}>Opening Frenchie Buddy...</Text>
      </View>
    );
  }

  // ── Auth gate: show onboarding if no account ──
  if (!state.account) {
    return <OnboardingScreen actions={actions} />;
  }

  const latestHeat = state.heatReadings[0];
  const latestMood = state.moodScans[0];

  return (
    <View style={styles.app}>
      <StatusBar style="dark" />
      <View style={styles.shell}>
        {tab === "safety" && <SafetyScreen open={setSheet} state={state} actions={actions} />}
        {tab === "pulse" && <PulseScreen open={setSheet} state={state} actions={actions} />}
        {tab === "health" && <HealthScreen open={setSheet} state={state} actions={actions} />}
        {tab === "journal" && <JournalScreen open={setSheet} state={state} />}
        {tab === "profile" && <ProfileScreen open={setSheet} state={state} actions={actions} />}
      </View>
      <View style={styles.tabBar}>
        {tabs.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => setTab(item.id)}
            style={[styles.tabButton, tab === item.id && styles.tabButtonActive]}
          >
            <Ionicons name={item.icon} size={21} color={tab === item.id ? colors.primary : colors.inkMuted} />
            <Text style={[styles.tabLabel, tab === item.id && styles.tabLabelActive]}>{item.label}</Text>
          </Pressable>
        ))}
      </View>
      <Modal visible={sheet !== null} transparent animationType="slide" onRequestClose={() => setSheet(null)}>
        <Pressable style={styles.modalShade} onPress={() => setSheet(null)}>
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.sheetWrap}>
            <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
              <View style={styles.sheetHeader}>
                <View style={styles.sheetHandle} />
                <Pressable style={styles.sheetClose} onPress={() => setSheet(null)} hitSlop={12}>
                  <Ionicons name="close" size={22} color={colors.primary} />
                </Pressable>
              </View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
                contentContainerStyle={styles.sheetScrollContent}
              >
                {sheet === "auth" && <AuthSheet close={() => setSheet(null)} actions={actions} signedIn={!!state.account} />}
                {sheet === "health" && <HealthSheet close={() => setSheet(null)} actions={actions} weight={state.profile.weightLbs} />}
                {sheet === "memory" && <MemorySheet close={() => setSheet(null)} actions={actions} />}
                {sheet === "medication" && <MedicationSheet close={() => setSheet(null)} actions={actions} />}
                {sheet === "mood" && <MoodSheet close={() => setSheet(null)} actions={actions} isPremium={state.profile.subscriptionStatus !== "free"} />}
                {sheet === "paywall" && <PaywallSheet close={() => setSheet(null)} actions={actions} />}
              </ScrollView>
            </Pressable>
          </KeyboardAvoidingView>
        </Pressable>
      </Modal>
      <View pointerEvents="none" style={styles.floatingStatus}>
        <Text style={styles.floatingText}>
          {latestHeat.level} outside | {latestMood.moodTitle}
        </Text>
      </View>
    </View>
  );
}

// ══════════════════════════════════════════════════════════════════
// Screens
// ══════════════════════════════════════════════════════════════════

const SafetyScreen = ({ state, actions, open }: ScreenProps) => {
  const [temperature, setTemperature] = useState(state.heatReadings[0]?.temperatureF ?? 76);
  const [humidity, setHumidity] = useState(state.heatReadings[0]?.humidity ?? 58);
  const [saved, setSaved] = useState(false);
  const latest = state.heatReadings[0];
  const preview = evaluateHeat(temperature, humidity);
  const walkMinutes = Math.floor(state.walkTimer.seconds / 60);
  const walkSeconds = String(state.walkTimer.seconds % 60).padStart(2, "0");

  const handleSaveReading = () => {
    actions.setHeat(temperature, humidity);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <Screen title="Safe Breathing" subtitle={`${state.profile.name}'s outdoor decision center`}>
      <View style={[styles.heroBand, levelBorder(latest.level)]}>
        <View style={styles.heroHeader}>
          <View>
            <Text style={styles.kicker}>Heat Safety Meter</Text>
            <Text style={styles.heroTitle}>{latest.level}</Text>
          </View>
          <Gauge level={latest.level} />
        </View>
        <Text style={styles.heroCopy}>{latest.conditionLabel}</Text>
        <View style={styles.metricRow}>
          <Metric label="Temp" value={`${Math.round(latest.temperatureF)} F`} />
          <Metric label="Humidity" value={`${Math.round(latest.humidity)}%`} />
          <Metric label="Breathing" value={`${Math.round(state.healthEntries[0].breathingEffort * 100)}%`} />
        </View>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Adjust conditions</Text>
        <Text style={styles.sectionMeta}>{preview.level}</Text>
      </View>
      <Stepper label="Temperature" value={temperature} suffix=" F" min={35} max={110} onChange={setTemperature} />
      <Stepper label="Humidity" value={humidity} suffix="%" min={0} max={100} onChange={setHumidity} />
      <ActionButton icon={saved ? "checkmark-outline" : "save-outline"} label={saved ? "Saved!" : "Save reading"} onPress={handleSaveReading} />

      <View style={styles.twoCol}>
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Walk timer</Text>
          <Text style={styles.timerText}>{walkMinutes}:{walkSeconds}</Text>
          <ActionButton
            icon={state.walkTimer.active ? "pause-outline" : "play-outline"}
            label={state.walkTimer.active ? "Stop walk" : "Start walk"}
            onPress={state.walkTimer.active ? actions.stopWalk : actions.startWalk}
            compact
          />
        </View>
        <View style={styles.panel}>
          <Text style={styles.panelTitle}>Current mood</Text>
          <Text style={styles.largeValue}>{state.moodScans[0].moodTitle}</Text>
          <ActionButton icon="camera-outline" label="Scan" onPress={() => open("mood")} compact />
        </View>
      </View>
    </Screen>
  );
};

const PulseScreen = ({ state, actions, open }: ScreenProps) => (
  <Screen title="Daily Pulse" subtitle="Playful care notes for today">
    <View style={styles.pulseCard}>
      <Text style={styles.kicker}>Star sign</Text>
      <Text style={styles.bigHeadline}>{state.horoscope.starSign}</Text>
      <Text style={styles.cardTitle}>{state.horoscope.title}</Text>
      <Text style={styles.bodyText}>{state.horoscope.body}</Text>
      <View style={styles.tipBox}>
        <Ionicons name="bulb-outline" size={18} color={colors.primary} />
        <Text style={styles.tipText}>{state.horoscope.tip}</Text>
      </View>
      <View style={styles.buttonRow}>
        <ActionButton icon="refresh-outline" label="New reading" onPress={actions.refreshHoroscope} compact />
        <ActionButton icon="share-outline" label="Share card" onPress={() => undefined} compact secondary />
      </View>
    </View>

    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Mood tracker</Text>
      <Text style={styles.sectionMeta}>{state.moodScans.length} scans</Text>
    </View>
    <MoodCard mood={state.moodScans[0]} />
    <ActionButton icon="camera-outline" label="Run mood scan" onPress={() => open("mood")} />
    {state.profile.subscriptionStatus === "free" && (
      <Pressable style={styles.lockedPanel} onPress={() => open("paywall")}>
        <Ionicons name="lock-closed-outline" size={22} color={colors.primary} />
        <Text style={styles.lockedText}>Mood history is a premium feature. Start your 7-day trial.</Text>
      </Pressable>
    )}
  </Screen>
);

const HealthScreen = ({ state, actions, open }: ScreenProps) => {
  const latest = state.healthEntries[0];
  const trend = state.healthEntries.slice(0, 5).reverse();
  return (
    <Screen title="Health Log" subtitle="Breathing, snoring, sleep, and meds">
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today</Text>
        <ActionPill label="Add check-in" icon="add" onPress={() => open("health")} />
      </View>
      <View style={styles.panel}>
        <Metric label="Breathing effort" value={`${Math.round(latest.breathingEffort * 100)}%`} />
        <Progress value={latest.breathingEffort} level={latest.breathingEffort > 0.66 ? "Danger" : latest.breathingEffort > 0.45 ? "Caution" : "Safe"} />
        <Text style={styles.bodyText}>{latest.note}</Text>
      </View>

      <Text style={styles.sectionTitle}>Weight trend</Text>
      {trend.length === 0 ? (
        <EmptyState icon="analytics-outline" message="No weight data yet. Add a check-in to start tracking." />
      ) : (
        <View style={styles.chart}>
          {trend.map((entry) => (
            <View key={entry.id} style={styles.chartBarWrap}>
              <View style={[styles.chartBar, { height: 34 + (entry.weightLbs - 20) * 8 }]} />
              <Text style={styles.chartLabel}>{entry.weightLbs.toFixed(1)}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Medication reminders</Text>
        <ActionPill label="Add" icon="add" onPress={() => open("medication")} />
      </View>
      {state.medications.length === 0 ? (
        <EmptyState icon="medical-outline" message='No medications yet. Tap "Add" to track supplements or meds.' />
      ) : (
        state.medications.map((med) => (
          <Pressable key={med.id} style={styles.listRow} onPress={() => actions.toggleMedication(med.id)}>
            <Ionicons name={med.givenToday ? "checkmark-circle" : "ellipse-outline"} size={24} color={med.givenToday ? colors.success : colors.inkMuted} />
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{med.name}</Text>
              <Text style={styles.rowSub}>{med.dosage} | {med.schedule}</Text>
            </View>
          </Pressable>
        ))
      )}
      <Text style={styles.disclaimer}>{HEALTH_DISCLAIMER}</Text>
    </Screen>
  );
};

const JournalScreen = ({ state, open }: Omit<ScreenProps, "actions">) => {
  const [stage, setStage] = useState<LifeStage | "All">("All");
  const filtered = stage === "All" ? state.memories : state.memories.filter((memory) => memory.stage === stage);
  return (
    <Screen title="Memory Journal" subtitle="Milestones, tiny wins, and favorite days">
      <View style={styles.segmented}>
        {(["All", "Puppyhood", "Adult", "Senior"] as const).map((item) => (
          <Pressable key={item} style={[styles.segment, stage === item && styles.segmentActive]} onPress={() => setStage(item)}>
            <Text style={[styles.segmentText, stage === item && styles.segmentTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <ActionButton icon="add-circle-outline" label="Add memory" onPress={() => open("memory")} />
      {filtered.length === 0 ? (
        <EmptyState
          icon="book-outline"
          message={stage === "All" ? "No memories yet. Tap above to capture a moment." : `No ${stage.toLowerCase()} memories yet.`}
        />
      ) : (
        filtered.map((memory) => (
          <View key={memory.id} style={styles.memoryCard}>
            <View style={[styles.memoryArt, { backgroundColor: "#" + memory.colorHex.toString(16).padStart(6, "0") }]}>
              <Ionicons name="image-outline" size={26} color={colors.inkOnDark} />
            </View>
            <View style={styles.memoryBody}>
              <Text style={styles.rowTitle}>{memory.caption}</Text>
              <Text style={styles.rowSub}>{memory.stage} | {new Date(memory.date).toLocaleDateString()}</Text>
              {memory.milestone ? <Text style={styles.badge}>{memory.milestone}</Text> : null}
            </View>
          </View>
        ))
      )}
    </Screen>
  );
};

const ProfileScreen = ({ state, actions, open }: ScreenProps) => {
  const [deleting, setDeleting] = useState(false);
  const [restoring, setRestoring] = useState(false);

  const handleDeleteAccount = () => {
    if (!state.account) return;
    Alert.alert(
      "Delete account?",
      "This will permanently remove your Frenchie's cloud data. This action cannot be undone.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setDeleting(true);
            try {
              await actions.deleteAccount();
            } catch (err) {
              Alert.alert("Error", err instanceof Error ? err.message : "Delete failed. Please try again.");
            } finally {
              setDeleting(false);
            }
          },
        },
      ],
    );
  };

  const handleRestore = async () => {
    setRestoring(true);
    try {
      const isPremium = await actions.restorePurchases();
      Alert.alert(
        isPremium ? "Restored" : "No purchases found",
        isPremium ? "Premium access has been restored." : "We couldn't find any previous purchases for this account.",
      );
    } catch {
      Alert.alert("Error", "Restore failed. Please try again.");
    } finally {
      setRestoring(false);
    }
  };

  const premiumLabel =
    state.profile.subscriptionStatus === "premium"
      ? "Active premium subscription"
      : "7-day free trial, then $4.99/mo or $29.99/yr.";

  return (
    <Screen title={state.profile.name} subtitle={`With ${state.profile.ownerName || "their favorite human"}`}>
      <View style={styles.profileTop}>
        <View style={styles.avatar}>
          <Ionicons name="paw-outline" size={38} color={colors.primary} />
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.bigHeadline}>{state.profile.weightLbs.toFixed(1)} lb</Text>
          <Text style={styles.bodyText}>{state.profile.breathingNotes}</Text>
        </View>
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Cloud account</Text>
        <Text style={styles.bodyText}>{state.syncMessage}</Text>
        {state.syncStatus === "failed" && (
          <ActionButton icon="refresh-outline" label="Retry sync" onPress={actions.sync} compact />
        )}
        <View style={styles.buttonRow}>
          <ActionButton icon="cloud-outline" label="Sync now" onPress={actions.sync} compact />
          <ActionButton icon="log-out-outline" label="Sign out" onPress={actions.signOut} compact secondary />
        </View>
      </View>
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>Premium</Text>
        <Text style={styles.bodyText}>{premiumLabel}</Text>
        {state.profile.subscriptionStatus !== "premium" && (
          <ActionButton icon="card-outline" label="View trial offer" onPress={() => open("paywall")} />
        )}
        <Pressable style={styles.restoreButton} onPress={handleRestore} disabled={restoring}>
          <Text style={styles.restoreText}>{restoring ? "Restoring..." : "Restore purchases"}</Text>
        </Pressable>
      </View>
      <SettingsRow icon="notifications-outline" label="Walk and medication reminders" value="Local preview" />
      <Pressable onPress={() => Linking.openURL(PRIVACY_URL)}>
        <SettingsRow icon="shield-checkmark-outline" label="Privacy policy" value="View privacy policy" />
      </Pressable>
      <Pressable onPress={() => Linking.openURL(TERMS_URL)}>
        <SettingsRow icon="document-text-outline" label="Terms of service" value="View terms" />
      </Pressable>
      <Pressable onPress={() => Linking.openURL(SUPPORT_URL)}>
        <SettingsRow icon="help-circle-outline" label="Support" value="Get help" />
      </Pressable>
      {state.account && (
        <Pressable onPress={handleDeleteAccount} disabled={deleting}>
          <SettingsRow icon="trash-outline" label="Delete account" value={deleting ? "Deleting..." : "Permanently remove all cloud data"} />
        </Pressable>
      )}
    </Screen>
  );
};

// ══════════════════════════════════════════════════════════════════
// Sheets
// ══════════════════════════════════════════════════════════════════

const AuthSheet = ({ actions, close, signedIn }: { actions: ScreenProps["actions"]; close: () => void; signedIn: boolean }) => {
  const [mode, setMode] = useState<"signin" | "signup">("signup");
  const [name, setName] = useState("");
  const [owner, setOwner] = useState("");
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setBusy(true);
    setError("");
    try {
      if (mode === "signup") await actions.signUp(name, passcode, owner);
      else await actions.signIn(name, passcode);
      await actions.sync();
      close();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Authentication failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <View>
      <Text style={styles.sheetTitle}>{signedIn ? "Cloud account" : "Sync your Frenchie"}</Text>
      <View style={styles.segmented}>
        {(["signup", "signin"] as const).map((item) => (
          <Pressable key={item} style={[styles.segment, mode === item && styles.segmentActive]} onPress={() => setMode(item)}>
            <Text style={[styles.segmentText, mode === item && styles.segmentTextActive]}>{item === "signup" ? "Create" : "Sign in"}</Text>
          </Pressable>
        ))}
      </View>
      <Field label="Frenchie name" value={name} onChangeText={setName} placeholder="Mochi" />
      {mode === "signup" && <Field label="Owner name" value={owner} onChangeText={setOwner} placeholder="Heather" />}
      <Field label="Passcode" value={passcode} onChangeText={setPasscode} placeholder="6+ characters" secureTextEntry />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <ActionButton icon="cloud-upload-outline" label={busy ? "Working..." : mode === "signup" ? "Create account" : "Restore pup"} onPress={submit} />
    </View>
  );
};

const HealthSheet = ({ actions, close, weight }: { actions: ScreenProps["actions"]; close: () => void; weight: number }) => {
  const [breathingEffort, setBreathingEffort] = useState(0.35);
  const [snoringLevel, setSnoringLevel] = useState(0.4);
  const [sleepHours, setSleepHours] = useState(12);
  const [weightLbs, setWeightLbs] = useState(weight);
  const [note, setNote] = useState("");
  const save = () => {
    actions.addHealth({ breathingEffort, snoringLevel, sleepHours, weightLbs, activity: breathingEffort > 0.55 ? "Low" : "Moderate", note: note || "New breathing check-in saved." });
    close();
  };
  return (
    <View>
      <Text style={styles.sheetTitle}>Breathing check-in</Text>
      <Stepper label="Breathing effort" value={Math.round(breathingEffort * 100)} suffix="%" min={0} max={100} onChange={(v) => setBreathingEffort(v / 100)} />
      <Stepper label="Snoring level" value={Math.round(snoringLevel * 100)} suffix="%" min={0} max={100} onChange={(v) => setSnoringLevel(v / 100)} />
      <Stepper label="Sleep" value={sleepHours} suffix=" hr" min={0} max={24} onChange={setSleepHours} />
      <Stepper label="Weight" value={weightLbs} suffix=" lb" min={5} max={80} onChange={setWeightLbs} />
      <Field label="Notes" value={note} onChangeText={setNote} placeholder="What changed today?" multiline />
      <ActionButton icon="save-outline" label="Save check-in" onPress={save} />
    </View>
  );
};

const MemorySheet = ({ actions, close }: { actions: ScreenProps["actions"]; close: () => void }) => {
  const [caption, setCaption] = useState("");
  const [stage, setStage] = useState<LifeStage>("Adult");
  return (
    <View>
      <Text style={styles.sheetTitle}>Add memory</Text>
      <Field label="Caption" value={caption} onChangeText={setCaption} placeholder="A tiny win from today" multiline />
      <View style={styles.segmented}>
        {(["Puppyhood", "Adult", "Senior"] as const).map((item) => (
          <Pressable key={item} style={[styles.segment, stage === item && styles.segmentActive]} onPress={() => setStage(item)}>
            <Text style={[styles.segmentText, stage === item && styles.segmentTextActive]}>{item}</Text>
          </Pressable>
        ))}
      </View>
      <ActionButton icon="save-outline" label="Save memory" onPress={() => { actions.addMemory(caption, stage); close(); }} />
    </View>
  );
};

const MedicationSheet = ({ actions, close }: { actions: ScreenProps["actions"]; close: () => void }) => {
  const [name, setName] = useState("");
  return (
    <View>
      <Text style={styles.sheetTitle}>Medication reminder</Text>
      <Field label="Name" value={name} onChangeText={setName} placeholder="Supplement or medication" />
      <ActionButton icon="add-circle-outline" label="Add reminder" onPress={() => { actions.addMedication(name); close(); }} />
    </View>
  );
};

const MoodSheet = ({ actions, close, isPremium }: { actions: ScreenProps["actions"]; close: () => void; isPremium: boolean }) => {
  const [note, setNote] = useState("");
  return (
    <View>
      <Text style={styles.sheetTitle}>Mood scan</Text>
      <Text style={styles.bodyText}>
        {isPremium ? "Describe the photo or moment. The local adapter will generate a realistic mood result." : "Premium preview: this uses a local adapter until AI photo analysis keys are configured."}
      </Text>
      <Field label="What do you notice?" value={note} onChangeText={setNote} placeholder="Sleepy eyes after breakfast" multiline />
      <ActionButton icon="sparkles-outline" label="Generate mood result" onPress={() => { actions.scanMood(note); close(); }} />
    </View>
  );
};

const PaywallSheet = ({ actions, close }: { actions: ScreenProps["actions"]; close: () => void }) => {
  const [packages, setPackages] = useState<OfferingPackages>({ monthly: null, annual: null });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    getPackages().then(setPackages).catch(() => undefined);
  }, []);

  const handlePurchase = async (type: "monthly" | "annual") => {
    const pkg = packages[type];
    if (!pkg) return;
    setBusy(true);
    setError("");
    try {
      const isPremium = await purchasePackage(pkg);
      if (isPremium) {
        actions.setPremiumStatus("premium");
        close();
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Purchase failed.";
      if (!msg.includes("cancelled")) setError(msg);
    } finally {
      setBusy(false);
    }
  };

  const handleRestore = async () => {
    setBusy(true);
    setError("");
    try {
      const isPremium = await actions.restorePurchases();
      if (isPremium) close();
      else setError("No previous purchases found.");
    } catch {
      setError("Restore failed. Please try again.");
    } finally {
      setBusy(false);
    }
  };

  const monthlyLabel = packages.monthly
    ? `Monthly — ${packages.monthly.product.priceString}/mo`
    : "Monthly — $4.99/mo";
  const annualLabel = packages.annual
    ? `Annual — ${packages.annual.product.priceString}/yr`
    : "Annual — $29.99/yr";

  return (
    <View>
      <Text style={styles.sheetTitle}>Frenchie Buddy Premium</Text>
      <Text style={styles.bigHeadline}>7-day free trial</Text>
      <Text style={styles.bodyText}>Try all premium features free for 7 days. Cancel anytime.</Text>
      {premiumBenefits.map((benefit) => (
        <View key={benefit} style={styles.benefitRow}>
          <Ionicons name="checkmark-circle-outline" size={20} color={colors.success} />
          <Text style={styles.bodyText}>{benefit}</Text>
        </View>
      ))}
      <ActionButton icon="sparkles-outline" label={busy ? "Working..." : monthlyLabel} onPress={() => handlePurchase("monthly")} />
      <ActionButton icon="card-outline" label={busy ? "Working..." : annualLabel} onPress={() => handlePurchase("annual")} secondary />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <Pressable style={styles.restoreButton} onPress={handleRestore}>
        <Text style={styles.restoreText}>Restore purchases</Text>
      </Pressable>
      <View style={styles.legalRow}>
        <Pressable onPress={() => Linking.openURL(TERMS_URL)}>
          <Text style={styles.legalLink}>Terms</Text>
        </Pressable>
        <Text style={styles.legalDot}> · </Text>
        <Pressable onPress={() => Linking.openURL(PRIVACY_URL)}>
          <Text style={styles.legalLink}>Privacy</Text>
        </Pressable>
      </View>
      <Text style={styles.autoRenewText}>
        Payment will be charged to your App Store account. Subscription automatically renews unless canceled at least 24 hours before the end of the current period.
      </Text>
    </View>
  );
};
