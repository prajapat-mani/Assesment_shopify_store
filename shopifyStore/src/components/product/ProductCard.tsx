import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Product } from '../../types/shopify';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { HeartIcon } from '../common/Icons';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

const { width } = Dimensions.get('window');
// Two-column layout with 12px gutter
const CARD_WIDTH = (width - 40) / 2;
const IMAGE_HEIGHT = CARD_WIDTH * 1.35; // 3:4 portrait ratio like Gymshark web

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { config } = useStore();
  const { colors, radii } = config.theme;
  const { items, addToCart, updateQuantity } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgError, setImgError] = useState(false);

  const cartItems = items.filter((item) => item.product.id === product.id);
  const cartQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const firstImage = product.images[0]?.url;
  const formattedPrice = `${config.currencySymbol}${Math.round(parseFloat(product.priceRange.minVariantPrice.amount))}`;
  const badgeLabel = product.badgeText || (product.tags.length > 0 ? product.tags[0].toLowerCase() : null);

  const toggleWishlist = (e: any) => {
    e.stopPropagation?.();
    setIsWishlisted((prev) => !prev);
  };

  return (
    <TouchableOpacity
      activeOpacity={0.92}
      onPress={onPress}
      style={[styles.card, { width: CARD_WIDTH }]}
      accessibilityRole="button"
      accessibilityLabel={`View ${product.title}`}
    >
      {/* IMAGE CONTAINER WITH BRAND BACKDROP */}
      <View style={[styles.imageWrapper, { height: IMAGE_HEIGHT, borderRadius: radii.sm }]}>
        {firstImage && !imgError ? (
          <Image
            source={{ uri: firstImage }}
            style={[styles.image, { borderRadius: radii.sm }]}
            resizeMode="cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <View style={[styles.placeholder, { backgroundColor: colors.surface }]}>
            <Text style={{ fontSize: 22, marginBottom: 4 }}>
              {config.id === 'gymshark' ? '🦈' : '🌿'}
            </Text>
            <Text style={{ color: colors.textSecondary, fontSize: 10, fontWeight: '700', letterSpacing: 0.5 }}>
              {product.productType.toUpperCase()}
            </Text>
          </View>
        )}

        {/* TOP-LEFT FLOATING QUANTITY BADGE */}
        {cartQuantity > 0 && (
          <View style={[styles.cartQtyBadge, { backgroundColor: colors.primary }]}>
            <Text style={[styles.cartQtyText, { color: colors.onPrimary }]}>
              {cartQuantity} in bag
            </Text>
          </View>
        )}

        {/* TOP-RIGHT WISHLIST HEART ICON */}
        <TouchableOpacity
          onPress={toggleWishlist}
          activeOpacity={0.7}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
          style={styles.wishlistBtn}
          accessibilityLabel="Add to wishlist"
        >
          <HeartIcon
            size={20}
            filled={isWishlisted}
            color="#111111"
            fillColor="#111111"
            strokeWidth={1.5}
          />
        </TouchableOpacity>

        {/* BOTTOM-LEFT FLOATING BADGE PILL (e.g. "made for the studio") */}
        {badgeLabel && (
          <View style={[styles.badgePill, { borderRadius: radii.pill }]}>
            <Text style={styles.badgeText}>{badgeLabel}</Text>
          </View>
        )}
      </View>

      {/* METADATA BLOCK BELOW IMAGE */}
      <View style={styles.detailsBlock}>
        {/* ROW 1: TITLE & STAR RATING */}
        <View style={styles.titleRow}>
          <Text numberOfLines={2} style={[styles.title, { color: colors.textPrimary }]}>
            {product.title}
          </Text>
          {product.rating && (
            <View style={styles.ratingBadge}>
              <Text style={[styles.ratingStar, { color: colors.textPrimary }]}>★</Text>
              <Text style={[styles.ratingScore, { color: colors.textPrimary }]}>
                {product.rating % 1 === 0 ? product.rating : product.rating.toFixed(1)}
              </Text>
            </View>
          )}
        </View>

        {/* ROW 2: SUBTITLE / FIT & COLOUR */}
        {product.subtitle && (
          <Text numberOfLines={1} style={[styles.subtitle, { color: colors.textSecondary }]}>
            {product.subtitle}
          </Text>
        )}

        {/* ROW 3: BOLD PRICE & QUANTITY CONTROLS */}
        <View style={styles.priceRow}>
          <Text style={[styles.price, { color: colors.textPrimary }]}>{formattedPrice}</Text>

          {cartQuantity > 0 ? (
            <View style={[styles.quickStepper, { borderColor: colors.border, backgroundColor: colors.surface }]}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={(e) => {
                  e.stopPropagation?.();
                  const target = cartItems[0];
                  if (target) updateQuantity(target.variant.id, target.quantity - 1);
                }}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={styles.stepperBtn}
                accessibilityLabel="Decrease quantity"
              >
                <Text style={[styles.stepperBtnText, { color: colors.textPrimary }]}>−</Text>
              </TouchableOpacity>

              <Text style={[styles.stepperQty, { color: colors.textPrimary }]}>
                {cartQuantity}
              </Text>

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={(e) => {
                  e.stopPropagation?.();
                  const target = cartItems[0];
                  if (target) updateQuantity(target.variant.id, target.quantity + 1);
                }}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                style={styles.stepperBtn}
                accessibilityLabel="Increase quantity"
              >
                <Text style={[styles.stepperBtnText, { color: colors.textPrimary }]}>+</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={(e) => {
                e.stopPropagation?.();
                const firstAvailable = product.variants.find((v) => v.availableForSale) || product.variants[0];
                if (firstAvailable) {
                  addToCart(product, firstAvailable, 1);
                }
              }}
              hitSlop={{ top: 6, bottom: 6, left: 6, right: 6 }}
              style={[styles.quickAddBtn, { borderColor: colors.border, backgroundColor: colors.surface }]}
              accessibilityLabel={`Add ${product.title} to bag`}
            >
              <Text style={[styles.quickAddText, { color: colors.textPrimary }]}>+ Add</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 20,
  },
  imageWrapper: {
    width: '100%',
    backgroundColor: '#F5F5F3',
    position: 'relative',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  placeholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartQtyBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    zIndex: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
    elevation: 2,
  },
  cartQtyText: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.3,
    textTransform: 'uppercase',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  badgePill: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.94)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  badgeText: {
    color: '#111111',
    fontSize: 10,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
  detailsBlock: {
    marginTop: 8,
    paddingHorizontal: 2,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 4,
  },
  title: {
    flex: 1,
    fontSize: 13,
    fontWeight: '700',
    lineHeight: 17,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    paddingTop: 1,
  },
  ratingStar: {
    fontSize: 11,
    fontWeight: '800',
  },
  ratingScore: {
    fontSize: 11,
    fontWeight: '800',
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '400',
    marginTop: 2,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  price: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  quickStepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 3,
    paddingVertical: 2,
  },
  stepperBtn: {
    width: 22,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperBtnText: {
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 16,
  },
  stepperQty: {
    fontSize: 12,
    fontWeight: '800',
    paddingHorizontal: 4,
  },
  quickAddBtn: {
    borderWidth: 1,
    borderRadius: 14,
    paddingHorizontal: 9,
    paddingVertical: 2.5,
  },
  quickAddText: {
    fontSize: 11,
    fontWeight: '700',
  },
});
