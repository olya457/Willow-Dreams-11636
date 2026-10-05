import React from 'react';
import { StyleSheet, Text, type TextProps } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from 'react-native-linear-gradient';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';
import { fonts, titleGradient } from '../theme/theme';

export function GradientText({ children, style, ...props }: TextProps) {
  const { compact } = useResponsiveLayout();
  const resolved = StyleSheet.flatten([styles.text, style]);
  const textStyle = [
    resolved,
    compact && {
      fontSize: Math.max(18, (resolved.fontSize ?? 27) * 0.9),
      lineHeight: Math.max(24, (resolved.lineHeight ?? 34) * 0.9),
    },
  ];
  return (
    <MaskedView
      accessible
      accessibilityRole="header"
      accessibilityLabel={typeof children === 'string' ? children : undefined}
      maskElement={
        <Text {...props} style={[textStyle, styles.mask]}>
          {children}
        </Text>
      }
    >
      <LinearGradient
        colors={titleGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text {...props} style={[textStyle, styles.hidden]} accessible={false}>
          {children}
        </Text>
      </LinearGradient>
    </MaskedView>
  );
}
const styles = StyleSheet.create({
  text: { fontFamily: fonts.heading, fontSize: 27, lineHeight: 34 },
  mask: { color: '#000' },
  hidden: { opacity: 0 },
});
