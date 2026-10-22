import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { colors, fonts, accentGradient } from '../theme/theme';

type Props = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger';
  disabled?: boolean;
  busy?: boolean;
  compact?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityLabel?: string;
  testID?: string;
};
export function Button({
  title,
  onPress,
  variant = 'primary',
  disabled,
  busy,
  compact,
  style,
  accessibilityLabel,
  testID,
}: Props) {
  const blocked = disabled || busy;
  const content = busy ? (
    <ActivityIndicator
      color={variant === 'primary' ? colors.ink : colors.accent}
    />
  ) : (
    <Text
      style={[
        styles.text,
        variant === 'primary' && styles.dark,
        variant === 'outline' && styles.gold,
        variant === 'danger' && styles.danger,
      ]}
    >
      {title}
    </Text>
  );
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityState={{ disabled: !!blocked, busy: !!busy }}
      disabled={blocked}
      onPress={onPress}
      style={({ pressed }) => [
        styles.base,
        compact && styles.compact,
        variant === 'secondary' && styles.secondary,
        variant === 'outline' && styles.outline,
        blocked && styles.disabled,
        pressed && styles.pressed,
        style,
      ]}
    >
      {variant === 'primary' ? (
        <LinearGradient
          colors={accentGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
        />
      ) : null}
      {content}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  base: {
    minHeight: 54,
    flexShrink: 0,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  compact: { minHeight: 44, paddingHorizontal: 10, paddingVertical: 10 },
  text: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 22,
    color: colors.text,
    textAlign: 'center',
    flexShrink: 1,
  },
  dark: { color: colors.ink },
  gold: { color: colors.accent },
  danger: { color: colors.danger },
  secondary: { backgroundColor: colors.surface },
  outline: { borderColor: colors.accent, borderWidth: 1 },
  disabled: { opacity: 0.45 },
  pressed: { opacity: 0.78 },
});
