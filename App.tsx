import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StatusBar, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppProvider, useAppData } from './src/storage/AppProvider';
import { AppNavigator } from './src/navigation/AppNavigator';
import { SplashScreen } from './src/screens/SplashScreen';
import { Screen } from './src/components/Screen';
import { GradientText } from './src/components/GradientText';
import { Button } from './src/components/Button';
import { MotionProvider } from './src/hooks/useMotionPreference';
import { colors, layout } from './src/theme/theme';

function AppContent() {
  const [splashDone, setSplashDone] = useState(false);
  const { ready, error, retry } = useAppData();
  const finishSplash = useCallback(() => setSplashDone(true), []);
  if (!splashDone) {
    return <SplashScreen onFinish={finishSplash} />;
  }
  if (error) {
    return (
      <Screen bottom>
        <GradientText>Unable to load your data</GradientText>
        <Text style={layout.body}>{error}</Text>
        <Button title="Try again" onPress={retry} />
      </Screen>
    );
  }
  if (!ready) {
    return (
      <Screen>
        <ActivityIndicator
          color={colors.gold}
          accessibilityLabel="Loading saved data"
        />
      </Screen>
    );
  }
  return <AppNavigator />;
}
export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle="light-content" />
      <AppProvider>
        <MotionProvider>
          <AppContent />
        </MotionProvider>
      </AppProvider>
    </SafeAreaProvider>
  );
}
