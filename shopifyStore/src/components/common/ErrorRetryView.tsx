import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useStore } from '../../context/StoreContext';
import { Button } from './Button';

interface ErrorRetryViewProps {
  title?: string;
  message?: string;
  onRetry: () => void;
}

export const ErrorRetryView: React.FC<ErrorRetryViewProps> = ({
  title = 'Unable to Load Products',
  message = 'We could not reach the Shopify Storefront API. Please check your connection and try again.',
  onRetry,
}) => {
  const { config } = useStore();
  const { colors } = config.theme;

  return (
    <View style={[styles.container, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={styles.errorIcon}>⚠️</Text>
      <Text style={[styles.title, { color: colors.textPrimary }]}>{title}</Text>
      <Text style={[styles.message, { color: colors.textSecondary }]}>{message}</Text>
      <Button
        title="Retry Connection"
        onPress={onRetry}
        variant="primary"
        style={styles.retryButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorIcon: {
    fontSize: 36,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  retryButton: {
    width: '100%',
    maxWidth: 200,
  },
});

