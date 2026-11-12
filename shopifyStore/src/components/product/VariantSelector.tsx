import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Product, ProductVariant } from '../../types/shopify';
import { useStore } from '../../context/StoreContext';

interface VariantSelectorProps {
  product: Product;
  selectedOptions: Record<string, string>;
  activeVariant: ProductVariant | null;
  onSelectOption: (optionName: string, value: string) => void;
}

export const VariantSelector: React.FC<VariantSelectorProps> = ({
  product,
  selectedOptions,
  activeVariant,
  onSelectOption,
}) => {
  const { config } = useStore();
  const { colors, radii } = config.theme;

  return (
    <View style={styles.container}>
      {product.options.map((option) => {
        const selectedVal = selectedOptions[option.name];

        return (
          <View key={option.id || option.name} style={styles.optionSection}>
            <View style={styles.optionHeader}>
              <Text style={[styles.optionName, { color: colors.textPrimary }]}>
                {option.name}:
              </Text>
              <Text style={[styles.optionSelectedVal, { color: colors.accent }]}>
                {selectedVal}
              </Text>
            </View>

            <View style={styles.valuesRow}>
              {option.values.map((val) => {
                const isSelected = selectedVal === val;

                // Test if this candidate option produces an unavailable variant
                const hypotheticalOptions = { ...selectedOptions, [option.name]: val };
                const hypotheticalVariant = product.variants.find((v) =>
                  Object.keys(hypotheticalOptions).every((k) =>
                    v.selectedOptions.some(
                      (opt) =>
                        opt.name.toLowerCase() === k.toLowerCase() &&
                        opt.value.toLowerCase() === hypotheticalOptions[k].toLowerCase()
                    )
                  )
                );

                const isUnavailable = hypotheticalVariant
                  ? !hypotheticalVariant.availableForSale
                  : false;

                let pillBg = colors.surface;
                let pillBorder = colors.border;
                let textColor = colors.textPrimary;

                if (isSelected) {
                  pillBg = colors.card;
                  pillBorder = colors.accent;
                  textColor = colors.textPrimary;
                }

                if (isUnavailable && !isSelected) {
                  textColor = colors.outOfStock;
                }

                return (
                  <TouchableOpacity
                    key={val}
                    onPress={() => onSelectOption(option.name, val)}
                    style={[
                      styles.valuePill,
                      {
                        backgroundColor: pillBg,
                        borderColor: pillBorder,
                        borderRadius: radii.sm,
                      },
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={`${option.name} ${val}${isUnavailable ? ' out of stock' : ''}`}
                  >
                    <Text
                      style={[
                        styles.valueText,
                        {
                          color: textColor,
                          fontWeight: isSelected ? '700' : '500',
                          textDecorationLine: isUnavailable ? 'line-through' : 'none',
                        },
                      ]}
                    >
                      {val}
                    </Text>
                    {isUnavailable && (
                      <Text style={[styles.soldOutSmall, { color: colors.error }]}>OOS</Text>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        );
      })}

      {/* STATUS BANNER FOR CURRENT ACTIVE SELECTION */}
      {activeVariant && !activeVariant.availableForSale && (
        <View
          style={[
            styles.outOfStockNotice,
            { backgroundColor: colors.surface, borderColor: colors.error },
          ]}
        >
          <Text style={styles.noticeIcon}>🚫</Text>
          <View style={styles.noticeTextContainer}>
            <Text style={[styles.noticeTitle, { color: colors.error }]}>
              Selected Variant Out of Stock
            </Text>
            <Text style={[styles.noticeDesc, { color: colors.textSecondary }]}>
              {activeVariant.title} is currently unavailable. Please select another size or color.
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  optionSection: {
    marginBottom: 14,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  optionName: {
    fontSize: 13,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  optionSelectedVal: {
    fontSize: 13,
    fontWeight: '600',
  },
  valuesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  valuePill: {
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderWidth: 1.5,
    minWidth: 44,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 4,
  },
  valueText: {
    fontSize: 13,
  },
  soldOutSmall: {
    fontSize: 9,
    fontWeight: '800',
  },
  outOfStockNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 8,
    gap: 10,
  },
  noticeIcon: {
    fontSize: 20,
  },
  noticeTextContainer: {
    flex: 1,
  },
  noticeTitle: {
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 2,
  },
  noticeDesc: {
    fontSize: 11,
    lineHeight: 15,
  },
});

