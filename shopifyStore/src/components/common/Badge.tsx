import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '../../context/StoreContext';

interface BadgeProps {
  label: string;
  variant?: 'brand' | 'accent' | 'outOfStock' | 'subtle';
}

export const Badge: React.FC<BadgeProps> = ({ label, variant = 'brand' }) => {
  const { config } = useStore();
  const { colors, radii } = config.theme;

  let bg = colors.tagBackground;
  let text = colors.tagText;

  if (variant === 'accent') {
    bg = colors.accent;
    text = '#FFFFFF';
  } else if (variant === 'outOfStock') {
    bg = colors.outOfStock;
    text = '#FFFFFF';
  } else if (variant === 'subtle') {
    bg = colors.surface;
    text = colors.textSecondary;
  }

  return (
    <View style={[styles.badge, { backgroundColor: bg, borderRadius: radii.sm }]}>
      <Text style={[styles.text, { color: text }]}>{label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});

