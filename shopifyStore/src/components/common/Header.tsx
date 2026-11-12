import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../context/StoreContext';
import { useCart } from '../../context/CartContext';
import { BrandLogo } from './BrandLogo';
import { BackArrowIcon } from './Icons';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  onBack?: () => void;
  onOpenStoreSwitcher?: () => void;
  onOpenCart?: () => void;
  rightAction?: React.ReactNode;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  showBack = false,
  onBack,
  onOpenStoreSwitcher,
  onOpenCart,
  rightAction,
}) => {
  const { config, storeId } = useStore();
  const { totalQuantity } = useCart();
  const { colors, typography } = config.theme;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (Platform.OS === 'android') {
      (StatusBar as any).setBackgroundColor?.(colors.background, true);
      (StatusBar as any).setTranslucent?.(true);
    }
  }, [colors.background]);

  const displayTitle = title || config.name;

  return (
    <>
      <StatusBar
        barStyle={config.theme.dark ? 'light-content' : 'dark-content'}
      />
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            borderBottomColor: colors.border,
            paddingTop: insets.top,
            height: 56 + insets.top,
          },
        ]}
      >
      <View style={styles.leftContainer}>
        {showBack ? (
          <TouchableOpacity
            onPress={onBack}
            hitSlop={{ top: 16, bottom: 16, left: 16, right: 24 }}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="Go back"
            activeOpacity={0.65}
          >
            <BackArrowIcon size={22} color={colors.textPrimary} strokeWidth={2.2} />
          </TouchableOpacity>
        ) : onOpenStoreSwitcher ? (
          <TouchableOpacity
            onPress={onOpenStoreSwitcher}
            style={[styles.switchBadge, { backgroundColor: colors.surface, borderColor: colors.border }]}
            accessibilityRole="button"
            accessibilityLabel="Switch active store"
          >
            <View style={[styles.statusDot, { backgroundColor: colors.accent }]} />
            <Text style={[styles.switchBadgeText, { color: colors.textPrimary }]}>
              {storeId === 'gymshark'
                ? '⚡ Gymshark'
                : storeId === 'aura_wellness'
                ? '🌿 Aura'
                : `🏢 ${config.name.split(' ')[0]}`}
            </Text>
            <Text style={[styles.chevron, { color: colors.textSecondary }]}>▼</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <View style={styles.centerContainer} pointerEvents="box-none">
        {title ? (
          <Text
            numberOfLines={1}
            style={[
              styles.title,
              {
                color: colors.textPrimary,
                textTransform: typography.brandTransform,
                letterSpacing: typography.letterSpacing,
              },
            ]}
          >
            {title}
          </Text>
        ) : (
          <BrandLogo size="small" />
        )}
      </View>

      <View style={styles.rightContainer}>
        {rightAction}
        {onOpenCart && (
          <TouchableOpacity
            onPress={onOpenCart}
            style={[styles.cartButton, { borderColor: colors.border }]}
            accessibilityRole="button"
            accessibilityLabel={`Cart with ${totalQuantity} items`}
          >
            <Text style={[styles.cartIcon, { color: colors.textPrimary }]}>🛒</Text>
            {totalQuantity > 0 && (
              <View style={[styles.badge, { backgroundColor: colors.secondary }]}>
                <Text style={styles.badgeText}>{totalQuantity > 99 ? '99+' : totalQuantity}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  leftContainer: {
    minWidth: 50,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    elevation: 10,
  },
  centerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  rightContainer: {
    minWidth: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
    zIndex: 10,
    elevation: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    fontFamily: Platform.select({ ios: 'HelveticaNeue-Bold', android: 'sans-serif-medium' }),
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  switchBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 14,
    borderWidth: 1,
    gap: 5,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  switchBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  chevron: {
    fontSize: 8,
  },
  cartButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  cartIcon: {
    fontSize: 18,
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
});

