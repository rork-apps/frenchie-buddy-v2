import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  Fraunces_500Medium,
  Fraunces_600SemiBold,
  Fraunces_700Bold,
} from "@expo-google-fonts/fraunces";
import {
  HankenGrotesk_400Regular,
  HankenGrotesk_500Medium,
  HankenGrotesk_600SemiBold,
  HankenGrotesk_700Bold,
} from "@expo-google-fonts/hanken-grotesk";
import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Animated,
  Easing,
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
import { useTheme } from "./src/theme/theme";
import type { LifeStage, SafetyLevel } from "./src/types";
import { getPackages, purchasePackage, type OfferingPackages } from "./src/services/revenuecat";
import {
  ActionButton,
  ActionPill,
  ArcGauge,
  Badge,
  Card,
  EmptyState,
  FadeIn,
  Field,
  GlassTabBar,
  GradientHero,
  Metric,
  PressableScale,
  Progress,
  Screen,
  ScreenSkeleton,
  SectionHeader,
  SegmentedControl,
  SettingsRow,
  Sparkbars,
  Stepper,
  zoneColor,
  zoneDeep,
  type IconName,
} from "./src/components/ui";

SplashScreen.preventAutoHideAsync().catch(() => undefined);

// ── Legal URLs (replace with real customer URLs before release) ──
const PRIVACY_URL = "https://frenchiebuddy.com/privacy";
const TERMS_URL = "https://frenchiebuddy.com/terms";
const SUPPORT_URL = "https://frenchiebuddy.com/support";

type Tab = "safety" | "pulse" | "health" | "journal" | "profile";
type Sheet = "health" | "memory" | "medication" | "mood" | "paywall" | null;
type Store = ReturnType<typeof useFrenchieStore>;
type ScreenProps = { state: Store["state"]; actions: Store["actions"]; open: (s: Sheet) => void };

const tabs: { id: Tab; label: string; icon: IconName }[] = [
  { id: "safety", label: "Safety", icon: "speedometer-outline" },
  { id: "pulse", label: "Pulse", icon: "sparkles-outline" },
  { id: "health", label: "Health", icon: "heart-outline" },
  { id: "journal", label: "Journal", icon: "book-outline" },
  { id: "profile", label: "Profile", icon: "person-circle-outline" },
];

// Heat-index fill ratio for the gauge (brachycephalic-tuned thresholds).
const heatFill = (tempF: number, humidity: number) => {
  const risk = tempF + humidity * 0.32;
  return Math.max(0, Math.min(1, (risk - 70) / (115 - 70)));
};

// ══════════════════════════════════════════════════════════════════
// Launch overlay — branded splash hand-off
// ══════════════════════════════════════════════════════════════════
const LaunchOverlay = ({ done }: { done: boolean }) => {
  const t = useTheme();
  const fade = useRef(new Animated.Value(1)).current;
  const scale = useRef(new Animated.Value(0.92)).current;
  const [hidden, setHidden] = useState(false);
  useEffect(() => {
    Animated.timing(scale, { toValue: 1, duration: 600, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
  }, [scale]);
  useEffect(() => {
    if (!done) return;
    Animated.timing(fade, { toValue: 0, duration: 420, delay: 220, easing: Easing.inOut(Easing.ease), useNativeDriver: true }).start(() => setHidden(true));
  }, [done, fade]);
  if (hidden) return null;
  return (
    <Animated.View pointerEvents="none" style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, alignItems: "center", justifyContent: "center", backgroundColor: t.color.bg, opacity: fade, zIndex: 100 }}>
      <Animated.View style={{ alignItems: "center", transform: [{ scale }] }}>
        <View style={{ width: 104, height: 104, borderRadius: 52, alignItems: "center", justifyContent: "center", backgroundColor: t.color.primarySubtle, ...t.elevation.md }}>
          <Ionicons name="paw" size={52} color={t.color.primaryDeep} />
        </View>
        <Text style={{ fontFamily: t.font.displayBold, fontSize: 30, color: t.color.text, marginTop: 18 }}>Frenchie Buddy</Text>
        <Text style={{ fontFamily: t.font.body, fontSize: 14, color: t.color.textSecondary, marginTop: 4 }}>Safe Breathing, Daily Joy</Text>
      </Animated.View>
    </Animated.View>
  );
};

// ══════════════════════════════════════════════════════════════════
// Root
// ══════════════════════════════════════════════════════════════════
export default function App() {
  const t = useTheme();
  const [fontsLoaded] = useFonts({
    Fraunces_500Medium, Fraunces_600SemiBold, Fraunces_700Bold,
    HankenGrotesk_400Regular, HankenGrotesk_500Medium, HankenGrotesk_600SemiBold, HankenGrotesk_700Bold,
  });
  const { state, ready, actions } = useFrenchieStore();
  const [tab, setTab] = useState<Tab>("safety");
  const [sheet, setSheet] = useState<Sheet>(null);
  const booted = fontsLoaded && ready;

  useEffect(() => {
    const timer = setInterval(actions.tickWalk, 1000);
    return () => clearInterval(timer);
  }, [actions.tickWalk]);

  useEffect(() => {
    if (booted) SplashScreen.hideAsync().catch(() => undefined);
  }, [booted]);

  if (!fontsLoaded) return <View style={{ flex: 1, backgroundColor: t.color.bg }} />;

  return (
    <View style={{ flex: 1, backgroundColor: t.color.bg }}>
      <StatusBar style={t.scheme === "dark" ? "light" : "dark"} />
      {!ready ? (
        <ScreenSkeleton />
      ) : !state.account ? (
        <OnboardingScreen actions={actions} />
      ) : (
        <>
          <View style={{ flex: 1 }}>
            {tab === "safety" && <SafetyScreen open={setSheet} state={state} actions={actions} />}
            {tab === "pulse" && <PulseScreen open={setSheet} state={state} actions={actions} />}
            {tab === "health" && <HealthScreen open={setSheet} state={state} actions={actions} />}
            {tab === "journal" && <JournalScreen open={setSheet} state={state} actions={actions} />}
            {tab === "profile" && <ProfileScreen open={setSheet} state={state} actions={actions} />}
          </View>
          <View pointerEvents="none" style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 26, backgroundColor: t.color.bg }} />
          <GlassTabBar>
            {tabs.map((item) => {
              const active = tab === item.id;
              return (
                <PressableScale key={item.id} onPress={() => setTab(item.id)} accessibilityLabel={item.label}
                  style={{ flex: 1, minHeight: 54, borderRadius: t.radius.lg, alignItems: "center", justifyContent: "center", gap: 3, backgroundColor: active ? t.color.primarySubtle : "transparent" }}>
                  <Ionicons name={item.icon} size={21} color={active ? t.color.primaryDeep : t.color.textTertiary} />
                  <Text style={{ fontFamily: t.font.bodyBold, fontSize: 10, color: active ? t.color.primaryDeep : t.color.textTertiary }}>{item.label}</Text>
                </PressableScale>
              );
            })}
          </GlassTabBar>
          <SheetHost sheet={sheet} setSheet={setSheet} state={state} actions={actions} />
        </>
      )}
      <LaunchOverlay done={booted} />
    </View>
  );
}

// ══════════════════════════════════════════════════════════════════
// Onboarding
// ══════════════════════════════════════════════════════════════════
const ONBOARDING_FEATURES: { icon: IconName; title: string; desc: string }[] = [
  { icon: "speedometer-outline", title: "Heat Safety Meter", desc: "Know when it's too hot to walk before you step outside." },
  { icon: "heart-outline", title: "Breathing & Health Log", desc: "Track breathing effort, weight, sleep, and medications daily." },
  { icon: "book-outline", title: "Memory Journal", desc: "Capture milestones across every life stage." },
  { icon: "sparkles-outline", title: "Daily Pulse", desc: "Breed-specific care tips and a mood log for your Frenchie." },
];

const OnboardingScreen = ({ actions }: { actions: Store["actions"] }) => {
  const t = useTheme();
  const [step, setStep] = useState<"welcome" | "signup" | "signin">("welcome");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pupName, setPupName] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (mode: "signup" | "signin") => {
    setBusy(true); setError("");
    try {
      if (mode === "signup") await actions.signUp(email, password, pupName, ownerName);
      else await actions.signIn(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally { setBusy(false); }
  };

  if (step === "welcome") {
    return (
      <View style={{ flex: 1, paddingHorizontal: t.space.lg24, justifyContent: "center" }}>
        <FadeIn>
          <View style={{ alignItems: "center", marginBottom: t.space.xl32 }}>
            <View style={{ width: 96, height: 96, borderRadius: 48, backgroundColor: t.color.primarySubtle, alignItems: "center", justifyContent: "center", ...t.elevation.sm }}>
              <Ionicons name="paw" size={46} color={t.color.primaryDeep} />
            </View>
            <Text style={{ fontFamily: t.font.displayBold, fontSize: 34, color: t.color.text, marginTop: 18 }}>Frenchie Buddy</Text>
            <Text style={{ fontFamily: t.font.body, fontSize: 16, color: t.color.textSecondary, textAlign: "center", marginTop: 6, maxWidth: 290 }}>The care companion built for flat-faced breeds.</Text>
          </View>
        </FadeIn>
        {ONBOARDING_FEATURES.map((f, i) => (
          <FadeIn key={f.title} delay={i * 70}>
            <View style={{ flexDirection: "row", gap: t.space.base16, alignItems: "center", marginBottom: t.space.base16 }}>
              <View style={{ width: 48, height: 48, borderRadius: t.radius.md, backgroundColor: t.color.surface, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: t.color.border }}>
                <Ionicons name={f.icon} size={22} color={t.color.primaryDeep} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: t.font.bodyBold, fontSize: 16, color: t.color.text }}>{f.title}</Text>
                <Text style={{ fontFamily: t.font.body, fontSize: 13, lineHeight: 18, color: t.color.textSecondary, marginTop: 2 }}>{f.desc}</Text>
              </View>
            </View>
          </FadeIn>
        ))}
        <View style={{ marginTop: t.space.base16 }}>
          <ActionButton icon="paw-outline" label="Create an account" onPress={() => { setStep("signup"); setError(""); }} />
          <ActionButton icon="log-in-outline" label="I already have an account" onPress={() => { setStep("signin"); setError(""); }} secondary />
        </View>
        <LegalRow />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1, paddingHorizontal: t.space.lg24, justifyContent: "center" }}>
      <PressableScale onPress={() => { setStep("welcome"); setError(""); }} accessibilityLabel="Back" style={{ flexDirection: "row", alignItems: "center", gap: 6, marginBottom: t.space.lg24, alignSelf: "flex-start" }}>
        <Ionicons name="arrow-back" size={22} color={t.color.primaryDeep} />
        <Text style={{ fontFamily: t.font.bodySemibold, fontSize: 15, color: t.color.primaryDeep }}>Back</Text>
      </PressableScale>
      <Text style={{ fontFamily: t.font.displayBold, fontSize: 24, color: t.color.text, marginBottom: 6 }}>{step === "signup" ? "Create your pup's profile" : "Welcome back"}</Text>
      <Text style={{ fontFamily: t.font.body, fontSize: 15, lineHeight: 21, color: t.color.textSecondary, marginBottom: t.space.lg24 }}>
        {step === "signup" ? "Create an account to safely sync your Frenchie across devices." : "Sign in to restore your Frenchie's data."}
      </Text>
      <Field label="Email" value={email} onChangeText={setEmail} placeholder="you@example.com" autoCapitalize="none" keyboardType="email-address" autoCorrect={false} />
      <Field label="Password" value={password} onChangeText={setPassword} placeholder="6+ characters" secureTextEntry />
      {step === "signup" && <Field label="Frenchie's name" value={pupName} onChangeText={setPupName} placeholder="Mochi" autoCapitalize="words" />}
      {step === "signup" && <Field label="Your name (optional)" value={ownerName} onChangeText={setOwnerName} placeholder="Heather" autoCapitalize="words" />}
      {error ? <Text style={{ fontFamily: t.font.body, fontSize: 13, color: t.color.dangerDeep, marginTop: 4 }}>{error}</Text> : null}
      <ActionButton icon={step === "signup" ? "checkmark-circle-outline" : "log-in-outline"} label={busy ? "Working…" : step === "signup" ? "Create account" : "Sign in"} onPress={() => submit(step === "signup" ? "signup" : "signin")} disabled={busy} />
      <LegalRow />
    </KeyboardAvoidingView>
  );
};

const LegalRow = () => {
  const t = useTheme();
  return (
    <View style={{ flexDirection: "row", justifyContent: "center", marginTop: t.space.lg24, gap: 4 }}>
      <Pressable onPress={() => Linking.openURL(TERMS_URL)}><Text style={{ fontFamily: t.font.bodySemibold, fontSize: 13, color: t.color.textSecondary, textDecorationLine: "underline" }}>Terms</Text></Pressable>
      <Text style={{ color: t.color.textTertiary }}>·</Text>
      <Pressable onPress={() => Linking.openURL(PRIVACY_URL)}><Text style={{ fontFamily: t.font.bodySemibold, fontSize: 13, color: t.color.textSecondary, textDecorationLine: "underline" }}>Privacy</Text></Pressable>
    </View>
  );
};

// ══════════════════════════════════════════════════════════════════
// Safety (hero) screen
// ══════════════════════════════════════════════════════════════════
const verdict: Record<SafetyLevel, string> = {
  Safe: "Good for a short, shaded walk. Bring water and watch the breathing.",
  Caution: "Keep it brief and slow. Stop the moment panting ramps up.",
  Danger: "Skip the walk. Try indoor enrichment and cool-down time.",
};

const SafetyScreen = ({ state, actions, open }: ScreenProps) => {
  const t = useTheme();
  const last = state.heatReadings[0];
  const [temperature, setTemperature] = useState(last?.temperatureF ?? 76);
  const [humidity, setHumidity] = useState(last?.humidity ?? 58);
  const [saved, setSaved] = useState(false);
  const live = evaluateHeat(temperature, humidity);
  const fill = heatFill(temperature, humidity);
  const heroGradient = t.scheme === "dark"
    ? ([t.color.surface, t.color.surfaceAlt] as [string, string])
    : ([t.color.surface, zoneColor(t, live.level) + "22"] as [string, string]);
  const walkMin = Math.floor(state.walkTimer.seconds / 60);
  const walkSec = String(state.walkTimer.seconds % 60).padStart(2, "0");

  const saveReading = () => { actions.setHeat(temperature, humidity); setSaved(true); setTimeout(() => setSaved(false), 1800); };
  const mood = state.moodScans[0];

  return (
    <Screen kicker={`${state.profile.name || "Your pup"}'s decision center`} title="Heat Safety">
      <FadeIn delay={60}>
        <GradientHero colors={heroGradient} style={{ alignItems: "center", paddingVertical: t.space.xl32 }}>
          <Text style={{ fontFamily: t.type.caption.fontFamily, fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: zoneDeep(t, live.level), marginBottom: t.space.sm8 }}>Heat Safety Meter</Text>
          <ArcGauge value={fill} level={live.level} centerLabel={Math.round(temperature)} centerSuffix="°" />
          <Text style={{ fontFamily: t.font.serif, fontSize: 16, lineHeight: 23, color: t.color.text, textAlign: "center", marginTop: t.space.md12, maxWidth: 300 }}>{verdict[live.level]}</Text>
          <View style={{ flexDirection: "row", gap: t.space.sm8, marginTop: t.space.base16, alignSelf: "stretch" }}>
            <Metric label="Temp" value={`${Math.round(temperature)}°F`} icon="thermometer-outline" />
            <Metric label="Humidity" value={`${Math.round(humidity)}%`} icon="water-outline" />
            <Metric label="Pavement" value={temperature >= 85 ? "Hot" : "OK"} icon="footsteps-outline" />
          </View>
        </GradientHero>
      </FadeIn>

      <SectionHeader title="Adjust conditions" meta={live.level} />
      <FadeIn delay={120}>
        <Stepper label="Temperature" value={temperature} suffix="°F" min={35} max={110} onChange={setTemperature} />
        <Stepper label="Humidity" value={humidity} suffix="%" min={0} max={100} onChange={setHumidity} />
        <ActionButton icon={saved ? "checkmark-outline" : "bookmark-outline"} label={saved ? "Saved!" : "Save this reading"} onPress={saveReading} />
      </FadeIn>

      <View style={{ flexDirection: "row", gap: t.space.md12, marginTop: t.space.base16 }}>
        <Card style={{ flex: 1, padding: t.space.base16 }}>
          <Text style={{ fontFamily: t.font.bodySemibold, fontSize: 14, color: t.color.textSecondary }}>Walk timer</Text>
          <Text style={{ fontFamily: t.font.displayBold, fontSize: 30, color: t.color.text, marginVertical: 4 }}>{walkMin}:{walkSec}</Text>
          <ActionButton icon={state.walkTimer.active ? "pause" : "play"} label={state.walkTimer.active ? "Stop" : "Start"} onPress={state.walkTimer.active ? actions.stopWalk : actions.startWalk} compact />
        </Card>
        <Card style={{ flex: 1, padding: t.space.base16 }}>
          <Text style={{ fontFamily: t.font.bodySemibold, fontSize: 14, color: t.color.textSecondary }}>Today's mood</Text>
          <Text style={{ fontFamily: t.font.display, fontSize: 18, color: t.color.text, marginVertical: 4 }} numberOfLines={1}>{mood ? mood.moodTitle : "Not logged"}</Text>
          <ActionButton icon="happy-outline" label="Log" onPress={() => open("mood")} compact secondary />
        </Card>
      </View>
    </Screen>
  );
};

// ══════════════════════════════════════════════════════════════════
// Pulse (tip + mood) screen
// ══════════════════════════════════════════════════════════════════
const PulseScreen = ({ state, open }: ScreenProps) => {
  const t = useTheme();
  const mood = state.moodScans[0];
  const h = state.horoscope;
  return (
    <Screen kicker="Playful care notes for today" title="Daily Pulse">
      <FadeIn delay={60}>
        <GradientHero colors={t.treatment.horoscopeGradient[t.scheme] as [string, string]}>
          <Text style={{ fontFamily: t.type.caption.fontFamily, fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: t.color.accent }}>{h.starSign}</Text>
          <Text style={{ fontFamily: t.font.displayBold, fontSize: 24, color: t.color.onInk, marginTop: 8 }}>{h.title}</Text>
          <Text style={{ fontFamily: t.font.body, fontSize: 15, lineHeight: 22, color: t.color.onInk, opacity: 0.92, marginTop: 8 }}>{h.body}</Text>
          <View style={{ flexDirection: "row", gap: 8, marginTop: t.space.base16, padding: t.space.md12, borderRadius: t.radius.md, backgroundColor: "rgba(255,255,255,0.08)" }}>
            <Ionicons name="bulb-outline" size={18} color={t.color.accent} />
            <Text style={{ flex: 1, fontFamily: t.font.body, fontSize: 13, lineHeight: 19, color: t.color.onInk }}>{h.tip}</Text>
          </View>
        </GradientHero>
      </FadeIn>

      <SectionHeader title="Mood log" meta={`${state.moodScans.length} logged`} />
      {mood ? (
        <FadeIn delay={100}>
          <Card>
            <Badge label="Latest" tone="primary" />
            <Text style={{ fontFamily: t.font.display, fontSize: 20, color: t.color.text, marginTop: 8 }}>{mood.moodTitle}</Text>
            <Text style={{ fontFamily: t.font.body, fontSize: 14, lineHeight: 21, color: t.color.textSecondary, marginTop: 4 }}>{mood.summary}</Text>
            {mood.note ? <Text style={{ fontFamily: t.font.serif, fontSize: 14, color: t.color.textSecondary, marginTop: 8, fontStyle: "italic" }}>"{mood.note}"</Text> : null}
          </Card>
        </FadeIn>
      ) : (
        <EmptyState icon="happy-outline" title="No mood logged yet" body="Record how your Frenchie seems today — energy, comfort, and any little notes." actionLabel="Log a mood" onAction={() => open("mood")} />
      )}
      <ActionButton icon="add" label="Log a mood" onPress={() => open("mood")} />
    </Screen>
  );
};

// ══════════════════════════════════════════════════════════════════
// Health screen
// ══════════════════════════════════════════════════════════════════
const HealthScreen = ({ state, actions, open }: ScreenProps) => {
  const t = useTheme();
  const latest = state.healthEntries[0];
  const trend = state.healthEntries.slice(0, 6).reverse();
  const breathLevel: SafetyLevel = latest ? (latest.breathingEffort > 0.66 ? "Danger" : latest.breathingEffort > 0.45 ? "Caution" : "Safe") : "Safe";

  return (
    <Screen kicker="Breathing, weight, sleep & meds" title="Health Log">
      <SectionHeader title="Today" action={<ActionPill label="Check-in" icon="add" onPress={() => open("health")} />} />
      {latest ? (
        <FadeIn delay={60}>
          <Card>
            <Metric label="Breathing effort" value={`${Math.round(latest.breathingEffort * 100)}%`} />
            <Progress value={latest.breathingEffort} level={breathLevel} />
            {latest.note ? <Text style={{ fontFamily: t.font.body, fontSize: 14, lineHeight: 21, color: t.color.textSecondary }}>{latest.note}</Text> : null}
          </Card>
        </FadeIn>
      ) : (
        <EmptyState icon="heart-outline" title="No check-ins yet" body="Log today's breathing, weight, and sleep to start spotting trends for your Frenchie." actionLabel="Add a check-in" onAction={() => open("health")} />
      )}

      {trend.length > 1 && (
        <>
          <SectionHeader title="Weight trend" meta="last 6" />
          <FadeIn delay={100}><Sparkbars data={trend.map((e) => e.weightLbs)} format={(n) => n.toFixed(1)} /></FadeIn>
        </>
      )}

      <SectionHeader title="Medications" action={<ActionPill label="Add" icon="add" onPress={() => open("medication")} />} />
      {state.medications.length === 0 ? (
        <EmptyState icon="medkit-outline" title="No medications" body="Add supplements or medications to get a simple daily reminder." actionLabel="Add medication" onAction={() => open("medication")} />
      ) : (
        state.medications.map((med, i) => (
          <FadeIn key={med.id} delay={i * 50}>
            <PressableScale onPress={() => actions.toggleMedication(med.id)} accessibilityLabel={med.name} style={{ flexDirection: "row", gap: t.space.md12, alignItems: "center", backgroundColor: t.color.surface, borderRadius: t.radius.md, padding: t.space.base16, marginBottom: t.space.sm8, borderWidth: 1, borderColor: t.color.border }}>
              <Ionicons name={med.givenToday ? "checkmark-circle" : "ellipse-outline"} size={26} color={med.givenToday ? t.color.success : t.color.textTertiary} />
              <View style={{ flex: 1 }}>
                <Text style={{ fontFamily: t.font.bodySemibold, fontSize: 15, color: t.color.text }}>{med.name}</Text>
                <Text style={{ fontFamily: t.font.body, fontSize: 13, color: t.color.textSecondary, marginTop: 2 }}>{med.dosage} · {med.schedule}</Text>
              </View>
            </PressableScale>
          </FadeIn>
        ))
      )}
      <Text style={{ fontFamily: t.font.body, fontSize: 12, lineHeight: 18, color: t.color.textTertiary, marginTop: t.space.base16 }}>{HEALTH_DISCLAIMER}</Text>
    </Screen>
  );
};

// ══════════════════════════════════════════════════════════════════
// Journal screen
// ══════════════════════════════════════════════════════════════════
const JournalScreen = ({ state, open }: ScreenProps) => {
  const t = useTheme();
  const [stage, setStage] = useState<LifeStage | "All">("All");
  const filtered = stage === "All" ? state.memories : state.memories.filter((m) => m.stage === stage);
  return (
    <Screen kicker="Milestones & favorite days" title="Memory Journal">
      <SegmentedControl segments={["All", "Puppyhood", "Adult", "Senior"] as const} value={stage} onChange={setStage} />
      <ActionButton icon="add-circle-outline" label="Add a memory" onPress={() => open("memory")} />
      {filtered.length === 0 ? (
        <EmptyState icon="book-outline" title={stage === "All" ? "No memories yet" : `No ${stage.toLowerCase()} memories`} body="Capture a milestone or a tiny win — they add up to your Frenchie's story." actionLabel="Add a memory" onAction={() => open("memory")} />
      ) : (
        filtered.map((m, i) => (
          <FadeIn key={m.id} delay={i * 60}>
            <Card elevated="sm" style={{ padding: t.space.md12, marginTop: t.space.md12, flexDirection: "row", gap: t.space.md12 }}>
              <View style={{ width: 76, borderRadius: t.radius.md, alignItems: "center", justifyContent: "center", backgroundColor: "#" + m.colorHex.toString(16).padStart(6, "0") }}>
                <Ionicons name="image-outline" size={26} color={t.color.onPrimary} />
              </View>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={{ fontFamily: t.font.serif, fontSize: 11, letterSpacing: 0.4, textTransform: "uppercase", color: t.color.textTertiary }}>{m.stage} · {new Date(m.date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</Text>
                <Text style={{ fontFamily: t.font.display, fontSize: 16, lineHeight: 21, color: t.color.text, marginVertical: 4 }}>{m.caption}</Text>
                {m.milestone ? <Badge label={m.milestone} tone="accent" /> : null}
              </View>
            </Card>
          </FadeIn>
        ))
      )}
    </Screen>
  );
};

// ══════════════════════════════════════════════════════════════════
// Profile screen
// ══════════════════════════════════════════════════════════════════
const ProfileScreen = ({ state, actions, open }: ScreenProps) => {
  const t = useTheme();
  const [deleting, setDeleting] = useState(false);
  const [restoring, setRestoring] = useState(false);

  const handleDelete = () => {
    if (!state.account) return;
    Alert.alert("Delete account?", "This permanently removes your Frenchie's cloud data. This cannot be undone.", [
      { text: "Cancel", style: "cancel" },
      { text: "Delete", style: "destructive", onPress: async () => { setDeleting(true); try { await actions.deleteAccount(); } catch (e) { Alert.alert("Error", e instanceof Error ? e.message : "Delete failed."); } finally { setDeleting(false); } } },
    ]);
  };
  const handleRestore = async () => {
    setRestoring(true);
    try { const ok = await actions.restorePurchases(); Alert.alert(ok ? "Restored" : "No purchases found", ok ? "Premium access restored." : "We couldn't find previous purchases."); }
    catch { Alert.alert("Error", "Restore failed."); } finally { setRestoring(false); }
  };

  return (
    <Screen kicker={`With ${state.profile.ownerName || "their favorite human"}`} title={state.profile.name || "Your Frenchie"}>
      <FadeIn delay={60}>
        <PressableScale onPress={() => open("health")} accessibilityLabel="Add or update weight"
          style={{ backgroundColor: t.color.surface, borderRadius: t.radius.lg, padding: t.space.lg24, borderWidth: 1, borderColor: t.color.border, flexDirection: "row", gap: t.space.base16, alignItems: "center", ...t.elevation.sm }}>
          <View style={{ width: 64, height: 64, borderRadius: 32, alignItems: "center", justifyContent: "center", backgroundColor: t.color.primarySubtle }}>
            <Ionicons name="paw" size={30} color={t.color.primaryDeep} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: t.font.displayBold, fontSize: 22, color: t.color.text }}>{state.profile.weightLbs > 0 ? `${state.profile.weightLbs.toFixed(1)} lb` : "Add weight"}</Text>
            <Text style={{ fontFamily: t.font.body, fontSize: 13, color: t.color.textSecondary, marginTop: 2 }}>{state.profile.weightLbs > 0 ? "Tap to log a new check-in" : "Tap to add your Frenchie's weight"}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={t.color.textTertiary} />
        </PressableScale>
      </FadeIn>

      <FadeIn delay={100}>
        <Card style={{ marginTop: t.space.md12 }}>
          <Text style={{ fontFamily: t.font.display, fontSize: 16, color: t.color.text, marginBottom: 6 }}>Cloud account</Text>
          <Text style={{ fontFamily: t.font.body, fontSize: 14, lineHeight: 20, color: t.color.textSecondary }}>{state.syncMessage}</Text>
          <View style={{ flexDirection: "row", gap: t.space.md12 }}>
            <ActionButton icon="cloud-outline" label="Sync now" onPress={actions.sync} compact />
            <ActionButton icon="log-out-outline" label="Sign out" onPress={actions.signOut} compact secondary />
          </View>
        </Card>
      </FadeIn>

      <FadeIn delay={140}>
        <Card style={{ marginTop: t.space.md12 }}>
          <Text style={{ fontFamily: t.font.display, fontSize: 16, color: t.color.text, marginBottom: 6 }}>Premium</Text>
          <Text style={{ fontFamily: t.font.body, fontSize: 14, lineHeight: 20, color: t.color.textSecondary }}>{state.profile.subscriptionStatus === "premium" ? "Active premium subscription." : "7-day free trial, then $4.99/mo or $29.99/yr."}</Text>
          {state.profile.subscriptionStatus !== "premium" && <ActionButton icon="card-outline" label="View trial offer" onPress={() => open("paywall")} />}
          <PressableScale onPress={handleRestore} disabled={restoring} accessibilityLabel="Restore purchases" style={{ minHeight: 44, alignItems: "center", justifyContent: "center", marginTop: 4 }}>
            <Text style={{ fontFamily: t.font.bodySemibold, fontSize: 14, color: t.color.primaryDeep }}>{restoring ? "Restoring…" : "Restore purchases"}</Text>
          </PressableScale>
        </Card>
      </FadeIn>

      <View style={{ marginTop: t.space.lg24 }}>
        <SettingsRow icon="shield-checkmark-outline" label="Privacy policy" onPress={() => Linking.openURL(PRIVACY_URL)} />
        <SettingsRow icon="document-text-outline" label="Terms of service" onPress={() => Linking.openURL(TERMS_URL)} />
        <SettingsRow icon="help-circle-outline" label="Support" onPress={() => Linking.openURL(SUPPORT_URL)} />
        {state.account ? <SettingsRow icon="trash-outline" label="Delete account" value={deleting ? "Deleting…" : "Permanently remove all data"} destructive onPress={handleDelete} /> : null}
      </View>
    </Screen>
  );
};

// ══════════════════════════════════════════════════════════════════
// Sheet host + sheets
// ══════════════════════════════════════════════════════════════════
const SheetHost = ({ sheet, setSheet, state, actions }: { sheet: Sheet; setSheet: (s: Sheet) => void; state: Store["state"]; actions: Store["actions"] }) => {
  const t = useTheme();
  return (
    <Modal visible={sheet !== null} transparent animationType="slide" onRequestClose={() => setSheet(null)}>
      <Pressable style={{ flex: 1, justifyContent: "flex-end", backgroundColor: t.color.scrim }} onPress={() => setSheet(null)}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ justifyContent: "flex-end" }}>
          <Pressable style={{ backgroundColor: t.color.bg, borderTopLeftRadius: t.radius.xl, borderTopRightRadius: t.radius.xl, maxHeight: "88%" }} onPress={(e) => e.stopPropagation()}>
            <View style={{ alignItems: "center", paddingTop: 10 }}>
              <View style={{ width: 44, height: 4, borderRadius: 999, backgroundColor: t.color.border }} />
              <PressableScale onPress={() => setSheet(null)} accessibilityLabel="Close" hitSlop={12} style={{ position: "absolute", right: 16, top: 8, width: 36, height: 36, borderRadius: 18, alignItems: "center", justifyContent: "center", backgroundColor: t.color.surfaceAlt }}>
                <Ionicons name="close" size={20} color={t.color.text} />
              </PressableScale>
            </View>
            <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: t.space.lg24, paddingTop: t.space.base16, paddingBottom: t.space.xl32 }}>
              {sheet === "health" && <HealthSheet close={() => setSheet(null)} actions={actions} weight={state.profile.weightLbs} />}
              {sheet === "memory" && <MemorySheet close={() => setSheet(null)} actions={actions} />}
              {sheet === "medication" && <MedicationSheet close={() => setSheet(null)} actions={actions} />}
              {sheet === "mood" && <MoodSheet close={() => setSheet(null)} actions={actions} />}
              {sheet === "paywall" && <PaywallSheet close={() => setSheet(null)} actions={actions} />}
            </ScrollView>
          </Pressable>
        </KeyboardAvoidingView>
      </Pressable>
    </Modal>
  );
};

const SheetTitle = ({ children }: { children: React.ReactNode }) => {
  const t = useTheme();
  return <Text style={{ fontFamily: t.font.displayBold, fontSize: 24, color: t.color.text, marginBottom: t.space.base16 }}>{children}</Text>;
};

const HealthSheet = ({ actions, close, weight }: { actions: Store["actions"]; close: () => void; weight: number }) => {
  const [breathingEffort, setBreathingEffort] = useState(35);
  const [snoringLevel, setSnoringLevel] = useState(40);
  const [sleepHours, setSleepHours] = useState(12);
  const [weightLbs, setWeightLbs] = useState(weight > 0 ? weight : 24);
  const [note, setNote] = useState("");
  return (
    <View>
      <SheetTitle>Breathing check-in</SheetTitle>
      <Stepper label="Breathing effort" value={breathingEffort} suffix="%" min={0} max={100} onChange={setBreathingEffort} />
      <Stepper label="Snoring level" value={snoringLevel} suffix="%" min={0} max={100} onChange={setSnoringLevel} />
      <Stepper label="Sleep" value={sleepHours} suffix=" hr" min={0} max={24} onChange={setSleepHours} />
      <Stepper label="Weight" value={weightLbs} suffix=" lb" min={5} max={80} onChange={setWeightLbs} />
      <Field label="Notes" value={note} onChangeText={setNote} placeholder="What changed today?" multiline />
      <ActionButton icon="save-outline" label="Save check-in" onPress={() => { actions.addHealth({ breathingEffort: breathingEffort / 100, snoringLevel: snoringLevel / 100, sleepHours, weightLbs, activity: breathingEffort > 55 ? "Low" : "Moderate", note }); close(); }} />
    </View>
  );
};

const MemorySheet = ({ actions, close }: { actions: Store["actions"]; close: () => void }) => {
  const [caption, setCaption] = useState("");
  const [stage, setStage] = useState<LifeStage>("Adult");
  return (
    <View>
      <SheetTitle>Add a memory</SheetTitle>
      <Field label="Caption" value={caption} onChangeText={setCaption} placeholder="A tiny win from today" multiline />
      <SegmentedControl segments={["Puppyhood", "Adult", "Senior"] as const} value={stage} onChange={setStage} />
      <ActionButton icon="save-outline" label="Save memory" onPress={() => { actions.addMemory(caption, stage); close(); }} />
    </View>
  );
};

const MedicationSheet = ({ actions, close }: { actions: Store["actions"]; close: () => void }) => {
  const [name, setName] = useState("");
  return (
    <View>
      <SheetTitle>Medication reminder</SheetTitle>
      <Field label="Name" value={name} onChangeText={setName} placeholder="Supplement or medication" />
      <ActionButton icon="add-circle-outline" label="Add reminder" onPress={() => { actions.addMedication(name); close(); }} />
    </View>
  );
};

const MOODS: { title: string; energy: string; summary: string }[] = [
  { title: "Cozy & calm", energy: "Calm", summary: "Relaxed posture and soft eyes — a gentle, predictable day suits best." },
  { title: "Zoomies", energy: "Playful", summary: "High spark and playful energy — short bursts of indoor play are perfect." },
  { title: "Curious", energy: "Curious", summary: "Alert and focused — a great time for a little training." },
  { title: "Tired", energy: "Low", summary: "Low energy and lots of rest — keep activity light and offer water." },
  { title: "Clingy", energy: "Affectionate", summary: "Extra cuddly and close — a slow, comforting day is ideal." },
  { title: "Off / unwell", energy: "Watch", summary: "Seems a little off — watch breathing and comfort closely today." },
];

const MoodSheet = ({ actions, close }: { actions: Store["actions"]; close: () => void }) => {
  const t = useTheme();
  const [pick, setPick] = useState<number | null>(null);
  const [note, setNote] = useState("");
  return (
    <View>
      <SheetTitle>Log today's mood</SheetTitle>
      <Text style={{ fontFamily: t.font.body, fontSize: 14, lineHeight: 20, color: t.color.textSecondary, marginBottom: t.space.base16 }}>How does your Frenchie seem today? Tap the closest match.</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", gap: t.space.sm8 }}>
        {MOODS.map((m, i) => {
          const active = pick === i;
          return (
            <PressableScale key={m.title} onPress={() => setPick(i)} accessibilityLabel={m.title} style={{ paddingHorizontal: t.space.base16, paddingVertical: t.space.md12, borderRadius: t.radius.pill, backgroundColor: active ? t.color.primary : t.color.surface, borderWidth: 1.5, borderColor: active ? t.color.primary : t.color.border }}>
              <Text style={{ fontFamily: t.font.bodySemibold, fontSize: 14, color: active ? t.color.onPrimary : t.color.text }}>{m.title}</Text>
            </PressableScale>
          );
        })}
      </View>
      <View style={{ marginTop: t.space.base16 }}>
        <Field label="Note (optional)" value={note} onChangeText={setNote} placeholder="Sleepy eyes after breakfast" multiline />
      </View>
      <ActionButton icon="checkmark-circle-outline" label="Save mood" disabled={pick === null} onPress={() => { if (pick === null) return; const m = MOODS[pick]; actions.logMood({ moodTitle: m.title, energyTag: m.energy, summary: m.summary, note }); close(); }} />
    </View>
  );
};

const PaywallSheet = ({ actions, close }: { actions: Store["actions"]; close: () => void }) => {
  const t = useTheme();
  const [packages, setPackages] = useState<OfferingPackages>({ monthly: null, annual: null });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { getPackages().then(setPackages).catch(() => undefined); }, []);

  const buy = async (type: "monthly" | "annual") => {
    const pkg = packages[type];
    if (!pkg) { setError("Plans aren't available right now. Please try again."); return; }
    setBusy(true); setError("");
    try { const ok = await purchasePackage(pkg); if (ok) { actions.setPremiumStatus("premium"); close(); } }
    catch (e) { const m = e instanceof Error ? e.message : "Purchase failed."; if (!m.includes("cancelled")) setError(m); }
    finally { setBusy(false); }
  };

  const monthly = packages.monthly ? `${packages.monthly.product.priceString}/mo` : "$4.99/mo";
  const annual = packages.annual ? `${packages.annual.product.priceString}/yr` : "$29.99/yr";

  return (
    <View>
      <SheetTitle>Frenchie Buddy Premium</SheetTitle>
      <Text style={{ fontFamily: t.font.display, fontSize: 20, color: t.color.primaryDeep, marginBottom: 4 }}>7-day free trial</Text>
      <Text style={{ fontFamily: t.font.body, fontSize: 14, lineHeight: 20, color: t.color.textSecondary, marginBottom: t.space.base16 }}>Try every premium feature free for 7 days. Cancel anytime.</Text>
      {premiumBenefits.map((b) => (
        <View key={b} style={{ flexDirection: "row", alignItems: "center", gap: t.space.sm8, marginBottom: t.space.sm8 }}>
          <Ionicons name="checkmark-circle" size={20} color={t.color.success} />
          <Text style={{ flex: 1, fontFamily: t.font.body, fontSize: 14, color: t.color.text }}>{b}</Text>
        </View>
      ))}
      <ActionButton icon="sparkles-outline" label={busy ? "Working…" : `Start trial — ${annual}`} onPress={() => buy("annual")} disabled={busy} />
      <ActionButton icon="card-outline" label={busy ? "Working…" : `Monthly — ${monthly}`} onPress={() => buy("monthly")} secondary disabled={busy} />
      {error ? <Text style={{ fontFamily: t.font.body, fontSize: 13, color: t.color.dangerDeep, marginTop: 8 }}>{error}</Text> : null}
      <PressableScale onPress={async () => { const ok = await actions.restorePurchases(); if (ok) close(); else setError("No previous purchases found."); }} accessibilityLabel="Restore purchases" style={{ minHeight: 44, alignItems: "center", justifyContent: "center", marginTop: 4 }}>
        <Text style={{ fontFamily: t.font.bodySemibold, fontSize: 14, color: t.color.primaryDeep }}>Restore purchases</Text>
      </PressableScale>
      <LegalRow />
      <Text style={{ fontFamily: t.font.body, fontSize: 11, lineHeight: 16, color: t.color.textTertiary, textAlign: "center", marginTop: t.space.md12 }}>
        Payment is charged to your App Store account. Subscriptions auto-renew unless canceled at least 24 hours before the end of the current period.
      </Text>
    </View>
  );
};
