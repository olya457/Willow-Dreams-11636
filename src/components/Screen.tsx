import React, { useEffect, useRef } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Reveal } from './Reveal';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';
import { colors } from '../theme/theme';

export function Screen({
  children,
  scroll = true,
  bottom = false,
  contentStyle,
  keyboard = false,
  transitionKey,
}: {
  children: React.ReactNode;
  scroll?: boolean;
  bottom?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
  keyboard?: boolean;
  transitionKey?: string | number;
}) {
  const scrollRef = useRef<ScrollView>(null);
  useEffect(() => {
    if (transitionKey !== undefined) {
      scrollRef.current?.scrollTo({ y: 0, animated: false });
    }
  }, [transitionKey]);
  const { gutter, compact } = useResponsiveLayout();
  const responsiveStyle = {
    paddingHorizontal: gutter,
    paddingTop: compact ? 8 : 14,
    gap: compact ? 14 : 18,
  };
  const content = scroll ? (
    <ScrollView
      ref={scrollRef}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.content, contentStyle, responsiveStyle]}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.content, styles.fill, contentStyle, responsiveStyle]}>
      {children}
    </View>
  );
  return (
    <SafeAreaView
      style={styles.safe}
      edges={
        bottom ? ['top', 'left', 'right', 'bottom'] : ['top', 'left', 'right']
      }
    >
      <KeyboardAvoidingView
        style={styles.fill}
        enabled={keyboard}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <Reveal replayKey={transitionKey} style={styles.fill}>
          {content}
        </Reveal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  fill: { flex: 1 },
  content: {
    flexGrow: 1,
    width: '100%',
    maxWidth: 620,
    alignSelf: 'center',
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 24,
    gap: 18,
  },
});
