import React from 'react';
import { View, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { useStore } from '../../context/StoreContext';

export const LoadingState: React.FC<{ message?: string }> = ({ message = 'Loading catalog...' }) => {
  const { config } = useStore();
  const { colors } = config.theme;

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ActivityIndicator size="large" color={colors.accent} />
      <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
    minHeight: 250,
  },
  message: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '500',
  },
});

