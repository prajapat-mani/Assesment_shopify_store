import { TenantConfig } from '../types/tenant';

export const auraWellnessConfig: TenantConfig = {
  id: 'aura_wellness',
  name: 'AURA WELLNESS',
  tagline: 'MINDFUL LIVING & ORGANIC WELLNESS',
  badgeText: 'ORGANIC & SUSTAINABLE',
  currency: 'USD',
  currencySymbol: '$',
  heroImage: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop',
  welcomeImage: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1200&auto=format&fit=crop',
  theme: {
    dark: false,
    colors: {
      primary: '#1E3A2B',
      onPrimary: '#FAF8F5',
      secondary: '#D97757',
      background: '#FAF8F5',
      surface: '#FFFFFF',
      card: '#FFFFFF',
      textPrimary: '#1E2D24',
      textSecondary: '#6B7A6F',
      border: '#E3DFD5',
      accent: '#2D5A43',
      error: '#DC2626',
      success: '#15803D',
      tagBackground: '#EAE6DC',
      tagText: '#1E3A2B',
      outOfStock: '#9CA3AF',
    },
    typography: {
      titleFont: 'System',
      bodyFont: 'System',
      brandTransform: 'capitalize',
      letterSpacing: 0.5,
    },
    radii: {
      sm: 8,
      md: 14,
      lg: 20,
      button: 28,
      pill: 999,
    },
  },
  features: {
    showReviews: false,
    showLoyaltyRewards: true,
    showCategoryFilters: true,
    showHeroBanner: true,
    freeShippingThreshold: 50,
  },
  mockedThirdParty: {
    type: 'loyalty',
    title: 'Smile.io Rewards Engine',
    description: 'Aura VIP Points & Perks Integration',
  },
};

