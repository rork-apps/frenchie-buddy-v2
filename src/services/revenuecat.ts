import { Platform } from "react-native";
import type { CustomerInfo, PurchasesPackage } from "react-native-purchases";

// ── Configuration ──────────────────────────────────────────────
// Replace these with real keys from RevenueCat dashboard before release.
const REVENUECAT_IOS_KEY = "<<REVENUECAT_IOS_API_KEY>>";
const REVENUECAT_ANDROID_KEY = "<<REVENUECAT_ANDROID_API_KEY>>";

const ENTITLEMENT_ID = "premium";

// ── State ──────────────────────────────────────────────────────
let configured = false;
// `react-native-purchases` is a NATIVE module — not present in Expo Go. We load
// it lazily so the app runs in Expo Go / before keys are set (paywall stub mode).
let Purchases: typeof import("react-native-purchases").default | null = null;

function apiKeyConfigured(): boolean {
  const key = Platform.OS === "ios" ? REVENUECAT_IOS_KEY : REVENUECAT_ANDROID_KEY;
  return !key.startsWith("<<");
}

function loadPurchases(): typeof import("react-native-purchases").default | null {
  if (Purchases) return Purchases;
  try {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    Purchases = require("react-native-purchases").default;
    return Purchases;
  } catch {
    console.warn("[RevenueCat] native module unavailable (Expo Go?) — stub mode.");
    return null;
  }
}

export async function configureRevenueCat(appUserId?: string): Promise<void> {
  if (configured) return;
  if (!apiKeyConfigured()) return;
  const P = loadPurchases();
  if (!P) return;
  const key = Platform.OS === "ios" ? REVENUECAT_IOS_KEY : REVENUECAT_ANDROID_KEY;
  try {
    const { LOG_LEVEL } = require("react-native-purchases");
    P.setLogLevel(LOG_LEVEL.DEBUG);
    P.configure({ apiKey: key, appUserID: appUserId ?? null });
    configured = true;
  } catch {
    console.warn("[RevenueCat] configure failed — stub mode.");
  }
}

export async function identifyUser(appUserId: string): Promise<void> {
  if (!apiKeyConfigured()) return;
  if (!configured) await configureRevenueCat(appUserId);
  else if (Purchases) await Purchases.logIn(appUserId);
}

export async function logOutRevenueCat(): Promise<void> {
  if (!configured || !Purchases) return;
  const info = await Purchases.getCustomerInfo();
  if (!info.originalAppUserId.startsWith("$RCAnonymousID:")) {
    await Purchases.logOut();
  }
}

// ── Entitlement check ──────────────────────────────────────────
export async function checkPremium(): Promise<boolean> {
  if (!configured || !Purchases) return false;
  const info: CustomerInfo = await Purchases.getCustomerInfo();
  return typeof info.entitlements.active[ENTITLEMENT_ID] !== "undefined";
}

// ── Offerings / packages ───────────────────────────────────────
export type OfferingPackages = {
  monthly: PurchasesPackage | null;
  annual: PurchasesPackage | null;
};

export async function getPackages(): Promise<OfferingPackages> {
  if (!configured || !Purchases) return { monthly: null, annual: null };
  const offerings = await Purchases.getOfferings();
  const current = offerings.current;
  return { monthly: current?.monthly ?? null, annual: current?.annual ?? null };
}

// ── Purchase ───────────────────────────────────────────────────
export async function purchasePackage(pkg: PurchasesPackage): Promise<boolean> {
  if (!Purchases) throw new Error("In-app purchases aren't available in this build.");
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  return typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== "undefined";
}

// ── Restore ────────────────────────────────────────────────────
export async function restorePurchases(): Promise<boolean> {
  if (!configured || !Purchases) return false;
  const info: CustomerInfo = await Purchases.restorePurchases();
  return typeof info.entitlements.active[ENTITLEMENT_ID] !== "undefined";
}
