import Purchases, {
  type CustomerInfo,
  type PurchasesPackage,
  LOG_LEVEL,
} from "react-native-purchases";
import { Platform } from "react-native";

// ── Configuration ──────────────────────────────────────────────
// Replace these with real keys from RevenueCat dashboard before release.
const REVENUECAT_IOS_KEY = "<<REVENUECAT_IOS_API_KEY>>";
const REVENUECAT_ANDROID_KEY = "<<REVENUECAT_ANDROID_API_KEY>>";

const ENTITLEMENT_ID = "premium";

// ── State ──────────────────────────────────────────────────────
let configured = false;

// ── Helpers ────────────────────────────────────────────────────

function apiKeyConfigured(): boolean {
  const key =
    Platform.OS === "ios" ? REVENUECAT_IOS_KEY : REVENUECAT_ANDROID_KEY;
  return !key.startsWith("<<");
}

export async function configureRevenueCat(appUserId?: string): Promise<void> {
  if (configured) return;
  if (!apiKeyConfigured()) {
    console.warn(
      "[RevenueCat] API key not configured — running in stub mode.",
    );
    return;
  }

  const key =
    Platform.OS === "ios" ? REVENUECAT_IOS_KEY : REVENUECAT_ANDROID_KEY;

  Purchases.setLogLevel(LOG_LEVEL.DEBUG);
  Purchases.configure({ apiKey: key, appUserID: appUserId ?? null });
  configured = true;
}

export async function identifyUser(appUserId: string): Promise<void> {
  if (!apiKeyConfigured()) return;
  if (!configured) await configureRevenueCat(appUserId);
  else await Purchases.logIn(appUserId);
}

export async function logOutRevenueCat(): Promise<void> {
  if (!configured) return;
  const info = await Purchases.getCustomerInfo();
  if (!info.originalAppUserId.startsWith("$RCAnonymousID:")) {
    await Purchases.logOut();
  }
}

// ── Entitlement check ──────────────────────────────────────────

export async function checkPremium(): Promise<boolean> {
  if (!configured) return false;
  const info: CustomerInfo = await Purchases.getCustomerInfo();
  return typeof info.entitlements.active[ENTITLEMENT_ID] !== "undefined";
}

// ── Offerings / packages ───────────────────────────────────────

export type OfferingPackages = {
  monthly: PurchasesPackage | null;
  annual: PurchasesPackage | null;
};

export async function getPackages(): Promise<OfferingPackages> {
  if (!configured) return { monthly: null, annual: null };
  const offerings = await Purchases.getOfferings();
  const current = offerings.current;
  return {
    monthly: current?.monthly ?? null,
    annual: current?.annual ?? null,
  };
}

// ── Purchase ───────────────────────────────────────────────────

export async function purchasePackage(
  pkg: PurchasesPackage,
): Promise<boolean> {
  const { customerInfo } = await Purchases.purchasePackage(pkg);
  return typeof customerInfo.entitlements.active[ENTITLEMENT_ID] !== "undefined";
}

// ── Restore ────────────────────────────────────────────────────

export async function restorePurchases(): Promise<boolean> {
  if (!configured) return false;
  const info: CustomerInfo = await Purchases.restorePurchases();
  return typeof info.entitlements.active[ENTITLEMENT_ID] !== "undefined";
}
