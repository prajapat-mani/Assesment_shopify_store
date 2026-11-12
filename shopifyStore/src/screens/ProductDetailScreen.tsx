import React, { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Product, ProductVariant } from '../types/shopify';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { shopifyService } from '../services/shopify/shopifyService';
import { Header } from '../components/common/Header';
import { VariantSelector } from '../components/product/VariantSelector';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ReviewsSection } from '../components/reviews/ReviewsSection';

interface ProductDetailScreenProps {
  product: Product;
  onBack: () => void;
  onOpenCart: () => void;
}

const { width } = Dimensions.get('window');

export const ProductDetailScreen: React.FC<ProductDetailScreenProps> = ({
  product,
  onBack,
  onOpenCart,
}) => {
  const { config, storeId } = useStore();
  const { colors, radii, typography } = config.theme;
  const { addToCart, items } = useCart();
  const insets = useSafeAreaInsets();
  const isGymshark = storeId === 'gymshark';

  // Initialize selected options with the first variant's options
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    const firstVar = product.variants[0];
    if (firstVar) {
      firstVar.selectedOptions.forEach((opt) => {
        initial[opt.name] = opt.value;
      });
    }
    return initial;
  });

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [addedJustNow, setAddedJustNow] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const totalProductInCart = items
    .filter((item) => item.product.id === product.id)
    .reduce((sum, it) => sum + it.quantity, 0);

  // Synchronize options & reset states immediately when product or store changes
  useEffect(() => {
    const initial: Record<string, string> = {};
    const firstVar = product.variants[0];
    if (firstVar) {
      firstVar.selectedOptions.forEach((opt) => {
        initial[opt.name] = opt.value;
      });
    }
    setSelectedOptions(initial);
    setActiveImageIndex(0);
    setAddedJustNow(false);
  }, [product.id, storeId]);

  // Dynamically resolve the active variant based on current option selections
  const activeVariant: ProductVariant | null = useMemo(() => {
    return shopifyService.resolveVariant(product, selectedOptions);
  }, [product, selectedOptions]);

  const handleSelectOption = (name: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [name]: value,
    }));
    setAddedJustNow(false);
  };

  const handleAddToCart = () => {
    if (!activeVariant) {
      Alert.alert('Selection Error', 'Please choose an available variant combination.');
      return;
    }

    if (!activeVariant.availableForSale) {
      Alert.alert('Out of Stock', 'This variant is currently sold out.');
      return;
    }

    addToCart(product, activeVariant, quantity);
    // Retain the added state permanently (no automatic timer reset)
    setAddedJustNow(true);
  };

  const displayPrice = activeVariant
    ? `${config.currencySymbol}${activeVariant.price.amount}`
    : `${config.currencySymbol}${product.priceRange.minVariantPrice.amount}`;

  const isAvailable = activeVariant ? activeVariant.availableForSale : false;

  return (
    <View style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Header
        title={product.title}
        showBack
        onBack={onBack}
        onOpenCart={onOpenCart}
      />

      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        {/* IMAGE CAROUSEL */}
        <View style={styles.carouselContainer}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={(e) => {
              const slide = Math.round(e.nativeEvent.contentOffset.x / width);
              setActiveImageIndex(slide);
            }}
            scrollEventThrottle={16}
          >
            {product.images.map((img) => (
              <Image
                key={img.id}
                source={{ uri: img.url }}
                style={[styles.carouselImage, { backgroundColor: colors.surface }]}
                resizeMode="cover"
              />
            ))}
          </ScrollView>

          {/* DOTS INDICATOR */}
          {product.images.length > 1 && (
            <View style={styles.dotsRow}>
              {product.images.map((img, idx) => (
                <View
                  key={img.id}
                  style={[
                    styles.dot,
                    {
                      backgroundColor:
                        idx === activeImageIndex ? colors.accent : 'rgba(255,255,255,0.4)',
                    },
                  ]}
                />
              ))}
            </View>
          )}
        </View>

        {/* PRODUCT META */}
        <View style={styles.metaContainer}>
          <View style={styles.topMetaRow}>
            <Text style={[styles.vendor, { color: colors.textSecondary }]}>
              {product.vendor}
            </Text>
            {product.tags.length > 0 && <Badge label={product.tags[0]} variant="brand" />}
          </View>

          <Text
            style={[
              styles.productTitle,
              {
                color: colors.textPrimary,
                textTransform: typography.brandTransform === 'uppercase' ? 'uppercase' : 'none',
              },
            ]}
          >
            {product.title}
          </Text>

          {product.subtitle && (
            <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
              {product.subtitle}
            </Text>
          )}

          {/* PRICE ROW */}
          <View style={styles.priceRow}>
            <Text style={[styles.price, { color: colors.textPrimary }]}>{displayPrice}</Text>
            {activeVariant?.compareAtPrice && (
              <Text style={[styles.comparePrice, { color: colors.textSecondary }]}>
                {config.currencySymbol}
                {activeVariant.compareAtPrice.amount}
              </Text>
            )}
            <View
              style={[
                styles.stockStatusBadge,
                { backgroundColor: isAvailable ? colors.surface : colors.surface },
              ]}
            >
              <Text
                style={[
                  styles.stockStatusText,
                  { color: isAvailable ? colors.success : colors.error },
                ]}
              >
                ● {isAvailable ? 'In Stock (Ready to Ship)' : 'Out of Stock'}
              </Text>
            </View>
          </View>

          {/* DESCRIPTION */}
          <Text style={[styles.description, { color: colors.textSecondary }]}>
            {product.description}
          </Text>

          {/* VARIANT SELECTOR */}
          <VariantSelector
            product={product}
            selectedOptions={selectedOptions}
            activeVariant={activeVariant}
            onSelectOption={handleSelectOption}
          />

          {/* QUANTITY PICKER & CART STATUS */}
          <View style={styles.quantitySection}>
            <View style={styles.quantityPickerRow}>
              <Text style={[styles.quantityLabel, { color: colors.textPrimary }]}>Quantity</Text>

              <View style={[styles.detailStepper, { borderColor: colors.border, backgroundColor: colors.surface }]}>
                <TouchableOpacity
                  onPress={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  style={styles.detailStepperBtn}
                  accessibilityLabel="Decrease quantity"
                >
                  <Text style={[styles.detailStepperText, { color: quantity <= 1 ? colors.border : colors.textPrimary }]}>−</Text>
                </TouchableOpacity>

                <Text style={[styles.detailStepperQty, { color: colors.textPrimary }]}>
                  {quantity}
                </Text>

                <TouchableOpacity
                  onPress={() => setQuantity((q) => q + 1)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                  style={styles.detailStepperBtn}
                  accessibilityLabel="Increase quantity"
                >
                  <Text style={[styles.detailStepperText, { color: colors.textPrimary }]}>+</Text>
                </TouchableOpacity>
              </View>
            </View>

            {totalProductInCart > 0 && (
              <Text style={[styles.inCartIndicator, { color: colors.accent }]}>
                ✓ {totalProductInCart} in your bag
              </Text>
            )}
          </View>

          {/* ADD TO CART ACTION */}
          <View style={[styles.actionContainer, { paddingBottom: Math.max(insets.bottom, 12) }]}>
            <Button
              title={
                !activeVariant
                  ? 'Select Options'
                  : !isAvailable
                  ? 'Sold Out'
                  : addedJustNow
                  ? `✓ Added (${quantity}) · View Bag →`
                  : `Add to Bag · ${config.currencySymbol}${(parseFloat(activeVariant.price.amount) * quantity).toFixed(2)}`
              }
              onPress={addedJustNow ? onOpenCart : handleAddToCart}
              disabled={!activeVariant || !isAvailable}
              variant={addedJustNow ? 'primary' : 'primary'}
              style={styles.cartActionButton}
            />

            {addedJustNow && (
              <TouchableOpacity
                onPress={handleAddToCart}
                style={[styles.viewCartButton, { borderColor: colors.border }]}
                accessibilityRole="button"
                accessibilityLabel="Add another item"
              >
                <Text style={[styles.viewCartText, { color: colors.textSecondary }]}>
                  + Add More to Bag
                </Text>
              </TouchableOpacity>
            )}

            {!isAvailable && (
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Stock Notification Saved',
                    `We will notify you immediately when ${activeVariant?.title || product.title} is restocked!`
                  )
                }
                style={[styles.viewCartButton, { borderColor: colors.border }]}
                accessibilityRole="button"
                accessibilityLabel="Notify me when available"
              >
                <Text style={[styles.viewCartText, { color: colors.textPrimary }]}>
                  🔔 Notify Me When Restocked
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* 3RD PARTY REVIEWS INTEGRATION (Gymshark: Yotpo) */}
          {config.features.showReviews && <ReviewsSection productId={product.id} />}

          {/* 3RD PARTY LOYALTY & BOTANICAL PERKS (Aura Wellness) */}
          {config.features.showLoyaltyRewards && (
            <View style={[styles.auraPerksCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md }]}>
              <View style={styles.perkHeader}>
                <Text style={styles.perkIcon}>🌿</Text>
                <View style={{ flex: 1 }}>
                  <Text style={[styles.perkTitle, { color: colors.textPrimary }]}>
                    Aura VIP Rewards
                  </Text>
                  <Text style={[styles.perkSubtitle, { color: colors.accent }]}>
                    Earn {Math.round(parseFloat(product.priceRange.minVariantPrice.amount) * 2 * quantity)} Points on this order
                  </Text>
                </View>
              </View>

              <View style={[styles.perksDivider, { backgroundColor: colors.border }]} />

              <View style={styles.benefitsGrid}>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitEmoji}>🌱</Text>
                  <Text style={[styles.benefitText, { color: colors.textSecondary }]}>Cold-Pressed Organics</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitEmoji}>🐰</Text>
                  <Text style={[styles.benefitText, { color: colors.textSecondary }]}>100% Cruelty Free</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitEmoji}>♻️</Text>
                  <Text style={[styles.benefitText, { color: colors.textSecondary }]}>Recyclable Glass</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitEmoji}>🚚</Text>
                  <Text style={[styles.benefitText, { color: colors.textSecondary }]}>Free Ship Over $50</Text>
                </View>
              </View>
            </View>
          )}

          {/* GYMSHARK ATHLETIC GUARANTEES */}
          {isGymshark && (
            <View style={[styles.auraPerksCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md }]}>
              <View style={styles.benefitsGrid}>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitEmoji}>✨</Text>
                  <Text style={[styles.benefitText, { color: colors.textSecondary }]}>SoftSense™ Fabric</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitEmoji}>💨</Text>
                  <Text style={[styles.benefitText, { color: colors.textSecondary }]}>Sweat-Wicking Tech</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitEmoji}>🔄</Text>
                  <Text style={[styles.benefitText, { color: colors.textSecondary }]}>Free 30-Day Returns</Text>
                </View>
                <View style={styles.benefitItem}>
                  <Text style={styles.benefitEmoji}>🛡️</Text>
                  <Text style={[styles.benefitText, { color: colors.textSecondary }]}>Authentic Gymshark</Text>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
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
    paddingBottom: 40,
  },
  carouselContainer: {
    width: width,
    height: 360,
    position: 'relative',
  },
  carouselImage: {
    width: width,
    height: 360,
  },
  dotsRow: {
    position: 'absolute',
    bottom: 12,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  metaContainer: {
    padding: 20,
  },
  topMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  vendor: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  productTitle: {
    fontSize: 22,
    fontWeight: '900',
    lineHeight: 26,
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 13,
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 14,
  },
  price: {
    fontSize: 20,
    fontWeight: '900',
  },
  comparePrice: {
    fontSize: 15,
    textDecorationLine: 'line-through',
  },
  stockStatusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  stockStatusText: {
    fontSize: 11,
    fontWeight: '700',
  },
  description: {
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 16,
  },
  quantitySection: {
    marginTop: 16,
    marginBottom: 4,
  },
  quantityPickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityLabel: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  detailStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  detailStepperBtn: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailStepperText: {
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 20,
  },
  detailStepperQty: {
    fontSize: 14,
    fontWeight: '800',
    paddingHorizontal: 12,
  },
  inCartIndicator: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: 6,
  },
  actionContainer: {
    marginTop: 16,
    gap: 10,
  },
  cartActionButton: {
    width: '100%',
    height: 52,
  },
  viewCartButton: {
    width: '100%',
    paddingVertical: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
  },
  viewCartText: {
    fontSize: 13,
    fontWeight: '700',
  },
  auraPerksCard: {
    marginTop: 20,
    padding: 16,
    borderWidth: 1,
  },
  perkHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  perkIcon: {
    fontSize: 24,
  },
  perkTitle: {
    fontSize: 14,
    fontWeight: '800',
  },
  perkSubtitle: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  perksDivider: {
    height: 1,
    marginVertical: 14,
  },
  benefitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
  },
  benefitItem: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  benefitEmoji: {
    fontSize: 16,
  },
  benefitText: {
    fontSize: 11,
    fontWeight: '600',
    flex: 1,
  },
});
