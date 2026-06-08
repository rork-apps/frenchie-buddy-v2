import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import Svg, { Circle } from "react-native-svg";
import type { SafetyLevel } from "../types";
import { Theme, useTheme } from "../theme/theme";

export { useTheme };
export type IconName = React.ComponentProps<typeof Ionicons>["name"];

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

// ── zone colour for the heat gauge / level chips ──
export const zoneColor = (t: Theme, level: SafetyLevel) =>
  level === "Safe" ? t.color.safe : level === "Caution" ? t.color.caution : t.color.danger;
export const zoneDeep = (t: Theme, level: SafetyLevel) =>
  level === "Safe" ? t.color.safeDeep : level === "Caution" ? t.color.cautionDeep : t.color.dangerDeep;

// ══════════════════════════════════════════════════════════════════
// Motion primitives (RN Animated — zero-config, no babel plugin needed)
// ══════════════════════════════════════════════════════════════════

/** Staggered fade + rise entrance. */
export const FadeIn = ({
  children, delay = 0, y = 14, style,
}: { children: React.ReactNode; delay?: number; y?: number; style?: ViewStyle | ViewStyle[] }) => {
  const t = useTheme();
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(v, {
      toValue: 1, duration: t.motion.base, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true,
    }).start();
  }, [v, delay, t.motion.base]);
  return (
    <Animated.View
      style={[
        style as ViewStyle,
        { opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [y, 0] }) }] },
      ]}
    >
      {children}
    </Animated.View>
  );
};

/** Press-scale wrapper for any tappable. */
export const PressableScale = ({
  children, onPress, disabled, style, hitSlop, accessibilityLabel, accessibilityRole,
}: {
  children: React.ReactNode; onPress?: () => void; disabled?: boolean;
  style?: ViewStyle | ViewStyle[]; hitSlop?: number;
  accessibilityLabel?: string; accessibilityRole?: "button" | "link";
}) => {
  const t = useTheme();
  const scale = useRef(new Animated.Value(1)).current;
  const to = (v: number) =>
    Animated.spring(scale, { toValue: v, useNativeDriver: true, speed: 40, bounciness: 4 }).start();
  // The Pressable IS the styled/animated element, so a passed flex/layout style
  // (e.g. flex:1 on a tab) actually distributes — not trapped on a child wrapper.
  return (
    <AnimatedPressable
      onPress={onPress}
      disabled={disabled}
      hitSlop={hitSlop ?? 8}
      onPressIn={() => to(t.motion.pressScale)}
      onPressOut={() => to(1)}
      accessibilityRole={accessibilityRole ?? "button"}
      accessibilityLabel={accessibilityLabel}
      style={[style as ViewStyle, { transform: [{ scale }] }, disabled ? { opacity: 0.4 } : null]}
    >
      {children}
    </AnimatedPressable>
  );
};

/** Shimmering skeleton block (the loading honest state — mirrors layout, not a spinner). */
export const Skeleton = ({ height = 16, width, radius, style }: { height?: number; width?: number | string; radius?: number; style?: ViewStyle }) => {
  const t = useTheme();
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(v, { toValue: 1, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(v, { toValue: 0, duration: 800, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [v]);
  return (
    <Animated.View
      style={[
        { height, width: (width ?? "100%") as any, borderRadius: radius ?? t.radius.sm, backgroundColor: t.color.surfaceAlt, opacity: v.interpolate({ inputRange: [0, 1], outputRange: [0.5, 1] }) },
        style,
      ]}
    />
  );
};

/** Count-up animated number. */
export const AnimatedNumber = ({ value, suffix = "", style }: { value: number; suffix?: string; style?: any }) => {
  const t = useTheme();
  const v = useRef(new Animated.Value(0)).current;
  const [display, setDisplay] = React.useState(0);
  useEffect(() => {
    const id = v.addListener(({ value: x }) => setDisplay(Math.round(x)));
    Animated.timing(v, { toValue: value, duration: t.motion.slow, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
    return () => v.removeListener(id);
  }, [value, v, t.motion.slow]);
  return <Text style={style}>{display}{suffix}</Text>;
};

// ══════════════════════════════════════════════════════════════════
// Surfaces (treatment-driven)
// ══════════════════════════════════════════════════════════════════

export const Card = ({ children, style, elevated = "sm" }: { children: React.ReactNode; style?: ViewStyle | ViewStyle[]; elevated?: "none" | "sm" | "md" }) => {
  const t = useTheme();
  return (
    <View style={[{ backgroundColor: t.color.surface, borderRadius: t.radius.lg, padding: t.space.lg24, borderWidth: StyleSheet.hairlineWidth, borderColor: t.color.border }, t.elevation[elevated], style as ViewStyle]}>
      {children}
    </View>
  );
};

export const GradientHero = ({ children, colors, style }: { children: React.ReactNode; colors?: [string, string]; style?: ViewStyle }) => {
  const t = useTheme();
  const g = colors ?? (t.treatment.heroGradient[t.scheme] as [string, string]);
  return (
    <LinearGradient colors={g} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[{ borderRadius: t.radius.hero, padding: t.space.lg24, ...t.elevation.md }, style]}>
      {children}
    </LinearGradient>
  );
};

// ══════════════════════════════════════════════════════════════════
// Heat Safety arc gauge — the hero / signature moment
// ══════════════════════════════════════════════════════════════════

export const ArcGauge = ({ value, level, centerLabel, centerSuffix }: { value: number; level: SafetyLevel; centerLabel: number; centerSuffix?: string }) => {
  const t = useTheme();
  const size = 230;
  const stroke = 18;
  const r = (size - stroke) / 2;
  const C = 2 * Math.PI * r;
  const sweep = 0.75; // 270°
  const arcLen = C * sweep;
  const offset = useRef(new Animated.Value(arcLen)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const fillColor = zoneColor(t, level);

  useEffect(() => {
    Animated.timing(offset, {
      toValue: arcLen * (1 - Math.max(0, Math.min(1, value))),
      duration: t.motion.slow + 300, easing: Easing.out(Easing.cubic), useNativeDriver: false,
    }).start();
  }, [value, arcLen, offset, t.motion.slow]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(glow, { toValue: 1, duration: level === "Danger" ? 700 : 1600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
        Animated.timing(glow, { toValue: 0, duration: level === "Danger" ? 700 : 1600, easing: Easing.inOut(Easing.ease), useNativeDriver: true }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [glow, level]);

  // Open-bottom 270° gauge. The SVG box is the full `size` (no upward overflow
  // over the label); the gap is centred at the bottom via rotation.
  return (
    <View style={{ width: size, height: size, alignItems: "center", justifyContent: "center" }}>
      <Animated.View style={{ position: "absolute", opacity: glow.interpolate({ inputRange: [0, 1], outputRange: [0.0, 0.2] }), transform: [{ scale: glow.interpolate({ inputRange: [0, 1], outputRange: [0.9, 1.05] }) }] }}>
        <View style={{ width: r * 1.35, height: r * 1.35, borderRadius: r, backgroundColor: fillColor }} />
      </Animated.View>
      <Svg width={size} height={size} style={{ transform: [{ scaleX: -1 }] }}>
        <Circle cx={size / 2} cy={size / 2} r={r} stroke={t.color.surfaceAlt} strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={`${arcLen} ${C}`} rotation={315} origin={`${size / 2}, ${size / 2}`} />
        <AnimatedCircle cx={size / 2} cy={size / 2} r={r} stroke={fillColor} strokeWidth={stroke} fill="none" strokeLinecap="round" strokeDasharray={`${arcLen} ${C}`} strokeDashoffset={offset as any} rotation={315} origin={`${size / 2}, ${size / 2}`} />
      </Svg>
      <View style={{ position: "absolute", alignItems: "center" }}>
        <AnimatedNumber value={centerLabel} suffix={centerSuffix} style={{ fontFamily: t.font.displayBold, fontSize: 60, lineHeight: 64, color: t.color.text }} />
        <Text style={{ fontFamily: t.type.caption.fontFamily, fontSize: 13, letterSpacing: 1.2, color: zoneDeep(t, level), textTransform: "uppercase", marginTop: 2 }}>{level}</Text>
      </View>
    </View>
  );
};

// ══════════════════════════════════════════════════════════════════
// Building blocks
// ══════════════════════════════════════════════════════════════════

export const Screen = ({ title, subtitle, kicker, children }: { title: string; subtitle?: string; kicker?: string; children: React.ReactNode }) => {
  const t = useTheme();
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ paddingHorizontal: t.space.screenX, paddingTop: 60, paddingBottom: 150 }} showsVerticalScrollIndicator={false}>
      {kicker ? <Text style={{ fontFamily: t.type.caption.fontFamily, fontSize: 11, letterSpacing: 1.4, textTransform: "uppercase", color: t.color.primaryDeep }}>{kicker}</Text> : null}
      <FadeIn>
        <Text style={{ fontFamily: t.font.displayBold, fontSize: 32, lineHeight: 38, color: t.color.text, marginTop: 4 }}>{title}</Text>
        {subtitle ? <Text style={{ fontFamily: t.font.body, fontSize: 15, lineHeight: 21, color: t.color.textSecondary, marginTop: 4, marginBottom: 8 }}>{subtitle}</Text> : null}
      </FadeIn>
      {children}
    </ScrollView>
  );
};

export const SectionHeader = ({ title, meta, action }: { title: string; meta?: string; action?: React.ReactNode }) => {
  const t = useTheme();
  return (
    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: t.space.lg24, marginBottom: t.space.md12 }}>
      <Text style={{ fontFamily: t.font.display, fontSize: 19, color: t.color.text }}>{title}</Text>
      {action ?? (meta ? <Text style={{ fontFamily: t.font.bodySemibold, fontSize: 13, color: t.color.textSecondary }}>{meta}</Text> : null)}
    </View>
  );
};

export const Stepper = ({ label, value, suffix, min, max, onChange }: { label: string; value: number; suffix: string; min: number; max: number; onChange: (v: number) => void }) => {
  const t = useTheme();
  return (
    <View style={{ backgroundColor: t.color.surface, borderRadius: t.radius.md, padding: t.space.base16, marginBottom: t.space.md12, flexDirection: "row", alignItems: "center", justifyContent: "space-between", borderWidth: StyleSheet.hairlineWidth, borderColor: t.color.border }}>
      <View>
        <Text style={{ fontFamily: t.font.bodySemibold, fontSize: 15, color: t.color.text }}>{label}</Text>
        <Text style={{ fontFamily: t.font.body, fontSize: 13, color: t.color.textSecondary, marginTop: 2 }}>{Math.round(value)}{suffix}</Text>
      </View>
      <View style={{ flexDirection: "row", gap: t.space.sm8 }}>
        {(["remove", "add"] as const).map((ic) => (
          <PressableScale key={ic} accessibilityLabel={`${ic === "add" ? "Increase" : "Decrease"} ${label}`} onPress={() => onChange(ic === "add" ? Math.min(max, value + 1) : Math.max(min, value - 1))} style={{ width: 44, height: 44, borderRadius: t.radius.sm, alignItems: "center", justifyContent: "center", backgroundColor: t.color.surfaceAlt }}>
            <Ionicons name={ic} size={20} color={t.color.primaryDeep} />
          </PressableScale>
        ))}
      </View>
    </View>
  );
};

export const Metric = ({ label, value, icon }: { label: string; value: string; icon?: IconName }) => {
  const t = useTheme();
  return (
    <View style={{ flex: 1, minWidth: 0, backgroundColor: t.color.surfaceAlt, paddingVertical: t.space.md12, paddingHorizontal: t.space.md12, borderRadius: t.radius.md, gap: 3 }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        {icon ? <Ionicons name={icon} size={12} color={t.color.textSecondary} /> : null}
        <Text numberOfLines={1} style={{ fontFamily: t.type.caption.fontFamily, fontSize: 10, letterSpacing: 0.3, textTransform: "uppercase", color: t.color.textSecondary }}>{label}</Text>
      </View>
      <Text numberOfLines={1} style={{ fontFamily: t.font.displayBold, fontSize: 16, color: t.color.text }}>{value}</Text>
    </View>
  );
};

export const Progress = ({ value, level }: { value: number; level: SafetyLevel }) => {
  const t = useTheme();
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => { Animated.timing(v, { toValue: Math.max(0, Math.min(1, value)), duration: t.motion.slow, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start(); }, [value, v, t.motion.slow]);
  return (
    <View style={{ height: 10, backgroundColor: t.color.surfaceAlt, borderRadius: t.radius.pill, overflow: "hidden", marginVertical: t.space.md12 }}>
      <Animated.View style={{ height: "100%", borderRadius: t.radius.pill, backgroundColor: zoneColor(t, level), width: v.interpolate({ inputRange: [0, 1], outputRange: ["0%", "100%"] }) }} />
    </View>
  );
};

/** Calm sparkline-ish bar trend (no scary medical chart). */
export const Sparkbars = ({ data, format }: { data: number[]; format?: (n: number) => string }) => {
  const t = useTheme();
  const max = Math.max(...data, 1);
  const min = Math.min(...data, 0);
  return (
    <View style={{ height: 130, backgroundColor: t.color.surface, borderRadius: t.radius.lg, padding: t.space.base16, flexDirection: "row", alignItems: "flex-end", gap: t.space.md12, borderWidth: StyleSheet.hairlineWidth, borderColor: t.color.border }}>
      {data.map((d, i) => {
        const h = 24 + ((d - min) / (max - min || 1)) * 70;
        return (
          <View key={i} style={{ flex: 1, alignItems: "center", justifyContent: "flex-end", gap: 6 }}>
            <View style={{ width: "70%", height: h, borderRadius: t.radius.sm, backgroundColor: i === data.length - 1 ? t.color.primary : t.color.secondary, opacity: i === data.length - 1 ? 1 : 0.45 }} />
            <Text style={{ fontFamily: t.font.body, fontSize: 11, color: t.color.textTertiary }}>{format ? format(d) : d}</Text>
          </View>
        );
      })}
    </View>
  );
};

export const ActionButton = ({ icon, label, onPress, compact, secondary, loading, disabled, fullWidth = true }: { icon?: IconName; label: string; onPress: () => void; compact?: boolean; secondary?: boolean; loading?: boolean; disabled?: boolean; fullWidth?: boolean }) => {
  const t = useTheme();
  const bg = secondary ? "transparent" : t.color.primary;
  const fg = secondary ? t.color.primaryDeep : t.color.onPrimary;
  return (
    <PressableScale onPress={onPress} disabled={disabled || loading} accessibilityLabel={label}
      style={{ minHeight: 50, borderRadius: t.radius.md, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: t.space.sm8, paddingHorizontal: t.space.lg24, marginTop: t.space.md12, backgroundColor: bg, borderWidth: secondary ? 1.5 : 0, borderColor: t.color.primary, flex: compact ? 1 : undefined, alignSelf: fullWidth && !compact ? "stretch" : undefined, ...(secondary ? {} : t.elevation.sm) }}>
      {icon ? <Ionicons name={loading ? "ellipsis-horizontal" : icon} size={18} color={fg} /> : null}
      <Text style={{ fontFamily: t.font.bodyBold, fontSize: 15, color: fg }}>{label}</Text>
    </PressableScale>
  );
};

export const ActionPill = ({ icon, label, onPress }: { icon: IconName; label: string; onPress: () => void }) => {
  const t = useTheme();
  return (
    <PressableScale onPress={onPress} accessibilityLabel={label} style={{ flexDirection: "row", gap: 5, alignItems: "center", backgroundColor: t.color.primarySubtle, paddingHorizontal: t.space.md12, minHeight: 36, borderRadius: t.radius.pill }}>
      <Ionicons name={icon} size={15} color={t.color.primaryDeep} />
      <Text style={{ fontFamily: t.font.bodyBold, fontSize: 13, color: t.color.primaryDeep }}>{label}</Text>
    </PressableScale>
  );
};

export const SegmentedControl = <T extends string>({ segments, value, onChange }: { segments: readonly T[]; value: T; onChange: (v: T) => void }) => {
  const t = useTheme();
  return (
    <View style={{ flexDirection: "row", backgroundColor: t.color.surfaceAlt, borderRadius: t.radius.md, padding: 4, marginBottom: t.space.md12 }}>
      {segments.map((seg) => {
        const active = seg === value;
        return (
          <PressableScale key={seg} onPress={() => onChange(seg)} accessibilityLabel={seg} style={{ flex: 1, minHeight: 40, alignItems: "center", justifyContent: "center", borderRadius: t.radius.sm, backgroundColor: active ? t.color.surface : "transparent", ...(active ? t.elevation.sm : {}) }}>
            <Text style={{ fontFamily: t.font.bodySemibold, fontSize: 13, color: active ? t.color.text : t.color.textSecondary }}>{seg}</Text>
          </PressableScale>
        );
      })}
    </View>
  );
};

export const Badge = ({ label, tone = "accent" }: { label: string; tone?: "accent" | "safe" | "primary" }) => {
  const t = useTheme();
  const map = { accent: [t.color.accent, t.color.accentDeep], safe: [t.color.successSubtle, t.color.safeDeep], primary: [t.color.primarySubtle, t.color.primaryDeep] } as const;
  return (
    <View style={{ alignSelf: "flex-start", backgroundColor: tone === "accent" ? "rgba(201,165,106,0.18)" : map[tone][0], borderRadius: t.radius.pill, paddingHorizontal: t.space.md12, paddingVertical: 4 }}>
      <Text style={{ fontFamily: t.font.bodyBold, fontSize: 11, color: map[tone][1] }}>{label}</Text>
    </View>
  );
};

export const SettingsRow = ({ icon, label, value, onPress, destructive }: { icon: IconName; label: string; value?: string; onPress?: () => void; destructive?: boolean }) => {
  const t = useTheme();
  const inner = (
    <View style={{ flexDirection: "row", gap: t.space.md12, alignItems: "center", paddingVertical: t.space.base16, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: t.color.border }}>
      <Ionicons name={icon} size={20} color={destructive ? t.color.dangerDeep : t.color.primaryDeep} />
      <View style={{ flex: 1 }}>
        <Text style={{ fontFamily: t.font.bodySemibold, fontSize: 15, color: destructive ? t.color.dangerDeep : t.color.text }}>{label}</Text>
        {value ? <Text style={{ fontFamily: t.font.body, fontSize: 13, color: t.color.textSecondary, marginTop: 2 }}>{value}</Text> : null}
      </View>
      {onPress ? <Ionicons name="chevron-forward" size={18} color={t.color.textTertiary} /> : null}
    </View>
  );
  return onPress ? <PressableScale onPress={onPress} accessibilityLabel={label} style={{}}>{inner}</PressableScale> : inner;
};

export const Field = ({ label, ...props }: { label: string } & React.ComponentProps<typeof TextInput>) => {
  const t = useTheme();
  return (
    <View style={{ marginBottom: t.space.md12 }}>
      <Text style={{ fontFamily: t.type.caption.fontFamily, fontSize: 11, letterSpacing: 0.6, textTransform: "uppercase", color: t.color.textSecondary, marginBottom: 6 }}>{label}</Text>
      <TextInput {...props} placeholderTextColor={t.color.textTertiary} style={[{ backgroundColor: t.color.surface, borderRadius: t.radius.md, minHeight: 50, paddingHorizontal: t.space.base16, fontFamily: t.font.body, fontSize: 16, color: t.color.text, borderWidth: 1.5, borderColor: t.color.border }, props.multiline && { minHeight: 92, paddingTop: t.space.md12, textAlignVertical: "top" }]} />
    </View>
  );
};

export const EmptyState = ({ icon, title, body, actionLabel, onAction }: { icon: IconName; title: string; body: string; actionLabel?: string; onAction?: () => void }) => {
  const t = useTheme();
  return (
    <FadeIn>
      <View style={{ alignItems: "center", justifyContent: "center", paddingVertical: t.space.xl32, gap: t.space.md12 }}>
        <View style={{ width: 64, height: 64, borderRadius: t.radius.pill, alignItems: "center", justifyContent: "center", backgroundColor: t.color.primarySubtle }}>
          <Ionicons name={icon} size={28} color={t.color.primaryDeep} />
        </View>
        <Text style={{ fontFamily: t.font.display, fontSize: 18, color: t.color.text, textAlign: "center" }}>{title}</Text>
        <Text style={{ fontFamily: t.font.body, fontSize: 14, lineHeight: 20, color: t.color.textSecondary, textAlign: "center", maxWidth: 280 }}>{body}</Text>
        {actionLabel && onAction ? <ActionButton icon="add" label={actionLabel} onPress={onAction} fullWidth={false} /> : null}
      </View>
    </FadeIn>
  );
};

// ── Frosted glass tab bar (chrome treatment) ──
export const GlassTabBar = ({ children }: { children: React.ReactNode }) => {
  const t = useTheme();
  return (
    <BlurView intensity={t.treatment.blur.md} tint={t.scheme === "dark" ? "dark" : "light"} style={{ position: "absolute", left: t.space.base16, right: t.space.base16, bottom: t.space.base16, borderRadius: t.radius.xl, overflow: "hidden", borderWidth: StyleSheet.hairlineWidth, borderColor: t.color.border, ...t.elevation.md }}>
      <View style={{ flexDirection: "row", padding: 6, backgroundColor: t.scheme === "dark" ? "rgba(26,23,20,0.55)" : "rgba(252,248,241,0.6)" }}>{children}</View>
    </BlurView>
  );
};

/** Loading skeleton for a card-heavy screen (mirrors layout, not a spinner). */
export const ScreenSkeleton = () => {
  const t = useTheme();
  return (
    <View style={{ paddingHorizontal: t.space.screenX, paddingTop: 60, gap: t.space.base16 }}>
      <Skeleton height={36} width="60%" radius={t.radius.sm} />
      <Skeleton height={18} width="80%" radius={t.radius.sm} />
      <Skeleton height={200} radius={t.radius.hero} style={{ marginTop: t.space.md12 }} />
      <Skeleton height={120} radius={t.radius.lg} />
      <Skeleton height={120} radius={t.radius.lg} />
    </View>
  );
};
