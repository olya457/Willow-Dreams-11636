import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme/theme';

export function Choice({
  label,
  selected,
  onPress,
  radio = true,
  disabled = false,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
  radio?: boolean;
  disabled?: boolean;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ checked: selected, disabled }}
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.option,
        selected && styles.selected,
        pressed && styles.pressed,
      ]}
    >
      <Text style={[styles.text, selected && styles.gold]}>{label}</Text>
      {radio && <View style={[styles.radio, selected && styles.checked]} />}
    </Pressable>
  );
}
const styles = StyleSheet.create({
  option: {
    minHeight: 54,
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: colors.surface,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'transparent',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  selected: { borderColor: colors.accent },
  pressed: { opacity: 0.8 },
  text: { fontFamily: fonts.body, fontSize: 16, color: colors.text, flex: 1 },
  gold: { color: colors.accent },
  radio: {
    width: 15,
    height: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  checked: { backgroundColor: colors.accent, borderColor: colors.accent },
});
