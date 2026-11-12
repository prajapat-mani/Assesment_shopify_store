import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../../context/StoreContext';
import { StoreId } from '../../types/tenant';
import { MerchantOnboardingModal } from '../merchant/MerchantOnboardingModal';

interface StoreSwitcherModalProps {
  visible: boolean;
  onClose: () => void;
  onRefreshData?: (targetStoreId?: StoreId) => void;
}

export const StoreSwitcherModal: React.FC<StoreSwitcherModalProps> = ({
  visible,
  onClose,
  onRefreshData,
}) => {
  const { storeId, config, switchStore, availableStores } = useStore();
  const { colors, radii } = config.theme;
  const insets = useSafeAreaInsets();
  const [onboardingOpen, setOnboardingOpen] = useState(false);

  const handleSelectStore = async (newId: StoreId) => {
    if (newId !== storeId) {
      onClose();
      await switchStore(newId);
      if (onRefreshData) onRefreshData(newId);
    }
  };

  const handleOnboardingSuccess = async (newStoreId: string) => {
    setOnboardingOpen(false);
    onClose();
    if (onRefreshData) onRefreshData(newStoreId);
  };

  return (
    <>
      <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View
            style={[
              styles.overlay,
              {
                paddingTop: Math.max(insets.top + 12, 20),
                paddingBottom: Math.max(insets.bottom + 12, 20),
              },
            ]}
          >
            <TouchableWithoutFeedback>
              <View
                style={[
                  styles.modalCard,
                  { backgroundColor: colors.surface, borderColor: colors.border, borderRadius: radii.lg },
                ]}
              >
                <View style={styles.headerRow}>
                  <Text style={[styles.title, { color: colors.textPrimary }]}>
                    Select Store
                  </Text>
                  <TouchableOpacity onPress={onClose} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
                    <Text style={[styles.closeText, { color: colors.textSecondary }]}>✕</Text>
                  </TouchableOpacity>
                </View>

                <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
                  Switch between active brand storefronts or onboard a new merchant store.
                </Text>

                <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 340 }}>
                  {availableStores.map((item) => {
                    const isActive = storeId === item.id;
                    const icon = item.id === 'gymshark' ? '⚡' : item.id === 'aura_wellness' ? '🌿' : '🏢';

                    return (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => handleSelectStore(item.id)}
                        activeOpacity={0.85}
                        style={[
                          styles.storeOption,
                          {
                            borderColor: isActive ? colors.accent : colors.border,
                            backgroundColor: isActive ? colors.card : 'transparent',
                            borderRadius: radii.md,
                          },
                        ]}
                      >
                        <View style={styles.optionHeader}>
                          <Text style={[styles.storeName, { color: colors.textPrimary }]}>
                            {icon} {item.name}
                          </Text>
                          {isActive && (
                            <View style={[styles.activePill, { backgroundColor: colors.accent }]}>
                              <Text style={styles.activePillText}>Active</Text>
                            </View>
                          )}
                        </View>
                        <Text style={[styles.storeDesc, { color: colors.textSecondary }]}>
                          {item.tagline}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>

                {/* MERCHANT ONBOARDING ACTION */}
                <TouchableOpacity
                  activeOpacity={0.85}
                  onPress={() => setOnboardingOpen(true)}
                  style={[styles.onboardBtn, { borderColor: colors.border, backgroundColor: colors.background }]}
                >
                  <View style={styles.onboardRow}>
                    <Text style={styles.onboardIcon}>🏢</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.onboardTitle, { color: colors.textPrimary }]}>
                        Merchant Onboarding Hub
                      </Text>
                      <Text style={[styles.onboardSub, { color: colors.textSecondary }]}>
                        Shopify OAuth, Scopes & Credential Handling
                      </Text>
                    </View>
                    <Text style={[styles.onboardPlus, { color: colors.accent }]}>+ Onboard</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>

      <MerchantOnboardingModal
        visible={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        onSuccess={handleOnboardingSuccess}
      />
    </>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.65)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalCard: {
    width: '100%',
    maxWidth: 420,
    padding: 22,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  closeText: {
    fontSize: 18,
    fontWeight: '700',
    padding: 4,
  },
  subtitle: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 16,
  },
  storeOption: {
    padding: 14,
    borderWidth: 2,
    marginBottom: 10,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 4,
  },
  storeName: {
    fontSize: 15,
    fontWeight: '800',
  },
  activePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  activePillText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  storeDesc: {
    fontSize: 11,
    lineHeight: 15,
  },
  onboardBtn: {
    marginTop: 12,
    borderWidth: 1.5,
    borderRadius: 12,
    padding: 12,
  },
  onboardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  onboardIcon: {
    fontSize: 22,
  },
  onboardTitle: {
    fontSize: 13,
    fontWeight: '800',
  },
  onboardSub: {
    fontSize: 10,
    fontWeight: '500',
    marginTop: 1,
  },
  onboardPlus: {
    fontSize: 12,
    fontWeight: '800',
  },
});
