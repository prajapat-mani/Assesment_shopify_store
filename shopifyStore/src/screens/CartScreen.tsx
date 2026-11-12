import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { Header } from '../components/common/Header';
import { Button } from '../components/common/Button';
import { CheckoutModal } from './CheckoutModal';

interface CartScreenProps {
  onBack: () => void;
  onExploreProducts: () => void;
}

export const CartScreen: React.FC<CartScreenProps> = ({ onBack, onExploreProducts }) => {
  const { config, storeId } = useStore();
  const { colors, radii, typography } = config.theme;
  const { items, totalQuantity, subtotal, formattedSubtotal, updateQuantity, removeFromCart, clearCart } =
    useCart();
  const insets = useSafeAreaInsets();

  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);
  const isGymshark = storeId === 'gymshark';

  const freeShippingThreshold = config.features.freeShippingThreshold || 75;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const freeShippingProgress = Math.min(1, subtotal / freeShippingThreshold);

  return (
    <View style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <Header
        title={isGymshark ? `YOUR BAG (${totalQuantity})` : `Cart (${totalQuantity})`}
        showBack
        onBack={onBack}
        rightAction={
          items.length > 0 ? (
            <TouchableOpacity onPress={clearCart} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={[styles.clearText, { color: colors.textSecondary }]}>Clear</Text>
            </TouchableOpacity>
          ) : null
        }
      />

      {items.length === 0 ? (
        /* EMPTY CART STATE */
        <View style={[styles.emptyContainer, { paddingBottom: Math.max(insets.bottom, 16) + 32 }]}>
          <Text style={styles.emptyIcon}>🛍️</Text>
          <Text style={[styles.emptyTitle, { color: colors.textPrimary }]}>Your Bag is Empty</Text>
          <Text style={[styles.emptySubtitle, { color: colors.textSecondary }]}>
            Explore our high-performance gear and add items to your cart.
          </Text>
          <Button
            title="Explore Products"
            onPress={onExploreProducts}
            variant="primary"
            style={styles.exploreButton}
          />
        </View>
      ) : (
        <ScrollView
          style={styles.container}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingBottom: Math.max(insets.bottom, 16) + 40 },
          ]}
        >
          {/* FREE SHIPPING BAR */}
          <View
            style={[
              styles.shippingCard,
              { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md },
            ]}
          >
            <View style={styles.shippingTextRow}>
              <Text style={[styles.shippingText, { color: colors.textPrimary }]}>
                {amountToFreeShipping === 0
                  ? '🎉 Free Shipping Unlocked!'
                  : `Add ${config.currencySymbol}${amountToFreeShipping.toFixed(2)} more for Free Shipping`}
              </Text>
              <Text style={[styles.shippingTarget, { color: colors.textSecondary }]}>
                Goal: {config.currencySymbol}{freeShippingThreshold}
              </Text>
            </View>
            <View style={[styles.progressBarTrack, { backgroundColor: colors.border }]}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    backgroundColor: amountToFreeShipping === 0 ? colors.success : colors.secondary,
                    width: `${Math.round(freeShippingProgress * 100)}%`,
                  },
                ]}
              />
            </View>
          </View>

          {/* CART ITEMS LIST */}
          <View style={styles.itemsList}>
            {items.map((item) => {
              const itemTotal = (
                (parseFloat(item.variant.price.amount) || 0) * item.quantity
              ).toFixed(2);
              const imageUrl = item.variant.image?.url || item.product.images[0]?.url;

              return (
                <View
                  key={item.variant.id}
                  style={[
                    styles.itemCard,
                    {
                      backgroundColor: colors.card,
                      borderColor: colors.border,
                      borderRadius: radii.md,
                    },
                  ]}
                >
                  <Image
                    source={{ uri: imageUrl }}
                    style={[styles.itemImage, { borderRadius: radii.sm, backgroundColor: colors.surface }]}
                    resizeMode="cover"
                  />

                  <View style={styles.itemDetails}>
                    <View style={styles.itemHeader}>
                      <Text
                        numberOfLines={1}
                        style={[
                          styles.itemTitle,
                          {
                            color: colors.textPrimary,
                            textTransform: typography.brandTransform === 'uppercase' ? 'uppercase' : 'none',
                          },
                        ]}
                      >
                        {item.product.title}
                      </Text>
                      <TouchableOpacity
                        onPress={() => removeFromCart(item.variant.id)}
                        hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      >
                        <Text style={[styles.removeIcon, { color: colors.textSecondary }]}>✕</Text>
                      </TouchableOpacity>
                    </View>

                    {item.product.subtitle && (
                      <Text style={[styles.variantSubtitle, { color: colors.textSecondary }]}>
                        {item.product.subtitle}
                      </Text>
                    )}

                    <Text style={[styles.variantTitle, { color: colors.textSecondary }]}>
                      Size: {item.variant.title}
                    </Text>

                    <View style={styles.itemBottomRow}>
                      <Text style={[styles.itemPrice, { color: colors.textPrimary }]}>
                        {config.currencySymbol}{itemTotal}
                      </Text>

                      {/* QUANTITY STEPPER */}
                      <View style={[styles.stepper, { borderColor: colors.border, borderRadius: radii.sm }]}>
                        <TouchableOpacity
                          onPress={() => updateQuantity(item.variant.id, item.quantity - 1)}
                          style={[styles.stepBtn, { backgroundColor: colors.surface }]}
                        >
                          <Text style={[styles.stepBtnText, { color: colors.textPrimary }]}>-</Text>
                        </TouchableOpacity>

                        <Text style={[styles.stepQty, { color: colors.textPrimary }]}>
                          {item.quantity}
                        </Text>

                        <TouchableOpacity
                          onPress={() => updateQuantity(item.variant.id, item.quantity + 1)}
                          style={[styles.stepBtn, { backgroundColor: colors.surface }]}
                        >
                          <Text style={[styles.stepBtnText, { color: colors.textPrimary }]}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          {/* ORDER SUMMARY */}
          <View
            style={[
              styles.summaryCard,
              { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md },
            ]}
          >
            <Text style={[styles.summaryTitle, { color: colors.textPrimary }]}>Order Summary</Text>

            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Subtotal</Text>
              <Text style={[styles.summaryVal, { color: colors.textPrimary }]}>
                {formattedSubtotal}
              </Text>
            </View>

            <View style={styles.summaryRow}>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Estimated Shipping</Text>
              <Text style={[styles.summaryVal, { color: colors.textPrimary }]}>
                {amountToFreeShipping === 0 ? 'FREE' : `${config.currencySymbol}5.99`}
              </Text>
            </View>

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <View style={styles.summaryRow}>
              <Text style={[styles.totalLabel, { color: colors.textPrimary }]}>Estimated Total</Text>
              <Text style={[styles.totalVal, { color: colors.accent }]}>
                {config.currencySymbol}
                {(subtotal + (amountToFreeShipping === 0 ? 0 : 5.99)).toFixed(2)}
              </Text>
            </View>

            <Button
              title="Proceed to Checkout →"
              onPress={() => setCheckoutModalVisible(true)}
              variant="primary"
              style={styles.checkoutBtn}
            />
          </View>
        </ScrollView>
      )}

      {/* CHECKOUT FLOW EXPLANATION MODAL */}
      <CheckoutModal
        visible={checkoutModalVisible}
        onClose={() => setCheckoutModalVisible(false)}
        subtotal={formattedSubtotal}
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
  clearText: {
    fontSize: 13,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyIcon: {
    fontSize: 54,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 24,
  },
  exploreButton: {
    width: 200,
  },
  shippingCard: {
    padding: 14,
    borderWidth: 1,
    marginBottom: 16,
  },
  shippingTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  shippingText: {
    fontSize: 12,
    fontWeight: '700',
  },
  shippingTarget: {
    fontSize: 11,
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  itemsList: {
    gap: 12,
    marginBottom: 20,
  },
  itemCard: {
    flexDirection: 'row',
    padding: 12,
    borderWidth: 1,
    gap: 12,
  },
  itemImage: {
    width: 76,
    height: 76,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  itemTitle: {
    fontSize: 13,
    fontWeight: '700',
    flex: 1,
    paddingRight: 8,
  },
  removeIcon: {
    fontSize: 16,
    fontWeight: '600',
    padding: 2,
  },
  variantSubtitle: {
    fontSize: 11,
    marginTop: 1,
  },
  variantTitle: {
    fontSize: 12,
    marginTop: 2,
  },
  itemBottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '800',
  },
  stepper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    overflow: 'hidden',
  },
  stepBtn: {
    width: 28,
    height: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepBtnText: {
    fontSize: 14,
    fontWeight: '700',
  },
  stepQty: {
    paddingHorizontal: 10,
    fontSize: 12,
    fontWeight: '700',
  },
  summaryCard: {
    padding: 18,
    borderWidth: 1,
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '800',
    marginBottom: 14,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 13,
  },
  summaryVal: {
    fontSize: 13,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 15,
    fontWeight: '800',
  },
  totalVal: {
    fontSize: 17,
    fontWeight: '900',
  },
  checkoutBtn: {
    marginTop: 18,
    width: '100%',
    height: 50,
  },
});
