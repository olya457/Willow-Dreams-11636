import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useReducedMotion } from '../hooks/useMotionPreference';
import { colors, fonts, goldGradient } from '../theme/theme';

export function Progress({
  step,
  total = 4,
}: {
  step: number;
  total?: number;
}) {
  const reduced = useReducedMotion();
  const value = useRef(new Animated.Value(step / total)).current;
  useEffect(() => {
    const animation = Animated.timing(value, {
      toValue: step / total,
      duration: reduced ? 0 : 280,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
      isInteraction: false,
    });
    animation.start();
    return () => animation.stop();
  }, [value, step, total, reduced]);
  return (
    <View
      accessible
      accessibilityLabel={`Step ${step} of ${total}`}
      style={styles.wrap}
    >
      <Text style={styles.label}>
        {step}/{total}
      </Text>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.progress,
            {
              width: value.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        >
          <LinearGradient
            colors={goldGradient}
            style={StyleSheet.absoluteFill}
          />
        </Animated.View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  wrap: { gap: 10 },
  label: { fontFamily: fonts.body, color: colors.gold, fontSize: 14 },
  track: { height: 4, backgroundColor: colors.surface },
  progress: { height: 4 },
});
