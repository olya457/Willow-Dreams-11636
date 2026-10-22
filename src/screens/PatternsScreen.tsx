import React, { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { GradientText } from '../components/GradientText';
import { Icon } from '../components/Icon';
import { patterns } from '../data/patterns';
import { colors, layout } from '../theme/theme';

export function PatternsScreen() {
  const [index, setIndex] = useState(0);
  const pattern = patterns[index];
  return (
    <Screen transitionKey={index}>
      <GradientText>Weaving Patterns</GradientText>
      <View style={styles.carousel}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Previous weaving pattern"
          onPress={() =>
            setIndex((index + patterns.length - 1) % patterns.length)
          }
          style={styles.arrow}
        >
          <Icon name="left" color={colors.accent} size={20} />
        </Pressable>
        <Image
          accessibilityLabel={pattern.title}
          source={pattern.image}
          style={styles.image}
          resizeMode="contain"
        />
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Next weaving pattern"
          onPress={() => setIndex((index + 1) % patterns.length)}
          style={styles.arrow}
        >
          <Icon name="right" color={colors.accent} size={20} />
        </Pressable>
      </View>
      <View style={styles.description} accessibilityLiveRegion="polite">
        <GradientText style={styles.title}>{pattern.title}</GradientText>
        <Text style={layout.body}>{pattern.description}</Text>
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  carousel: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  arrow: {
    width: 44,
    minHeight: 44,
    backgroundColor: colors.surface,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: { flex: 1, width: undefined, height: undefined, aspectRatio: 1 },
  description: { gap: 12, marginTop: 8 },
  title: { fontSize: 26, lineHeight: 33 },
});
