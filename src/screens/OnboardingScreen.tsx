import React, { useState } from 'react';
import {
  Alert,
  BackHandler,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useResponsiveLayout } from '../hooks/useResponsiveLayout';
import { Screen } from '../components/Screen';
import { GradientText } from '../components/GradientText';
import { Button } from '../components/Button';
import { Progress } from '../components/Progress';
import { onboarding } from '../data/onboarding';
import { images } from '../data/images';
import { layout } from '../theme/theme';
import { useAppData } from '../storage/AppProvider';

export function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [busy, setBusy] = useState(false);
  const { contentWidth, height, compact } = useResponsiveLayout();
  const { update } = useAppData();
  const page = onboarding[step];
  useFocusEffect(
    React.useCallback(() => {
      const listener = BackHandler.addEventListener('hardwareBackPress', () => {
        if (step > 0) {
          setStep(value => value - 1);
          return true;
        }
        return false;
      });
      return () => listener.remove();
    }, [step]),
  );
  async function next() {
    if (step < 3) {
      setStep(step + 1);
      return;
    }
    setBusy(true);
    try {
      await update(state => ({ ...state, onboarded: true }));
    } catch {
      Alert.alert(
        'Unable to continue',
        'Please try again. Your onboarding progress could not be saved.',
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <Screen
      bottom
      transitionKey={step}
      contentStyle={[styles.content, compact && styles.compactContent]}
    >
      <Progress step={step + 1} />
      <Image
        source={images.onboarding[step]}
        style={[
          styles.image,
          {
            height: Math.min(
              contentWidth,
              height * (compact ? 0.34 : 0.42),
              410,
            ),
          },
        ]}
        resizeMode="cover"
      />
      <View style={styles.copy}>
        <GradientText style={styles.title}>{page.title}</GradientText>
        <Text style={layout.body}>{page.text}</Text>
      </View>
      <View style={styles.footer}>
        <Button
          title="Continue"
          busy={busy}
          onPress={() => {
            void next();
          }}
        />
      </View>
    </Screen>
  );
}
const styles = StyleSheet.create({
  content: { paddingHorizontal: 24, gap: 28, paddingBottom: 24 },
  compactContent: { gap: 18, paddingBottom: 16 },
  image: { width: '100%', marginTop: 2 },
  copy: { gap: 14 },
  title: { fontSize: 34, lineHeight: 38 },
  footer: {
    flexGrow: 1,
    flexShrink: 0,
    justifyContent: 'flex-end',
    minHeight: 86,
    paddingTop: 12,
  },
});
