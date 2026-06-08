// theme.ts — the ONE per-app design artifact for Frenchie Buddy.
// Scope: warm-editorial (cream/ink/terracotta). AA-corrected light + dark.
// Every component reads these tokens. No screen hardcodes a color, size, radius, or duration.
import { useColorScheme } from "react-native";

export const scope = "warm-editorial" as const;
export const defaultScheme: "light" | "dark" | "system" = "light";

// ── Font families (loaded via @expo-google-fonts in App.tsx) ──
export const font = {
  display: "Fraunces_600SemiBold",
  displayBold: "Fraunces_700Bold",
  displayBlack: "Fraunces_700Bold",
  serif: "Fraunces_500Medium",
  body: "HankenGrotesk_400Regular",
  bodyMedium: "HankenGrotesk_500Medium",
  bodySemibold: "HankenGrotesk_600SemiBold",
  bodyBold: "HankenGrotesk_700Bold",
} as const;

// ── Colour — light (warm cream/ink/terracotta) ──
const light = {
  // surfaces
  bg: "#F7F1E8", // bone cream
  bgAlt: "#F3EBDD",
  surface: "#FCF8F1", // warmed white
  surfaceAlt: "#F1E9DC", // inset / track
  surfaceInk: "#2E251F", // dark editorial panel (horoscope etc.)
  border: "#E7DECF", // warm hairline
  // text (warm ink)
  text: "#3A2D26", // espresso
  textSecondary: "#7A6A5E",
  textTertiary: "#A2917F",
  onPrimary: "#FFF8EF",
  onInk: "#F6EFE3",
  // brand
  primary: "#C7745A", // clay / terracotta — main action
  primaryDeep: "#A85638", // AA-safe terracotta for text-on-cream
  primarySubtle: "#F3DED4",
  secondary: "#74846A", // sage / olive
  secondaryDeep: "#566B4C",
  accent: "#C9A56A", // warm gold — milestones / premium
  accentDeep: "#9E7C3F",
  // semantic (heat zones + status)
  safe: "#74846A",
  safeDeep: "#566B4C",
  safeGlow: "#98FB98",
  caution: "#C9A56A",
  cautionDeep: "#9E7C3F",
  danger: "#C0573F",
  dangerDeep: "#9B3F2C",
  success: "#5E7A52",
  successSubtle: "#E2EAD9",
  warning: "#C9A56A",
  info: "#6E8190",
  dangerSubtle: "#F4DDD6",
  // utility
  focus: "#A85638",
  scrim: "rgba(34, 23, 16, 0.42)",
};

// ── Colour — dark (warm, never harsh black) ──
const dark: typeof light = {
  bg: "#1A1714",
  bgAlt: "#211C18",
  surface: "#241F1B",
  surfaceAlt: "#2E2822",
  surfaceInk: "#15110E",
  border: "#3A332B",
  text: "#F3EDE3",
  textSecondary: "#C2B4A5",
  textTertiary: "#938A7F",
  onPrimary: "#241712",
  onInk: "#F6EFE3",
  primary: "#DB8F73",
  primaryDeep: "#E7A98F",
  primarySubtle: "#3A2820",
  secondary: "#9BB089",
  secondaryDeep: "#B6C9A6",
  accent: "#D9B97E",
  accentDeep: "#E6CE9C",
  safe: "#9BB089",
  safeDeep: "#B6C9A6",
  safeGlow: "#98FB98",
  caution: "#D9B97E",
  cautionDeep: "#E6CE9C",
  danger: "#E08266",
  dangerDeep: "#EFA189",
  success: "#9BB089",
  successSubtle: "#2A322323",
  warning: "#D9B97E",
  info: "#9DB0BE",
  dangerSubtle: "#3A2620",
  focus: "#E7A98F",
  scrim: "rgba(0, 0, 0, 0.55)",
};

export type ColorTokens = typeof light;

// ── Type ramp (Fraunces display + Hanken Grotesk body) ──
export const type = {
  display: { fontFamily: font.displayBold, fontSize: 34, lineHeight: 40 },
  title: { fontFamily: font.displayBold, fontSize: 28, lineHeight: 34 },
  h1: { fontFamily: font.display, fontSize: 22, lineHeight: 28 },
  h2: { fontFamily: font.display, fontSize: 18, lineHeight: 24 },
  body: { fontFamily: font.body, fontSize: 16, lineHeight: 23 },
  callout: { fontFamily: font.bodyMedium, fontSize: 15, lineHeight: 20 },
  footnote: { fontFamily: font.body, fontSize: 13, lineHeight: 18 },
  caption: { fontFamily: font.bodySemibold, fontSize: 11, lineHeight: 14, letterSpacing: 0.6 },
} as const;

export const space = {
  xs4: 4, sm8: 8, md12: 12, base16: 16, lg24: 24, xl32: 32, xxl40: 40, xxxl48: 48, screenX: 20,
} as const;

export const radius = {
  none: 0, sm: 12, md: 16, lg: 20, xl: 24, hero: 28, pill: 999,
} as const;

// Warm soft shadows — shadowColor is the espresso ink, never gray.
export const elevation = {
  none: {},
  sm: { shadowColor: "#3A2D26", shadowOpacity: 0.07, shadowRadius: 10, shadowOffset: { width: 0, height: 3 }, elevation: 2 },
  md: { shadowColor: "#3A2D26", shadowOpacity: 0.1, shadowRadius: 20, shadowOffset: { width: 0, height: 8 }, elevation: 5 },
  lg: { shadowColor: "#3A2D26", shadowOpacity: 0.16, shadowRadius: 28, shadowOffset: { width: 0, height: 14 }, elevation: 10 },
} as const;

export const motion = {
  fast: 120, base: 240, slow: 360, pressScale: 0.97, gain: 0.8,
} as const;

// Surface-treatment mix (warm-editorial): soft-shadow cards, frosted nav, gradient hero.
export const treatment = {
  base: "soft-shadow" as const,
  roles: {
    chrome: "glass", content: "soft-shadow", control: "soft-shadow",
    hero: "gradient", overlay: "glass", feedback: "flat",
  },
  blur: { sm: 12, md: 24, lg: 40 },
  glassTint: { light: "rgba(252,248,241,0.82)", dark: "rgba(26,23,20,0.74)" },
  // hero / horoscope gradient (cream → gold by default; zone-tinted on the gauge card)
  heroGradient: { light: ["#FCF8F1", "#F0E2C8"], dark: ["#2A2620", "#3A3326"] },
  horoscopeGradient: { light: ["#3A2D26", "#5B4636"], dark: ["#2A211C", "#3E2F26"] },
} as const;

export type Theme = {
  scheme: "light" | "dark";
  color: ColorTokens;
  font: typeof font;
  type: typeof type;
  space: typeof space;
  radius: typeof radius;
  elevation: typeof elevation;
  motion: typeof motion;
  treatment: typeof treatment;
};

export const buildTheme = (scheme: "light" | "dark"): Theme => ({
  scheme,
  color: scheme === "dark" ? dark : light,
  font, type, space, radius, elevation, motion, treatment,
});

export const useTheme = (): Theme => {
  const system = useColorScheme();
  const ds: string = defaultScheme;
  const scheme: "light" | "dark" =
    ds === "system" ? (system === "dark" ? "dark" : "light") : (ds as "light" | "dark");
  return buildTheme(scheme);
};
