import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  StatusBar,
  Platform,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/common/Button';
import { BrandLogo } from '../components/common/BrandLogo';

interface WelcomeScreenProps {
  onContinue: () => void;
  onSkip: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue, onSkip }) => {
  const { config, storeId } = useStore();
  const { colors } = config.theme;
  const insets = useSafeAreaInsets();
  const isGymshark = storeId === 'gymshark';

  // Horizontal floating / nudging animation like an ad skip cue
  const translateX = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (Platform.OS === 'android') {
      (StatusBar as any).setBackgroundColor?.('transparent', true);
      (StatusBar as any).setTranslucent?.(true);
    }

    // Smooth horizontal nudge loop (0px -> 6px -> 0px)
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(translateX, {
          toValue: 6,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(translateX, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [translateX]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={{ uri: config.welcomeImage }}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <View
          style={[
            styles.scrim,
            {
              paddingTop: Math.max(insets.top + 16, 44),
              paddingBottom: Math.max(insets.bottom + 16, 32),
            },
          ]}
        >
          {/* TOP SECTION: BADGE ON LEFT + ANIMATED HORIZONTAL SKIP PILL ON RIGHT */}
          <View style={styles.topSection}>
            <View style={[styles.badge, { backgroundColor: colors.accent }]}>
              <Text style={styles.badgeText}>{config.badgeText}</Text>
            </View>

            <Animated.View style={{ transform: [{ translateX }] }}>
              <TouchableOpacity
                onPress={onSkip}
                activeOpacity={0.8}
                hitSlop={{ top: 14, bottom: 14, left: 14, right: 14 }}
                style={styles.topSkipPill}
                accessibilityRole="button"
                accessibilityLabel="Skip to shop"
              >
                <Text style={styles.topSkipText}>SKIP</Text>
                {/* <Text style={styles.topSkipArrow}>{'→'}</Text> */}
              </TouchableOpacity>
            </Animated.View>
          </View>

          {/* BOTTOM SECTION: BRAND LOGO + TAGLINE + MAIN CTA */}
          <View style={styles.bottomSection}>
            <View style={{ alignItems: 'flex-start', marginBottom: 14 }}>
              <BrandLogo size="large" color="#FFFFFF" />
            </View>

            <Text style={styles.tagline}>{config.tagline}</Text>

            <View style={styles.actions}>
              <Button
                title={isGymshark ? 'Explore Collection' : 'Shop Collection'}
                onPress={onContinue}
                variant="primary"
                style={styles.mainButton}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  scrim: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    justifyContent: 'space-between',
    padding: 24,
    paddingTop: 54,
    paddingBottom: 40,
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  topSkipPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(0, 0, 0, 0.55)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.35)',
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 3,
  },
  topSkipText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  topSkipArrow: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  bottomSection: {
    gap: 12,
  },
  tagline: {
    color: '#E0E0E0',
    fontSize: 14,
    fontWeight: '600',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  actions: {
    gap: 10,
  },
  mainButton: {
    width: '100%',
    height: 52,
  },
});
