import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '../../context/StoreContext';
import { BotanicalLeafIcon, SharkMarkIcon } from './Icons';

interface BrandLogoProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  showWordmark?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'small',
  color,
  showWordmark = true,
}) => {
  const { storeId, config } = useStore();
  const { colors } = config.theme;
  const brandColor = color || colors.textPrimary;

  const isGymshark = storeId === 'gymshark';

  if (isGymshark) {
    const iconSize = size === 'large' ? 32 : size === 'medium' ? 24 : 18;
    const fontSize = size === 'large' ? 24 : size === 'medium' ? 18 : 14;
    const letterSpacing = size === 'large' ? 2.5 : size === 'medium' ? 2 : 1.5;

    return (
      <View style={styles.container}>
        <View style={styles.logoRow}>
          <SharkMarkIcon size={iconSize} color={brandColor} />
          {showWordmark && (
            <Text
              numberOfLines={1}
              style={[
                styles.gymsharkWordmark,
                {
                  fontSize,
                  color: brandColor,
                  letterSpacing,
                },
              ]}
            >
              GYMSHARK
            </Text>
          )}
        </View>
      </View>
    );
  }

  if (storeId !== 'gymshark' && storeId !== 'aura_wellness') {
    const fontSize = size === 'large' ? 22 : size === 'medium' ? 17 : 14;
    return (
      <View style={styles.container}>
        <View style={styles.logoRow}>
          <Text style={{ fontSize: fontSize * 0.9 }}>🏢</Text>
          {showWordmark && (
            <Text
              numberOfLines={1}
              style={[
                styles.gymsharkWordmark,
                {
                  fontSize,
                  color: brandColor,
                  letterSpacing: 2,
                },
              ]}
            >
              {config.name}
            </Text>
          )}
        </View>
      </View>
    );
  }

  // AURA WELLNESS BOTANICAL EMBLEM
  if (size === 'small') {
    // Compact single-line header layout that NEVER wraps or distorts
    return (
      <View style={styles.container}>
        <View style={styles.logoRow}>
          <BotanicalLeafIcon size={17} color={brandColor} strokeWidth={2} />
          {showWordmark && (
            <View style={styles.auraSmallRow}>
              <Text numberOfLines={1} style={[styles.auraSmallTitle, { color: brandColor }]}>
                AURA
              </Text>
              <Text numberOfLines={1} style={[styles.auraSmallSubtitle, { color: brandColor }]}>
                WELLNESS
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  }

  // MEDIUM & LARGE (Welcome Screen, Modals)
  const leafSize = size === 'large' ? 30 : 22;
  const titleSize = size === 'large' ? 22 : 16;

  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <BotanicalLeafIcon size={leafSize} color={brandColor} strokeWidth={1.8} />
        {showWordmark && (
          <View style={styles.auraSmallRow}>
            <Text
              numberOfLines={1}
              style={[
                styles.auraLargeTitle,
                {
                  fontSize: titleSize,
                  color: brandColor,
                  letterSpacing: 2.2,
                },
              ]}
            >
              AURA
            </Text>
            <Text
              numberOfLines={1}
              style={[
                styles.auraLargeSubtitle,
                {
                  fontSize: Math.round(titleSize * 0.7),
                  color: brandColor,
                  letterSpacing: 1.5,
                },
              ]}
            >
              WELLNESS
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  gymsharkWordmark: {
    fontWeight: '900',
    fontStyle: 'italic',
    textTransform: 'uppercase',
  },
  auraSmallRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 4,
  },
  auraSmallTitle: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  auraSmallSubtitle: {
    fontSize: 10,
    fontWeight: '500',
    letterSpacing: 1,
    opacity: 0.8,
  },
  auraLargeTitle: {
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  auraLargeSubtitle: {
    fontWeight: '600',
    textTransform: 'uppercase',
  },
});

