export type StoreId = string;

export interface ThemeColors {
  primary: string;
  onPrimary: string;
  secondary: string;
  background: string;
  surface: string;
  card: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
  accent: string;
  error: string;
  success: string;
  tagBackground: string;
  tagText: string;
  outOfStock: string;
}

export interface ThemeTypography {
  titleFont: string;
  bodyFont: string;
  brandTransform: 'uppercase' | 'none' | 'capitalize';
  letterSpacing: number;
}

export interface ThemeRadii {
  sm: number;
  md: number;
  lg: number;
  button: number;
  pill: number;
}

export interface TenantTheme {
  colors: ThemeColors;
  typography: ThemeTypography;
  radii: ThemeRadii;
  dark: boolean;
}

export interface TenantFeatureFlags {
  showReviews: boolean;
  showLoyaltyRewards: boolean;
  showCategoryFilters: boolean;
  showHeroBanner: boolean;
  freeShippingThreshold: number; // e.g. 75 for $75
}

export interface TenantConfig {
  id: StoreId;
  name: string;
  tagline: string;
  badgeText: string;
  currency: string;
  currencySymbol: string;
  heroImage: string;
  welcomeImage: string;
  theme: TenantTheme;
  features: TenantFeatureFlags;
  mockedThirdParty: {
    type: 'reviews' | 'loyalty';
    title: string;
    description: string;
  };
  onboardingMeta?: {
    myshopifyDomain: string;
    oauthStatus: 'authorized' | 'pending';
    grantedScopes: string[];
    credentialSecurity: string;
    adminKeyOmitted: boolean;
    storefrontToken: string;
  };
}

