import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import { colors } from "../theme/colors";
import type { SafetyLevel } from "../types";

export type IconName = React.ComponentProps<typeof Ionicons>["name"];

export const Screen = ({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) => (
  <ScrollView
    style={styles.screen}
    contentContainerStyle={styles.screenContent}
    showsVerticalScrollIndicator={false}
  >
    <Text style={styles.appName}>Frenchie Buddy</Text>
    <Text style={styles.screenTitle}>{title}</Text>
    <Text style={styles.screenSubtitle}>{subtitle}</Text>
    {children}
    <View style={styles.bottomSpacer} />
  </ScrollView>
);

export const Gauge = ({ level }: { level: SafetyLevel }) => {
  const stroke =
    level === "Safe"
      ? colors.success
      : level === "Caution"
        ? colors.warning
        : colors.error;
  return (
    <View style={styles.gauge}>
      <Svg width={90} height={90} viewBox="0 0 90 90">
        <Circle
          cx="45"
          cy="45"
          r="34"
          stroke={colors.surfaceSecondary}
          strokeWidth="10"
          fill="none"
        />
        <Circle
          cx="45"
          cy="45"
          r="34"
          stroke={stroke}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="160 214"
          rotation="-120"
          origin="45,45"
        />
      </Svg>
      <Ionicons
        name={
          level === "Safe"
            ? "leaf-outline"
            : level === "Caution"
              ? "partly-sunny-outline"
              : "flame-outline"
        }
        size={24}
        color={stroke}
        style={styles.gaugeIcon}
      />
    </View>
  );
};

export const Stepper = ({
  label,
  value,
  suffix,
  min,
  max,
  onChange,
}: {
  label: string;
  value: number;
  suffix: string;
  min: number;
  max: number;
  onChange: (value: number) => void;
}) => (
  <View style={styles.stepper}>
    <View>
      <Text style={styles.rowTitle}>{label}</Text>
      <Text style={styles.rowSub}>
        {Math.round(value)}
        {suffix}
      </Text>
    </View>
    <View style={styles.stepControls}>
      <Pressable
        style={styles.iconButton}
        onPress={() => onChange(Math.max(min, value - 1))}
      >
        <Ionicons name="remove" size={18} color={colors.primary} />
      </Pressable>
      <Pressable
        style={styles.iconButton}
        onPress={() => onChange(Math.min(max, value + 1))}
      >
        <Ionicons name="add" size={18} color={colors.primary} />
      </Pressable>
    </View>
  </View>
);

export const Metric = ({
  label,
  value,
}: {
  label: string;
  value: string;
}) => (
  <View style={styles.metric}>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={styles.metricLabel}>{label}</Text>
  </View>
);

export const Progress = ({
  value,
  level,
}: {
  value: number;
  level: SafetyLevel;
}) => (
  <View style={styles.progressTrack}>
    <View
      style={[
        styles.progressFill,
        {
          width: `${Math.round(value * 100)}%`,
          backgroundColor: levelColor(level),
        },
      ]}
    />
  </View>
);

export const MoodCard = ({
  mood,
}: {
  mood: {
    moodTitle: string;
    summary: string;
    confidence: number;
    energyTag: string;
  };
}) => (
  <View style={styles.panel}>
    <Text style={styles.kicker}>Latest scan</Text>
    <Text style={styles.cardTitle}>{mood.moodTitle}</Text>
    <Text style={styles.bodyText}>{mood.summary}</Text>
    <Text style={styles.rowSub}>
      Confidence {Math.round(mood.confidence * 100)}% | {mood.energyTag}
    </Text>
  </View>
);

export const ActionButton = ({
  icon,
  label,
  onPress,
  compact,
  secondary,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
  compact?: boolean;
  secondary?: boolean;
}) => (
  <Pressable
    style={[
      styles.actionButton,
      compact && styles.actionButtonCompact,
      secondary && styles.actionButtonSecondary,
    ]}
    onPress={onPress}
  >
    <Ionicons
      name={icon}
      size={18}
      color={secondary ? colors.primary : colors.inkOnDark}
    />
    <Text
      style={[styles.actionText, secondary && styles.actionTextSecondary]}
    >
      {label}
    </Text>
  </Pressable>
);

export const ActionPill = ({
  icon,
  label,
  onPress,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
}) => (
  <Pressable style={styles.actionPill} onPress={onPress}>
    <Ionicons name={icon} size={16} color={colors.primary} />
    <Text style={styles.actionPillText}>{label}</Text>
  </Pressable>
);

export const SettingsRow = ({
  icon,
  label,
  value,
}: {
  icon: IconName;
  label: string;
  value: string;
}) => (
  <View style={styles.settingsRow}>
    <Ionicons name={icon} size={21} color={colors.primary} />
    <View style={styles.rowText}>
      <Text style={styles.rowTitle}>{label}</Text>
      <Text style={styles.rowSub}>{value}</Text>
    </View>
  </View>
);

export const Field = ({
  label,
  ...props
}: { label: string } & React.ComponentProps<typeof TextInput>) => (
  <View style={styles.field}>
    <Text style={styles.fieldLabel}>{label}</Text>
    <TextInput
      {...props}
      placeholderTextColor={colors.inkMuted}
      style={[styles.input, props.multiline && styles.inputMultiline]}
    />
  </View>
);

export const EmptyState = ({
  icon,
  message,
}: {
  icon: IconName;
  message: string;
}) => (
  <View style={styles.emptyState}>
    <Ionicons name={icon} size={32} color={colors.inkMuted} />
    <Text style={styles.emptyStateText}>{message}</Text>
  </View>
);

export const levelColor = (level: SafetyLevel) =>
  level === "Safe"
    ? colors.success
    : level === "Caution"
      ? colors.warning
      : colors.error;

export const levelBorder = (level: SafetyLevel) => ({
  borderColor: levelColor(level),
});

export const styles = StyleSheet.create({
  app: { flex: 1, backgroundColor: colors.background },
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
  },
  loadingText: { marginTop: 12, color: colors.inkSoft, fontSize: 14 },
  shell: { flex: 1 },
  screen: { flex: 1 },
  screenContent: { padding: 20, paddingTop: 58 },
  appName: {
    color: colors.inkSoft,
    fontSize: 13,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  screenTitle: {
    color: colors.primary,
    fontSize: 34,
    fontWeight: "800",
    marginTop: 5,
  },
  screenSubtitle: {
    color: colors.inkSoft,
    fontSize: 15,
    marginTop: 4,
    marginBottom: 18,
  },
  heroBand: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 18,
    borderWidth: 2,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
  },
  kicker: {
    color: colors.inkSoft,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  heroTitle: { color: colors.primary, fontSize: 34, fontWeight: "900" },
  heroCopy: {
    color: colors.ink,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 12,
  },
  metricRow: { flexDirection: "row", gap: 10, marginTop: 14 },
  metric: {
    flex: 1,
    backgroundColor: colors.surfaceSecondary,
    padding: 12,
    borderRadius: 8,
  },
  metricValue: { color: colors.primary, fontSize: 18, fontWeight: "800" },
  metricLabel: { color: colors.inkSoft, fontSize: 12, marginTop: 2 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 22,
    marginBottom: 10,
  },
  sectionTitle: {
    color: colors.primary,
    fontSize: 19,
    fontWeight: "800",
    marginTop: 14,
    marginBottom: 8,
  },
  sectionMeta: { color: colors.inkSoft, fontSize: 13, fontWeight: "700" },
  stepper: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stepControls: { flexDirection: "row", gap: 8 },
  iconButton: {
    width: 38,
    height: 38,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceSecondary,
  },
  actionButton: {
    backgroundColor: colors.primary,
    minHeight: 48,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    paddingHorizontal: 14,
    marginTop: 12,
  },
  actionButtonCompact: { minHeight: 42, flex: 1 },
  actionButtonSecondary: { backgroundColor: colors.surfaceSecondary },
  actionText: { color: colors.inkOnDark, fontSize: 14, fontWeight: "800" },
  actionTextSecondary: { color: colors.primary },
  twoCol: { flexDirection: "row", gap: 12, marginTop: 14 },
  panel: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 14,
    marginTop: 10,
  },
  panelTitle: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "800",
    marginBottom: 8,
  },
  timerText: {
    color: colors.primary,
    fontSize: 30,
    fontWeight: "900",
    marginBottom: 6,
  },
  largeValue: { color: colors.primary, fontSize: 20, fontWeight: "800" },
  pulseCard: {
    backgroundColor: colors.surfaceDark,
    borderRadius: 8,
    padding: 18,
  },
  bigHeadline: {
    color: colors.primary,
    fontSize: 26,
    fontWeight: "900",
    marginBottom: 6,
  },
  cardTitle: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: "800",
    marginTop: 8,
    marginBottom: 6,
  },
  bodyText: { color: colors.ink, fontSize: 14, lineHeight: 21 },
  tipBox: {
    backgroundColor: colors.bone,
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
    flexDirection: "row",
    gap: 8,
  },
  tipText: { color: colors.ink, flex: 1, fontSize: 13, lineHeight: 19 },
  buttonRow: { flexDirection: "row", gap: 10, marginTop: 6 },
  lockedPanel: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.surfaceSecondary,
    padding: 14,
    marginTop: 14,
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  lockedText: { color: colors.ink, flex: 1, fontSize: 14, lineHeight: 20 },
  progressTrack: {
    height: 10,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 999,
    overflow: "hidden",
    marginVertical: 12,
  },
  progressFill: { height: "100%", borderRadius: 999 },
  chart: {
    height: 150,
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 14,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 12,
  },
  chartBarWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  chartBar: {
    width: "80%",
    borderRadius: 8,
    backgroundColor: colors.secondary,
  },
  chartLabel: { color: colors.inkSoft, fontSize: 11, marginTop: 6 },
  listRow: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  rowText: { flex: 1 },
  rowTitle: { color: colors.primary, fontSize: 15, fontWeight: "800" },
  rowSub: { color: colors.inkSoft, fontSize: 12, marginTop: 3 },
  disclaimer: {
    color: colors.inkSoft,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 14,
  },
  segmented: {
    flexDirection: "row",
    backgroundColor: colors.surfaceSecondary,
    borderRadius: 8,
    padding: 4,
    marginBottom: 12,
  },
  segment: {
    flex: 1,
    minHeight: 36,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    paddingHorizontal: 6,
  },
  segmentActive: { backgroundColor: colors.surface },
  segmentText: { color: colors.inkSoft, fontSize: 12, fontWeight: "800" },
  segmentTextActive: { color: colors.primary },
  memoryCard: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 10,
    marginTop: 12,
    flexDirection: "row",
    gap: 12,
  },
  memoryArt: {
    width: 74,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  memoryBody: { flex: 1, minHeight: 76 },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.surfaceSecondary,
    color: colors.primary,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    fontSize: 11,
    fontWeight: "800",
    marginTop: 8,
  },
  profileTop: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: 8,
    padding: 16,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.surfaceSecondary,
  },
  profileInfo: { flex: 1 },
  restoreButton: {
    minHeight: 42,
    alignItems: "center",
    justifyContent: "center",
  },
  restoreText: { color: colors.primary, fontWeight: "800" },
  settingsRow: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.surfaceSecondary,
  },
  tabBar: {
    position: "absolute",
    left: 12,
    right: 12,
    bottom: 12,
    backgroundColor: colors.surface,
    borderRadius: 8,
    flexDirection: "row",
    padding: 6,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 16,
    elevation: 5,
  },
  tabButton: {
    flex: 1,
    minHeight: 54,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    gap: 3,
  },
  tabButtonActive: { backgroundColor: colors.bone },
  tabLabel: { color: colors.inkMuted, fontSize: 10, fontWeight: "800" },
  tabLabelActive: { color: colors.primary },
  modalShade: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(20, 14, 10, 0.35)",
  },
  sheetWrap: { justifyContent: "flex-end" },
  sheet: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "88%",
  },
  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 4,
    paddingHorizontal: 20,
  },
  sheetHandle: {
    width: 44,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.inkMuted,
  },
  sheetClose: {
    position: "absolute",
    right: 14,
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  sheetScrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 32,
  },
  sheetTitle: {
    color: colors.primary,
    fontSize: 24,
    fontWeight: "900",
    marginBottom: 12,
  },
  field: { marginBottom: 12 },
  fieldLabel: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "800",
    marginBottom: 6,
  },
  input: {
    backgroundColor: colors.surface,
    borderRadius: 8,
    minHeight: 46,
    paddingHorizontal: 12,
    color: colors.ink,
    fontSize: 15,
  },
  inputMultiline: {
    minHeight: 88,
    paddingTop: 12,
    textAlignVertical: "top",
  },
  errorText: { color: colors.error, fontSize: 13, marginBottom: 8 },
  actionPill: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    backgroundColor: colors.surfaceSecondary,
    paddingHorizontal: 10,
    minHeight: 32,
    borderRadius: 999,
  },
  actionPillText: { color: colors.primary, fontSize: 12, fontWeight: "800" },
  benefitRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 32,
    gap: 10,
  },
  emptyStateText: {
    color: colors.inkMuted,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: 260,
  },
  legalRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 14,
    gap: 2,
  },
  legalLink: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "700",
    textDecorationLine: "underline",
  },
  legalDot: { color: colors.inkMuted, fontSize: 13 },
  autoRenewText: {
    color: colors.inkMuted,
    fontSize: 11,
    lineHeight: 16,
    textAlign: "center",
    marginTop: 8,
  },
  gauge: {
    width: 90,
    height: 90,
    alignItems: "center",
    justifyContent: "center",
  },
  gaugeIcon: { position: "absolute" },
  floatingStatus: {
    position: "absolute",
    left: 24,
    right: 24,
    bottom: 84,
    alignItems: "center",
  },
  floatingText: {
    backgroundColor: colors.surfaceDark,
    color: colors.inkOnDark,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 999,
    overflow: "hidden",
    fontSize: 12,
    fontWeight: "800",
  },
  bottomSpacer: { height: 116 },
});

// ── Onboarding styles ──
export const onboard = StyleSheet.create({
  container: {
    padding: 24,
    paddingTop: 64,
    paddingBottom: 40,
  },
  hero: {
    alignItems: "center",
    marginBottom: 32,
  },
  logoCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginBottom: 16,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "900",
    color: colors.primary,
    textAlign: "center",
  },
  tagline: {
    fontSize: 16,
    color: colors.inkSoft,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 22,
    maxWidth: 280,
  },
  featureRow: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    marginBottom: 18,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: colors.surfaceSecondary,
    alignItems: "center",
    justifyContent: "center",
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.primary,
  },
  featureDesc: {
    fontSize: 13,
    color: colors.inkSoft,
    lineHeight: 18,
    marginTop: 2,
  },
  buttonGroup: {
    marginTop: 24,
    gap: 0,
  },
  formTitle: {
    fontSize: 26,
    fontWeight: "900",
    color: colors.primary,
    textAlign: "center",
    marginBottom: 8,
  },
  formSubtitle: {
    fontSize: 15,
    color: colors.inkSoft,
    textAlign: "center",
    lineHeight: 21,
    marginBottom: 28,
    maxWidth: 300,
    alignSelf: "center",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginBottom: 24,
    alignSelf: "flex-start",
  },
  backText: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.primary,
  },
  switchRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  switchText: {
    fontSize: 14,
    color: colors.inkSoft,
  },
  switchLink: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.primary,
  },
});
