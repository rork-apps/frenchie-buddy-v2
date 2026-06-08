export type SubscriptionStatus = "free" | "trial" | "premium";
export type LifeStage = "Puppyhood" | "Adult" | "Senior";
export type SafetyLevel = "Safe" | "Caution" | "Danger";
export type SyncStatus = "local" | "syncing" | "synced" | "failed";

export type PupProfile = {
  id: string;
  userId?: string;
  name: string;
  ownerName: string;
  weightLbs: number;
  birthDate: string;
  hasBreathingNotes: boolean;
  breathingNotes: string;
  avatarSymbol: string;
  isPremium: boolean;
  subscriptionStatus: SubscriptionStatus;
  onboardingCompleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type HealthEntry = {
  id: string;
  userId?: string;
  date: string;
  breathingEffort: number;
  snoringLevel: number;
  sleepHours: number;
  weightLbs: number;
  activity: "Low" | "Moderate" | "High";
  note: string;
};

export type MemoryEntry = {
  id: string;
  userId?: string;
  date: string;
  caption: string;
  stage: LifeStage;
  milestone?: string | null;
  symbol: string;
  colorHex: number;
};

export type Medication = {
  id: string;
  userId?: string;
  name: string;
  dosage: string;
  schedule: string;
  givenToday: boolean;
  dueTime: string;
};

export type MoodScan = {
  id: string;
  userId?: string;
  date: string;
  moodTitle: string;
  moodEmoji: string;
  confidence: number;
  summary: string;
  energyTag: string;
  note: string;
};

export type HeatReading = {
  id: string;
  userId?: string;
  date: string;
  temperatureF: number;
  humidity: number;
  level: SafetyLevel;
  conditionLabel: string;
};

export type Horoscope = {
  id: string;
  date: string;
  starSign: string;
  title: string;
  body: string;
  tip: string;
  saved: boolean;
};

export type WalkTimer = {
  active: boolean;
  startedAt?: string;
  seconds: number;
};

export type PupAccount = {
  accountId: string;
  name: string;
  passcode: string;
  ownerName: string;
};

export type FrenchieState = {
  profile: PupProfile;
  healthEntries: HealthEntry[];
  memories: MemoryEntry[];
  medications: Medication[];
  moodScans: MoodScan[];
  heatReadings: HeatReading[];
  horoscope: Horoscope;
  walkTimer: WalkTimer;
  account: PupAccount | null;
  syncStatus: SyncStatus;
  syncMessage: string;
  paywallSeen: boolean;
};

export type AccountPull = {
  account_id: string;
  owner_name?: string | null;
  profile?: ProfileDTO | null;
  health?: HealthEntryDTO[];
  memories?: MemoryDTO[];
  medications?: MedicationDTO[];
  moods?: MoodScanDTO[];
  heat_readings?: HeatReadingDTO[];
};

export type ProfileDTO = {
  id: string;
  user_id: string;
  name: string;
  owner_name: string;
  weight_lbs: number;
  birth_date: string;
  has_breathing_notes?: boolean | null;
  breathing_notes?: string | null;
  avatar_symbol?: string | null;
  is_premium: boolean;
  created_at?: string | null;
  updated_at: string;
};

export type HealthEntryDTO = {
  id: string;
  user_id: string;
  date: string;
  breathing_effort: number;
  snoring_level: number;
  sleep_hours: number;
  weight_lbs: number;
  activity: string;
  note: string;
};

export type MemoryDTO = {
  id: string;
  user_id: string;
  date: string;
  caption: string;
  stage: string;
  milestone: string | null;
  symbol: string;
  color_hex: number;
};

export type MedicationDTO = {
  id: string;
  user_id: string;
  name: string;
  dosage: string;
  schedule: string;
  given_today: boolean;
  due_time: string;
};

export type MoodScanDTO = {
  id: string;
  user_id: string;
  date: string;
  mood_title: string;
  mood_emoji: string;
  confidence: number;
  summary: string;
  energy_tag: string;
  note: string;
};

export type HeatReadingDTO = {
  id: string;
  user_id: string;
  date: string;
  temperature_f: number;
  humidity: number;
  level: string;
  condition_label: string;
};
