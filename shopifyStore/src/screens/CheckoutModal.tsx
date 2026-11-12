import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { Button } from '../components/common/Button';

interface CheckoutModalProps {
  visible: boolean;
  onClose: () => void;
  subtotal: string;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  visible,
  onClose,
  subtotal,
}) => {
  const { config, storeId } = useStore();
  const { colors, radii } = config.theme;
  const { clearCart, items } = useCart();
  const insets = useSafeAreaInsets();

  const [orderPlaced, setOrderPlaced] = useState(false);
  const isGymshark = storeId === 'gymshark';

  const handlePlaceOrder = () => {
    setOrderPlaced(true);
    clearCart();
  };

  const handleClose = () => {
    setOrderPlaced(false);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <TouchableWithoutFeedback onPress={handleClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.sheetCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                  borderRadius: radii.lg,
                  paddingBottom: Math.max(insets.bottom + 16, 28),
                },
              ]}
            >
              {orderPlaced ? (
                /* ORDER CONFIRMATION SCREEN */
                <View style={styles.successContainer}>
                  <Text style={styles.successEmoji}>🎉</Text>
                  <Text style={[styles.successTitle, { color: colors.textPrimary }]}>
                    Order Confirmed!
                  </Text>
                  <Text style={[styles.successSubtitle, { color: colors.textSecondary }]}>
                    Thank you for shopping with {config.name}. Your order #{isGymshark ? 'GS-89104' : 'AW-42091'} has been placed.
                  </Text>
                  <Text style={[styles.successNote, { color: colors.textSecondary }]}>
                    A tracking confirmation email has been dispatched.
                  </Text>
                  <Button
                    title="Continue Shopping"
                    onPress={handleClose}
                    variant="primary"
                    style={styles.continueBtn}
                  />
                </View>
              ) : (
                /* CHECKOUT SHEET */
                <>
                  <View style={styles.header}>
                    <View>
                      <Text style={[styles.sheetTitle, { color: colors.textPrimary }]}>
                        Express Checkout
                      </Text>
                      <Text style={[styles.subTitle, { color: colors.accent }]}>
                        🔒 256-bit Encrypted Checkout
                      </Text>
                    </View>
                    <TouchableOpacity onPress={handleClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                      <Text style={[styles.closeBtn, { color: colors.textSecondary }]}>✕</Text>
                    </TouchableOpacity>
                  </View>

                  <ScrollView style={styles.contentScroll} showsVerticalScrollIndicator={false}>
                    {/* ORDER SUMMARY PILL */}
                    <View style={[styles.summaryBadge, { backgroundColor: colors.card, borderColor: colors.border }]}>
                      <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>
                        Total Due ({items.length} {items.length === 1 ? 'item' : 'items'}):
                      </Text>
                      <Text style={[styles.summaryAmount, { color: colors.textPrimary }]}>{subtotal}</Text>
                    </View>

                    {/* DELIVERY ADDRESS BLOCK */}
                    <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md }]}>
                      <Text style={[styles.cardHeading, { color: colors.textPrimary }]}>
                        Shipping Address
                      </Text>
                      <Text style={[styles.cardText, { color: colors.textPrimary, fontWeight: '700' }]}>
                        Alex Morgan
                      </Text>
                      <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                        742 Evergreen Terrace, Suite 100
                      </Text>
                      <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                        Austin, TX 78701 · United States
                      </Text>
                    </View>

                    {/* PAYMENT METHOD */}
                    <View style={[styles.infoCard, { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.md }]}>
                      <Text style={[styles.cardHeading, { color: colors.textPrimary }]}>
                        Payment Method
                      </Text>
                      <View style={styles.paymentRow}>
                        <Text style={styles.paymentBadge}>⚡ Shop Pay</Text>
                        <Text style={[styles.cardText, { color: colors.textSecondary }]}>
                          Ending in •••• 4242
                        </Text>
                      </View>
                    </View>

                    <Text style={[styles.policyNotice, { color: colors.textSecondary }]}>
                      By placing your order, you agree to {config.name}&apos;s terms of service and standard 30-day return policy.
                    </Text>
                  </ScrollView>

                  <View style={styles.footerActions}>
                    <Button
                      title={`Pay ${subtotal} · Place Order`}
                      onPress={handlePlaceOrder}
                      variant="primary"
                    />
                  </View>
                </>
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'flex-end',
  },
  sheetCard: {
    width: '100%',
    maxHeight: '85%',
    borderTopWidth: 1,
    padding: 22,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  subTitle: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  closeBtn: {
    fontSize: 18,
    fontWeight: '700',
    padding: 4,
  },
  contentScroll: {
    marginBottom: 16,
  },
  summaryBadge: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
  },
  summaryLabel: {
    fontSize: 13,
    fontWeight: '600',
  },
  summaryAmount: {
    fontSize: 18,
    fontWeight: '900',
  },
  infoCard: {
    padding: 14,
    borderWidth: 1,
    marginBottom: 12,
  },
  cardHeading: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  cardText: {
    fontSize: 13,
    lineHeight: 18,
  },
  paymentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 2,
  },
  paymentBadge: {
    fontSize: 13,
    fontWeight: '800',
    color: '#5A31F4',
  },
  policyNotice: {
    fontSize: 11,
    lineHeight: 16,
    marginTop: 6,
    textAlign: 'center',
  },
  footerActions: {
    gap: 10,
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  successEmoji: {
    fontSize: 52,
    marginBottom: 12,
  },
  successTitle: {
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
  },
  successSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 8,
  },
  successNote: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 24,
  },
  continueBtn: {
    width: '100%',
  },
});
