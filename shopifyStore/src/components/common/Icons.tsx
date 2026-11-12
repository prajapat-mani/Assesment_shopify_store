import React from 'react';
import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  size?: number;
  color?: string;
}

interface HeartIconProps extends IconProps {
  filled?: boolean;
  fillColor?: string;
  strokeWidth?: number;
}

/**
 * Standard, sleek, high-end e-commerce outline heart icon.
 * Based on the universal Feather/Lucide geometry for balanced lobes and clean point.
 */
export const HeartIcon: React.FC<HeartIconProps> = ({
  size = 20,
  color = '#111111',
  filled = false,
  fillColor = '#111111',
  strokeWidth = 1.5,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      fill={filled ? fillColor : 'none'}
      stroke={filled ? fillColor : color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * Standard chevron left icon with geometrically centered path.
 */
export const ChevronLeftIcon: React.FC<IconProps & { strokeWidth?: number }> = ({
  size = 16,
  color = '#111111',
  strokeWidth = 2.2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 18l-6-6 6-6"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * Standard chevron right icon with geometrically centered path.
 */
export const ChevronRightIcon: React.FC<IconProps & { strokeWidth?: number }> = ({
  size = 16,
  color = '#111111',
  strokeWidth = 2.2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M9 6l6 6-6 6"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * Sleek, modern back arrow icon.
 */
export const BackArrowIcon: React.FC<IconProps & { strokeWidth?: number }> = ({
  size = 22,
  color = '#111111',
  strokeWidth = 2,
}) => (
  <View pointerEvents="none">
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M19 12H5M12 19l-7-7 7-7"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  </View>
);

/**
 * Alternative back chevron for iOS-style clean back navigation.
 */
export const BackChevronIcon: React.FC<IconProps & { strokeWidth?: number }> = ({
  size = 22,
  color = '#111111',
  strokeWidth = 2.2,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M15 19l-7-7 7-7"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * Elegant botanical leaf emblem for Aura Wellness.
 * Lucide-style organic geometry.
 */
export const BotanicalLeafIcon: React.FC<IconProps & { strokeWidth?: number; filled?: boolean }> = ({
  size = 20,
  color = '#1E3A2B',
  strokeWidth = 1.8,
  filled = false,
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
      stroke={color}
      strokeWidth={strokeWidth}
      fill={filled ? color : 'none'}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

/**
 * Athletic sharp mark for Gymshark.
 */
export const SharkMarkIcon: React.FC<IconProps> = ({
  size = 20,
  color = '#111111',
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2L4.5 8.5L7 19L12 22L17 19L19.5 8.5L12 2Z"
      fill={color}
    />
    <Path
      d="M12 5.5L8 10.5H16L12 5.5Z"
      fill="#FFFFFF"
    />
  </Svg>
);
