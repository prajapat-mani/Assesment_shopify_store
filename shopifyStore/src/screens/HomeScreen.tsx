import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  RefreshControl,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../context/StoreContext';
import { Product } from '../types/shopify';
import { StoreId } from '../types/tenant';
import { shopifyService } from '../services/shopify/shopifyService';
import { Header } from '../components/common/Header';
import { ProductCard } from '../components/product/ProductCard';
import { LoadingState } from '../components/common/LoadingState';
import { ErrorRetryView } from '../components/common/ErrorRetryView';
import { LoyaltyBanner } from '../components/loyalty/LoyaltyBanner';
import { StoreSwitcherModal } from '../components/common/StoreSwitcherModal';
import { ChevronLeftIcon, ChevronRightIcon } from '../components/common/Icons';

interface HomeScreenProps {
  onSelectProduct: (product: Product) => void;
  onOpenCart: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onSelectProduct, onOpenCart }) => {
  const { storeId, config } = useStore();
  const { colors, radii, typography } = config.theme;
  const insets = useSafeAreaInsets();

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [switcherVisible, setSwitcherVisible] = useState<boolean>(false);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const isGymshark = storeId === 'gymshark';

  const fetchCatalog = useCallback(async (targetStoreId?: StoreId) => {
    const idToFetch = targetStoreId || storeId;
    setIsLoading(true);
    setErrorMessage(null);
    setSelectedCategory('All');
    try {
      const items = await shopifyService.fetchProducts(idToFetch);
      setProducts(items);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to fetch catalog from Storefront API.');
    } finally {
      setIsLoading(false);
    }
  }, [storeId]);

  useEffect(() => {
    fetchCatalog(storeId);
  }, [storeId]);

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchCatalog(storeId);
    setIsRefreshing(false);
  };

  const categories = ['All', ...Array.from(new Set(products.map((p) => p.productType)))];

  const filteredProducts =
    selectedCategory === 'All'
      ? products
      : products.filter((p) => p.productType === selectedCategory);

  return (
    <View style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Header
        onOpenStoreSwitcher={() => setSwitcherVisible(true)}
        onOpenCart={onOpenCart}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: Math.max(insets.bottom, 16) + 40 },
        ]}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            tintColor={colors.accent}
          />
        }
      >
        {/* HERO BANNER MATCHING GYMSHARK ROW.GYMSHARK.COM */}
        {config.features.showHeroBanner && (
          <ImageBackground
            source={{ uri: config.heroImage }}
            style={[styles.heroBanner, { borderRadius: radii.sm }]}
            imageStyle={{ borderRadius: radii.sm }}
          >
            <View style={[styles.heroScrim, { borderRadius: radii.sm }]}>
              <Text style={styles.heroHeadline}>
                {isGymshark ? 'SOFTSENSE™' : config.name}
              </Text>
              <Text style={styles.heroDescription}>
                {isGymshark
                  ? 'Our new premium, super soft fabric that responds to your movement in the moment.'
                  : config.tagline}
              </Text>

              {isGymshark ? (
                <View style={styles.heroButtonsRow}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setSelectedCategory('Leggings')}
                    style={[styles.heroBtnPrimary, { borderRadius: radii.button }]}
                  >
                    <Text style={styles.heroBtnPrimaryText}>Shop the collection</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setSelectedCategory('All')}
                    style={[styles.heroBtnOutline, { borderRadius: radii.button }]}
                  >
                    <Text style={styles.heroBtnOutlineText}>Shop pilates</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <View style={styles.heroButtonsRow}>
                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setSelectedCategory('Skincare')}
                    style={[styles.heroBtnPrimary, { borderRadius: radii.button, backgroundColor: colors.primary }]}
                  >
                    <Text style={[styles.heroBtnPrimaryText, { color: colors.onPrimary }]}>Shop Collection</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    activeOpacity={0.85}
                    onPress={() => setSelectedCategory('All')}
                    style={[styles.heroBtnOutline, { borderRadius: radii.button, borderColor: '#FFFFFF' }]}
                  >
                    <Text style={[styles.heroBtnOutlineText, { color: '#FFFFFF' }]}>Explore All</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </ImageBackground>
        )}

        {/* LOYALTY BANNER (Aura Wellness feature) */}
        <LoyaltyBanner />

        {/* ERROR / RETRY STATE */}
        {errorMessage ? (
          <ErrorRetryView
            title="Connection Issue"
            message={errorMessage}
            onRetry={fetchCatalog}
          />
        ) : isLoading ? (
          <LoadingState message="Fetching live Shopify Storefront catalog..." />
        ) : (
          <>
            {/* CATEGORY FILTER CHIPS */}
            {config.features.showCategoryFilters && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.categoriesScroll}
              >
                {categories.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  return (
                    <TouchableOpacity
                      key={cat}
                      onPress={() => setSelectedCategory(cat)}
                      style={[
                        styles.categoryChip,
                        {
                          backgroundColor: isSelected ? colors.primary : colors.surface,
                          borderColor: isSelected ? colors.primary : colors.border,
                          borderRadius: radii.pill,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.categoryChipText,
                          {
                            color: isSelected ? colors.onPrimary : colors.textPrimary,
                            fontWeight: isSelected ? '700' : '500',
                          },
                        ]}
                      >
                        {cat}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}

            {/* SECTION HEADER MATCHING SCREENSHOT ("SOFTSENSE™ View All < >") */}
            <View style={styles.sectionHeaderRow}>
              <View style={styles.sectionTitleBlock}>
                <Text style={[styles.sectionTitle, { color: colors.textPrimary }]}>
                  {isGymshark ? 'SOFTSENSE™' : 'FEATURED COLLECTION'}
                </Text>
                <TouchableOpacity onPress={() => setSelectedCategory('All')}>
                  <Text style={[styles.viewAllText, { color: colors.textSecondary }]}>
                    View All
                  </Text>
                </TouchableOpacity>
              </View>

              <View style={styles.arrowControls}>
                <TouchableOpacity
                  style={[styles.arrowBtn, { borderColor: colors.border }]}
                  accessibilityRole="button"
                  accessibilityLabel="Previous products"
                >
                  <View style={styles.arrowIconWrapperLeft}>
                    <ChevronLeftIcon size={16} color={colors.textPrimary} strokeWidth={2.2} />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.arrowBtn, { borderColor: colors.border }]}
                  accessibilityRole="button"
                  accessibilityLabel="Next products"
                >
                  <View style={styles.arrowIconWrapperRight}>
                    <ChevronRightIcon size={16} color={colors.textPrimary} strokeWidth={2.2} />
                  </View>
                </TouchableOpacity>
              </View>
            </View>

            {/* PRODUCT GRID */}
            {filteredProducts.length === 0 ? (
              <View style={[styles.emptyFallbackCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                <Text style={styles.emptyFallbackEmoji}>📦</Text>
                <Text style={[styles.emptyFallbackTitle, { color: colors.textPrimary }]}>
                  No Products Found
                </Text>
                <Text style={[styles.emptyFallbackSub, { color: colors.textSecondary }]}>
                  No items match this category or the catalog is currently updating.
                </Text>
                <TouchableOpacity
                  onPress={() => setSelectedCategory('All')}
                  style={[styles.emptyFallbackBtn, { backgroundColor: colors.primary, borderRadius: radii.button }]}
                >
                  <Text style={[styles.emptyFallbackBtnText, { color: colors.onPrimary }]}>
                    View All Products
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.grid}>
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onPress={() => onSelectProduct(product)}
                  />
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>

      {/* STORE SWITCHER MODAL */}
      <StoreSwitcherModal
        visible={switcherVisible}
        onClose={() => setSwitcherVisible(false)}
        onRefreshData={(newId) => fetchCatalog(newId)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  heroBanner: {
    minHeight: 200,
    width: '100%',
    marginBottom: 20,
    overflow: 'hidden',
  },
  heroScrim: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.52)',
    justifyContent: 'center',
    padding: 20,
    paddingVertical: 24,
  },
  heroHeadline: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '900',
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  heroDescription: {
    color: '#EAEAEA',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 16,
    maxWidth: 290,
  },
  heroButtonsRow: {
    flexDirection: 'row',
    gap: 10,
    flexWrap: 'wrap',
  },
  heroBtnPrimary: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBtnPrimaryText: {
    color: '#000000',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  heroBtnOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroBtnOutlineText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  categoriesScroll: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
  },
  categoryChipText: {
    fontSize: 12,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    marginTop: 6,
  },
  sectionTitleBlock: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  viewAllText: {
    fontSize: 12,
    textDecorationLine: 'underline',
  },
  arrowControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  arrowBtn: {
    width: 32,
    height: 32,
    borderWidth: 1,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowIconWrapperLeft: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: -0.5 }],
  },
  arrowIconWrapperRight: {
    width: 16,
    height: 16,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ translateX: 0.5 }],
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  emptyFallbackCard: {
    width: '100%',
    padding: 24,
    borderWidth: 1,
    borderRadius: 14,
    alignItems: 'center',
    marginVertical: 18,
  },
  emptyFallbackEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  emptyFallbackTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 4,
  },
  emptyFallbackSub: {
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
    marginBottom: 16,
    maxWidth: 260,
  },
  emptyFallbackBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  emptyFallbackBtnText: {
    fontSize: 13,
    fontWeight: '700',
  },
});
