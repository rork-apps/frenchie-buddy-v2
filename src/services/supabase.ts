import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { APP_SCHEMA, SUPABASE_ANON_KEY, SUPABASE_URL } from "../config";
import {
  AccountPull,
  HealthEntry,
  HeatReading,
  Medication,
  MemoryEntry,
  MoodScan,
  PupProfile,
} from "../types";

// Single shared Supabase client. Real Supabase Auth + per-user RLS; the app
// addresses ONLY its own schema. The anon key is public; RLS does the gating.
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
  db: { schema: APP_SCHEMA },
});

const friendlyAuthError = (message: string): Error => {
  const m = message.toLowerCase();
  if (m.includes("already registered") || m.includes("already been registered"))
    return new Error("That email already has an account. Try signing in.");
  if (m.includes("invalid login")) return new Error("That email and password don't match.");
  if (m.includes("password")) return new Error("Password must be at least 6 characters.");
  if (m.includes("email")) return new Error("Please enter a valid email address.");
  if (m.includes("network") || m.includes("fetch")) return new Error("You're offline. Check your connection and try again.");
  return new Error(message || "Authentication failed. Please try again.");
};

export type Session = { userId: string; email: string };

export const getSession = async (): Promise<Session | null> => {
  const { data } = await supabase.auth.getSession();
  const u = data.session?.user;
  return u ? { userId: u.id, email: u.email ?? "" } : null;
};

export const signUpEmail = async (email: string, password: string): Promise<Session> => {
  const { data, error } = await supabase.auth.signUp({ email: email.trim(), password });
  if (error) throw friendlyAuthError(error.message);
  const u = data.session?.user ?? data.user;
  if (!u) throw new Error("Could not create the account. Please try again.");
  return { userId: u.id, email: u.email ?? email.trim() };
};

export const signInEmail = async (email: string, password: string): Promise<Session> => {
  const { data, error } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
  if (error) throw friendlyAuthError(error.message);
  const u = data.session?.user;
  if (!u) throw new Error("Sign in failed. Please try again.");
  return { userId: u.id, email: u.email ?? email.trim() };
};

export const signOut = async (): Promise<void> => {
  await supabase.auth.signOut();
};

// ── Snapshot I/O (the single read/write surface; per-user via auth.uid() + RLS) ──
export type Snapshot = {
  profile: ReturnType<typeof toProfilePayload> | null;
  health: ReturnType<typeof toHealthDTO>[];
  memories: ReturnType<typeof toMemoryDTO>[];
  medications: ReturnType<typeof toMedicationDTO>[];
  moods: ReturnType<typeof toMoodDTO>[];
  heat_readings: ReturnType<typeof toHeatDTO>[];
};

export const pullSnapshot = async (): Promise<AccountPull> => {
  const { data, error } = await supabase.rpc("get_app_snapshot");
  if (error) throw new Error(error.message);
  const s = (data ?? {}) as any;
  const session = await getSession();
  return {
    account_id: session?.userId ?? "",
    owner_name: s.profile?.owner_name ?? "",
    profile: s.profile ? { ...s.profile, id: s.profile.user_id } : null,
    health: s.health ?? [],
    memories: s.memories ?? [],
    medications: s.medications ?? [],
    moods: s.moods ?? [],
    heat_readings: s.heat_readings ?? [],
  };
};

export const pushSnapshot = async (
  profile: PupProfile,
  health: HealthEntry[],
  memories: MemoryEntry[],
  medications: Medication[],
  moods: MoodScan[],
  heatReadings: HeatReading[],
): Promise<AccountPull> => {
  const p_snapshot = {
    profile: toProfilePayload(profile),
    health: health.map(toHealthDTO),
    memories: memories.map(toMemoryDTO),
    medications: medications.map(toMedicationDTO),
    moods: moods.map(toMoodDTO),
    heat_readings: heatReadings.map(toHeatDTO),
  };
  const { error } = await supabase.rpc("sync_app_snapshot", { p_snapshot });
  if (error) throw new Error(error.message);
  return pullSnapshot();
};

export const deleteAccount = async (): Promise<void> => {
  const { error } = await supabase.rpc("frenchie_buddy_delete_account");
  if (error) throw new Error(error.message);
  await signOut();
};

// ── camelCase → snake_case payload mappers ──
export const toProfilePayload = (p: PupProfile) => ({
  name: p.name,
  owner_name: p.ownerName,
  weight_lbs: p.weightLbs,
  birth_date: p.birthDate,
  has_breathing_notes: p.hasBreathingNotes,
  breathing_notes: p.breathingNotes,
  avatar_symbol: p.avatarSymbol,
  is_premium: p.isPremium,
});
export const toHealthDTO = (e: HealthEntry) => ({
  id: e.id, date: e.date, breathing_effort: e.breathingEffort, snoring_level: e.snoringLevel,
  sleep_hours: e.sleepHours, weight_lbs: e.weightLbs, activity: e.activity, note: e.note,
});
export const toMemoryDTO = (e: MemoryEntry) => ({
  id: e.id, date: e.date, caption: e.caption, stage: e.stage, milestone: e.milestone ?? null,
  symbol: e.symbol, color_hex: e.colorHex,
});
export const toMedicationDTO = (e: Medication) => ({
  id: e.id, name: e.name, dosage: e.dosage, schedule: e.schedule, given_today: e.givenToday, due_time: e.dueTime,
});
export const toMoodDTO = (e: MoodScan) => ({
  id: e.id, date: e.date, mood_title: e.moodTitle, mood_emoji: e.moodEmoji, confidence: e.confidence,
  summary: e.summary, energy_tag: e.energyTag, note: e.note,
});
export const toHeatDTO = (e: HeatReading) => ({
  id: e.id, date: e.date, temperature_f: e.temperatureF, humidity: e.humidity, level: e.level, condition_label: e.conditionLabel,
});
