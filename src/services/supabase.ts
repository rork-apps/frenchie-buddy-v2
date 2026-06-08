import {
  AccountPull,
  HealthEntry,
  HealthEntryDTO,
  HeatReading,
  HeatReadingDTO,
  Medication,
  MedicationDTO,
  MemoryDTO,
  MemoryEntry,
  MoodScan,
  MoodScanDTO,
  ProfileDTO,
  PupProfile,
} from "../types";

const SUPABASE_URL = "https://supabase.apppublishing.ai";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlLXNlbGYtaG9zdGVkIiwiaWF0IjoxNzgwNjAyMjI2LCJleHAiOjQxMDI0NDQ4MDB9.AmDH0NbkuDHPi61_1udNgCtpbURbtqw2yNK5UIK-sws";
const SCHEMA = "frenchie_buddy";

const headers = {
  apikey: SUPABASE_ANON_KEY,
  Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json",
  Accept: "application/json",
  "Accept-Profile": SCHEMA,
  "Content-Profile": SCHEMA,
};

const rpc = async <T>(fn: string, body: Record<string, unknown>): Promise<T> => {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });

  const text = await response.text();
  if (!response.ok) {
    throw mapSupabaseError(text, response.status);
  }
  if (!text) return undefined as T;
  return JSON.parse(text) as T;
};

const mapSupabaseError = (body: string, status: number) => {
  if (body.includes("NAME_TAKEN")) return new Error("That Frenchie name is already taken.");
  if (body.includes("WEAK_PASSCODE")) return new Error("Please choose a passcode of at least 4 characters.");
  if (body.includes("EMPTY_NAME")) return new Error("Please enter your Frenchie's name.");
  if (body.includes("BAD_CREDENTIALS")) return new Error("That name and passcode do not match an account.");
  return new Error(`Supabase request failed (${status}). Check your connection and try again.`);
};

export const isNameTaken = async (name: string): Promise<boolean> =>
  rpc<boolean>("pup_name_taken", { p_name: name.trim() });

export const registerPup = async (name: string, passcode: string, ownerName: string): Promise<string> =>
  rpc<string>("pup_register", { p_name: name.trim(), p_passcode: passcode, p_owner: ownerName.trim() });

export const pullPup = async (name: string, passcode: string): Promise<AccountPull> =>
  rpc<AccountPull>("pup_pull", { p_name: name.trim(), p_passcode: passcode });

export const pushPup = async (
  name: string,
  passcode: string,
  accountId: string,
  profile: PupProfile,
  health: HealthEntry[],
  memories: MemoryEntry[],
  medications: Medication[],
  moods: MoodScan[],
  heatReadings: HeatReading[]
) =>
  rpc<void>("pup_push", {
    p_name: name.trim(),
    p_passcode: passcode,
    p_profile: toProfileDTO(profile, accountId),
    p_health: health.map((entry) => toHealthDTO(entry, accountId)),
    p_memories: memories.map((entry) => toMemoryDTO(entry, accountId)),
    p_medications: medications.map((entry) => toMedicationDTO(entry, accountId)),
    p_moods: moods.map((entry) => toMoodDTO(entry, accountId)),
    p_heat_readings: heatReadings.map((entry) => toHeatDTO(entry, accountId)),
  });

export const deletePup = async (name: string, passcode: string): Promise<void> =>
  rpc<void>("pup_delete", { p_name: name.trim(), p_passcode: passcode });

export const toProfileDTO = (profile: PupProfile, accountId: string): ProfileDTO => ({
  id: profile.id,
  user_id: accountId,
  name: profile.name,
  owner_name: profile.ownerName,
  weight_lbs: profile.weightLbs,
  birth_date: profile.birthDate,
  has_breathing_notes: profile.hasBreathingNotes,
  breathing_notes: profile.breathingNotes,
  avatar_symbol: profile.avatarSymbol,
  is_premium: profile.isPremium,
  created_at: profile.createdAt,
  updated_at: profile.updatedAt,
});

export const toHealthDTO = (entry: HealthEntry, accountId: string): HealthEntryDTO => ({
  id: entry.id,
  user_id: accountId,
  date: entry.date,
  breathing_effort: entry.breathingEffort,
  snoring_level: entry.snoringLevel,
  sleep_hours: entry.sleepHours,
  weight_lbs: entry.weightLbs,
  activity: entry.activity,
  note: entry.note,
});

export const toMemoryDTO = (entry: MemoryEntry, accountId: string): MemoryDTO => ({
  id: entry.id,
  user_id: accountId,
  date: entry.date,
  caption: entry.caption,
  stage: entry.stage,
  milestone: entry.milestone ?? null,
  symbol: entry.symbol,
  color_hex: entry.colorHex,
});

export const toMedicationDTO = (entry: Medication, accountId: string): MedicationDTO => ({
  id: entry.id,
  user_id: accountId,
  name: entry.name,
  dosage: entry.dosage,
  schedule: entry.schedule,
  given_today: entry.givenToday,
  due_time: entry.dueTime,
});

export const toMoodDTO = (entry: MoodScan, accountId: string): MoodScanDTO => ({
  id: entry.id,
  user_id: accountId,
  date: entry.date,
  mood_title: entry.moodTitle,
  mood_emoji: entry.moodEmoji,
  confidence: entry.confidence,
  summary: entry.summary,
  energy_tag: entry.energyTag,
  note: entry.note,
});

export const toHeatDTO = (entry: HeatReading, accountId: string): HeatReadingDTO => ({
  id: entry.id,
  user_id: accountId,
  date: entry.date,
  temperature_f: entry.temperatureF,
  humidity: entry.humidity,
  level: entry.level,
  condition_label: entry.conditionLabel,
});
