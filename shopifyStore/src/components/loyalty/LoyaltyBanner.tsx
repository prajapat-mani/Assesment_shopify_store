import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useStore } from '../../context/StoreContext';
import { loyaltyAdapter, LoyaltyAccount } from '../../services/integrations/loyaltyAdapter';

export const LoyaltyBanner: React.FC = () => {
  const { config } = useStore();
  const { colors, radii } = config.theme;

  const [account, setAccount] = useState<LoyaltyAccount | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function fetchLoyalty() {
      setIsLoading(true);
      try {
        const data = await loyaltyAdapter.getCustomerLoyalty();
        if (isMounted) setAccount(data);
      } catch {
        // Safe silent handling
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }
    fetchLoyalty();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!config.features.showLoyaltyRewards) return null;

  return (
    <View
      style={[
        styles.banner,
        {
          backgroundColor: colors.card,
          borderColor: colors.accent,
          borderRadius: radii.md,
        },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.leftLabel}>
          <Text style={[styles.sparkle, { color: colors.secondary }]}>✨</Text>
          <Text numberOfLines={1} style={[styles.title, { color: colors.textPrimary }]}>
            Aura VIP Rewards
          </Text>
        </View>

        <View style={[styles.tierBadge, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Text style={[styles.tierText, { color: colors.accent }]}>
            {account?.tierName || 'VIP Member'}
          </Text>
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size="small" color={colors.accent} style={{ marginVertical: 6 }} />
      ) : account ? (
        <View style={styles.content}>
          <Text style={[styles.desc, { color: colors.textSecondary }]}>
            You have{' '}
            <Text style={{ fontWeight: '800', color: colors.accent }}>
              {account.pointsBalance} pts
            </Text>{' '}
            available. Redeem for{' '}
            <Text style={{ fontWeight: '800', color: colors.textPrimary }}>
              ${account.availableDiscountDollars} off
            </Text>{' '}
            at checkout!
          </Text>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  banner: {
    marginVertical: 12,
    padding: 14,
    borderWidth: 1.5,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  leftLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  sparkle: {
    fontSize: 16,
  },
  title: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.3,
  },
  tierBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2.5,
    borderRadius: 12,
    borderWidth: 1,
    flexShrink: 0,
  },
  tierText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  content: {
    marginTop: 2,
  },
  desc: {
    fontSize: 12,
    lineHeight: 17,
  },
});
