import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../theme/theme';

export function SegmentedControl({
  items,
  selected,
  onChange,
}: {
  items: string[];
  selected: number;
  onChange: (index: number) => void;
}) {
  return (
    <View style={styles.row} accessibilityRole="tablist">
      {items.map((item, index) => (
        <Pressable
          key={item}
          accessibilityRole="tab"
          accessibilityState={{ selected: selected === index }}
          onPress={() => onChange(index)}
          style={[styles.tab, selected === index && styles.active]}
        >
          <Text style={[styles.label, selected === index && styles.selected]}>
            {item}
          </Text>
        </Pressable>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  tab: {
    flex: 1,
    minHeight: 48,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  active: { borderBottomColor: colors.accent },
  label: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
  },
  selected: { color: colors.accent },
});
