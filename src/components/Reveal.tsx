import React, { useContext, useEffect, useRef, useState } from 'react';
import { Animated, Easing, type ViewProps } from 'react-native';
import { NavigationContext } from '@react-navigation/native';
import { useReducedMotion } from '../hooks/useMotionPreference';

type Props = ViewProps & {
  replayKey?: string | number;
  delay?: number;
  direction?: 'up' | 'left' | 'right';
};

export function Reveal({
  children,
  style,
  replayKey,
  delay = 0,
  direction = 'up',
  ...props
}: Props) {
  const reduced = useReducedMotion();
  const navigation = useContext(NavigationContext);
  const [focused, setFocused] = useState(() => navigation?.isFocused() ?? true);
  const progress = useRef(new Animated.Value(1)).current;
  useEffect(() => {
    if (!navigation) {
      return;
    }
    const focus = navigation.addListener('focus', () => setFocused(true));
    const blur = navigation.addListener('blur', () => setFocused(false));
    return () => {
      focus();
      blur();
    };
  }, [navigation]);
  useEffect(() => {
    if (reduced || !focused) {
      progress.setValue(1);
      return;
    }
    progress.setValue(0);
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration: 300,
      delay: Math.min(delay, 180),
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
      isInteraction: false,
    });
    animation.start();
    return () => animation.stop();
  }, [progress, reduced, focused, replayKey, delay, direction]);
  const distance = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [direction === 'left' ? -14 : 14, 0],
  });
  return (
    <Animated.View
      {...props}
      style={[
        style,
        {
          opacity: progress,
          transform:
            direction === 'up'
              ? [{ translateY: distance }]
              : [{ translateX: distance }],
        },
      ]}
    >
      {children}
    </Animated.View>
  );
}
