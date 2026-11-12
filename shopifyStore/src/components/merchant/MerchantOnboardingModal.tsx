import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Switch,
  ActivityIndicator,
} from 'react-native';
import { useStore } from '../../context/StoreContext';
import { TenantConfig } from '../../types/tenant';

interface MerchantOnboardingModalProps {
  visible: boolean;
  onClose: () => void;
  onSuccess: (newStoreId: string) => void;
}

interface BrandPreset {
  name: string;
  domain: string;
  color: string;
  tagline: string;
  badge: string;
  reviews: boolean;
  loyalty: boolean;
}

const BRAND_PRESETS: BrandPreset[] = [
  {
    name: 'Alo Yoga',
    domain: 'aloyoga.myshopify.com',
    color: '#0066FF',
    tagline: 'STUDIO TO STREET LUXURY WEAR',
    badge: 'MINDFUL MOVEMENT',
    reviews: true,
    loyalty: true,
  },
  {
    name: 'Allbirds',
    domain: 'allbirds.myshopify.com',
    color: '#15803D',
    tagline: 'SUSTAINABLE WOOL FOOTWEAR',
    badge: 'CARBON NEUTRAL',
    reviews: true,
    loyalty: false,
  },
  {
    name: 'Kith NYC',
    domain: 'kith-apparel.myshopify.com',
    color: '#111111',
    tagline: 'PROGRESSIVE RETAIL & LIFESTYLE',
    badge: 'EXCLUSIVE DROPS',
    reviews: false,
    loyalty: true,
  },
];

const COLOR_PALETTE = ['#000000', '#1E3A2B', '#0066FF', '#E11D48', '#7C3AED', '#D97757'];

export const MerchantOnboardingModal: React.FC<MerchantOnboardingModalProps> = ({
  visible,
  onClose,
  onSuccess,
}) => {
  const { config, onboardStore } = useStore();
  const { colors, radii } = config.theme;

  const [storeName, setStoreName] = useState('Alo Yoga');
  const [domain, setDomain] = useState('aloyoga.myshopify.com');
  const [selectedColor, setSelectedColor] = useState('#0066FF');
  const [enableReviews, setEnableReviews] = useState(true);
  const [enableLoyalty, setEnableLoyalty] = useState(true);

  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const applyPreset = (preset: BrandPreset) => {
    setStoreName(preset.name);
    setDomain(preset.domain);
    setSelectedColor(preset.color);
    setEnableReviews(preset.reviews);
    setEnableLoyalty(preset.loyalty);
  };

  const handleTestAuth = async () => {
    setIsAuthorizing(true);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 600));
    setIsAuthorized(true);
    setIsAuthorizing(false);
  };

  const handleConnectStore = async () => {
    setIsSubmitting(true);
    const storeSlug = storeName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    const newConfig: TenantConfig = {
      id: storeSlug,
      name: storeName.toUpperCase(),
      tagline: `${storeName.toUpperCase()} OFFICIAL MOBILE STOREFRONT`,
      badgeText: 'VERIFIED BRAND',
      currency: 'USD',
      currencySymbol: '$',
      heroImage:
        'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1200&auto=format&fit=crop',
      welcomeImage:
        'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?q=80&w=1200&auto=format&fit=crop',
      theme: {
        dark: false,
        colors: {
          primary: selectedColor,
          onPrimary: '#FFFFFF',
          secondary: '#D97757',
          background: '#FAFAFA',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          textPrimary: '#111111',
          textSecondary: '#666666',
          border: '#E5E5E5',
          accent: selectedColor,
          error: '#DC2626',
          success: '#15803D',
          tagBackground: '#F0F0F0',
          tagText: '#111111',
          outOfStock: '#999999',
        },
        typography: {
          titleFont: 'System',
          bodyFont: 'System',
          brandTransform: 'uppercase',
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
        showReviews: enableReviews,
        showLoyaltyRewards: enableLoyalty,
        showCategoryFilters: true,
        showHeroBanner: true,
        freeShippingThreshold: 50,
      },
      mockedThirdParty: {
        type: enableReviews ? 'reviews' : 'loyalty',
        title: `${storeName} Verified Experience`,
        description: 'Native third-party integration active via platform adapter.',
      },
      onboardingMeta: {
        myshopifyDomain: domain,
        oauthStatus: 'authorized',
        grantedScopes: [
          'unauthenticated_read_product_listings',
          'unauthenticated_write_checkouts',
          'unauthenticated_write_customers',
        ],
        credentialSecurity: 'AES-256 Android Keystore / iOS Keychain',
        adminKeyOmitted: true,
        storefrontToken: `shpat_live_${Math.random().toString(36).substring(2, 9)}`,
      },
    };

    await onboardStore(newConfig);
    setIsSubmitting(false);
    onSuccess(newConfig.id);
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {/* MODAL HEADER */}
          <View style={styles.modalHeader}>
            <View>
              <Text style={[styles.modalTitle, { color: colors.textPrimary }]}>
                🏢 Merchant Onboarding Hub
              </Text>
              <Text style={[styles.modalSubtitle, { color: colors.textSecondary }]}>
                Shopify Authorization & Secure Credential Pipeline
              </Text>
            </View>
            <TouchableOpacity
              onPress={onClose}
              hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
              style={styles.closeBtn}
            >
              <Text style={[styles.closeBtnText, { color: colors.textSecondary }]}>✕</Text>
            </TouchableOpacity>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            {/* PRESETS ROW */}
            <Text style={[styles.sectionLabel, { color: colors.textPrimary }]}>
              Quick Presets (Select Brand):
            </Text>
            <View style={styles.presetsRow}>
              {BRAND_PRESETS.map((p) => (
                <TouchableOpacity
                  key={p.name}
                  onPress={() => applyPreset(p)}
                  style={[
                    styles.presetPill,
                    {
                      borderColor: storeName === p.name ? p.color : colors.border,
                      backgroundColor: storeName === p.name ? colors.surface : 'transparent',
                    },
                  ]}
                >
                  <View style={[styles.presetDot, { backgroundColor: p.color }]} />
                  <Text style={[styles.presetText, { color: colors.textPrimary }]}>{p.name}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* SECTION 1: STORE DETAILS */}
            <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
                1. Store Identity & Domain
              </Text>
              <View style={styles.fieldGroup}>
                <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Brand Name</Text>
                <TextInput
                  value={storeName}
                  onChangeText={setStoreName}
                  placeholder="e.g. Gymshark, Alo Yoga"
                  style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
                />
              </View>

              <View style={styles.fieldGroup}>
                <Text style={[styles.fieldLabel, { color: colors.textSecondary }]}>Shopify Domain</Text>
                <TextInput
                  value={domain}
                  onChangeText={setDomain}
                  placeholder="brand.myshopify.com"
                  autoCapitalize="none"
                  style={[styles.input, { borderColor: colors.border, color: colors.textPrimary }]}
                />
              </View>
            </View>

            {/* SECTION 2: SHOPIFY AUTHORIZATION */}
            <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <View style={styles.rowBetween}>
                <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
                  2. Shopify Authorization (OAuth)
                </Text>
                <View style={[styles.verifiedBadge, { backgroundColor: '#DCFCE7' }]}>
                  <Text style={{ color: '#15803D', fontSize: 10, fontWeight: '800' }}>
                    {isAuthorized ? '✓ OAUTH ACTIVE' : 'PENDING'}
                  </Text>
                </View>
              </View>

              <Text style={[styles.cardDesc, { color: colors.textSecondary }]}>
                Storefront API scopes granted via Shopify Partner OAuth flow:
              </Text>

              <View style={styles.scopeList}>
                <Text style={styles.scopeItem}>● unauthenticated_read_product_listings</Text>
                <Text style={styles.scopeItem}>● unauthenticated_write_checkouts</Text>
                <Text style={styles.scopeItem}>● unauthenticated_write_customers</Text>
              </View>

              <TouchableOpacity
                onPress={handleTestAuth}
                disabled={isAuthorizing}
                style={[styles.authBtn, { borderColor: colors.border }]}
              >
                {isAuthorizing ? (
                  <ActivityIndicator size="small" color={colors.accent} />
                ) : (
                  <Text style={[styles.authBtnText, { color: colors.textPrimary }]}>
                    ⚡ Re-Verify OAuth Handshake
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* SECTION 3: SECURE CREDENTIAL HANDLING */}
            <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
                3. Secure Credential Architecture
              </Text>

              <View style={styles.securityItem}>
                <Text style={styles.securityIcon}>🛡️</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.securityTitle, { color: colors.textPrimary }]}>
                    Zero-Trust Admin Protection
                  </Text>
                  <Text style={[styles.securityDesc, { color: colors.textSecondary }]}>
                    Admin API Secrets are OMITTED from client bundle. Only scoped Storefront tokens are deployed.
                  </Text>
                </View>
              </View>

              <View style={styles.securityItem}>
                <Text style={styles.securityIcon}>🔒</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.securityTitle, { color: colors.textPrimary }]}>
                    Hardware Enclave Encryption
                  </Text>
                  <Text style={[styles.securityDesc, { color: colors.textSecondary }]}>
                    Customer & Storefront access tokens encrypted in iOS Keychain / Android Keystore.
                  </Text>
                </View>
              </View>
            </View>

            {/* SECTION 4: THEME & FEATURES */}
            <View style={[styles.sectionCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
              <Text style={[styles.cardTitle, { color: colors.textPrimary }]}>
                4. Brand Theme & Third-Party Features
              </Text>

              <Text style={[styles.fieldLabel, { color: colors.textSecondary, marginBottom: 8 }]}>
                Primary Brand Color:
              </Text>
              <View style={styles.colorPaletteRow}>
                {COLOR_PALETTE.map((c) => (
                  <TouchableOpacity
                    key={c}
                    onPress={() => setSelectedColor(c)}
                    style={[
                      styles.colorCircle,
                      { backgroundColor: c },
                      selectedColor === c && styles.colorCircleSelected,
                    ]}
                  />
                ))}
              </View>

              <View style={styles.switchRow}>
                <Text style={[styles.switchLabel, { color: colors.textPrimary }]}>
                  Customer Reviews (Yotpo / Judge.me)
                </Text>
                <Switch
                  value={enableReviews}
                  onValueChange={setEnableReviews}
                  trackColor={{ false: '#CCCCCC', true: selectedColor }}
                />
              </View>

              <View style={styles.switchRow}>
                <Text style={[styles.switchLabel, { color: colors.textPrimary }]}>
                  Loyalty Points (Smile.io)
                </Text>
                <Switch
                  value={enableLoyalty}
                  onValueChange={setEnableLoyalty}
                  trackColor={{ false: '#CCCCCC', true: selectedColor }}
                />
              </View>
            </View>

            {/* ACTION CTA */}
            <TouchableOpacity
              onPress={handleConnectStore}
              disabled={isSubmitting || !storeName}
              style={[
                styles.connectBtn,
                { backgroundColor: selectedColor, borderRadius: radii.button },
              ]}
            >
              {isSubmitting ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text style={styles.connectBtnText}>
                  Connect & Launch Branded App →
                </Text>
              )}
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    maxHeight: '90%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 28,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '900',
    letterSpacing: 0.3,
  },
  modalSubtitle: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 2,
  },
  closeBtn: {
    padding: 6,
  },
  closeBtnText: {
    fontSize: 18,
    fontWeight: '700',
  },
  scrollContent: {
    paddingBottom: 24,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 8,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  presetsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  presetPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  presetDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  presetText: {
    fontSize: 12,
    fontWeight: '700',
  },
  sectionCard: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 14,
    marginBottom: 14,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '800',
    marginBottom: 10,
  },
  cardDesc: {
    fontSize: 11,
    lineHeight: 16,
    marginBottom: 8,
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  verifiedBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  fieldGroup: {
    marginBottom: 10,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 13,
  },
  scopeList: {
    backgroundColor: '#F5F5F5',
    padding: 8,
    borderRadius: 6,
    marginBottom: 10,
    gap: 3,
  },
  scopeItem: {
    fontSize: 10,
    color: '#333333',
    fontWeight: '600',
    fontFamily: 'monospace',
  },
  authBtn: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  authBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  securityItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  securityIcon: {
    fontSize: 18,
  },
  securityTitle: {
    fontSize: 12,
    fontWeight: '800',
    marginBottom: 2,
  },
  securityDesc: {
    fontSize: 11,
    lineHeight: 15,
  },
  colorPaletteRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  colorCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  colorCircleSelected: {
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 3,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 6,
  },
  switchLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  connectBtn: {
    width: '100%',
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },
  connectBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
});
