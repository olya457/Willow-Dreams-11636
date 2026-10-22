import React, { useCallback, useEffect, useRef } from 'react';
import { Text, StyleSheet, useWindowDimensions, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Reveal } from '../components/Reveal';
import { useReducedMotion } from '../hooks/useMotionPreference';
import LinearGradient from 'react-native-linear-gradient';
import { GradientText } from '../components/GradientText';
import { backgroundGradient, colors, fonts } from '../theme/theme';

const animation = `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1"><style>html,body{margin:0;background:transparent;overflow:hidden;height:100%;display:grid;place-items:center}.ring{width:62px;height:62px;border:3px solid transparent;border-top-color:${colors.accent};border-right-color:${colors.accent};border-radius:50%;animation:spin 1s linear 4}@keyframes spin{to{transform:rotate(360deg)}}</style></head><body><div class="ring"></div><script>document.querySelector('.ring').addEventListener('animationend',function(){window.ReactNativeWebView.postMessage('finished')});</script></body></html>`;
export function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const reduced = useReducedMotion();
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const finished = useRef(false);
  const finish = useCallback(() => {
    if (!finished.current) {
      finished.current = true;
      onFinish();
    }
  }, [onFinish]);
  const fallback = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    fallback.current = setTimeout(finish, 5500);
    return () => {
      if (fallback.current) {
        clearTimeout(fallback.current);
      }
    };
  }, [finish]);
  return (
    <LinearGradient
      colors={backgroundGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.background}
    >
      <Reveal
        style={[
          styles.logo,
          {
            top: Math.max(insets.top + 24, height * 0.225),
            width: Math.min(width - 48, 440),
          },
        ]}
      >
        <GradientText style={styles.title}>Willow Craft Studio</GradientText>
        <Text style={styles.subtitle}>Create something beautiful by hand.</Text>
      </Reveal>
      <View
        style={[styles.spinner, { bottom: insets.bottom + 12 }]}
        pointerEvents="none"
      >
        <WebView
          originWhitelist={['*']}
          source={{
            html: reduced
              ? animation
                  .replace('animation:spin 1s linear 4', 'animation:none')
                  .replace(
                    "document.querySelector('.ring').addEventListener('animationend',function(){window.ReactNativeWebView.postMessage('finished')});",
                    "setTimeout(function(){window.ReactNativeWebView.postMessage('finished')},4000);",
                  )
              : animation,
          }}
          style={styles.webview}
          scrollEnabled={false}
          javaScriptEnabled
          onMessage={event => {
            if (event.nativeEvent.data === 'finished') {
              finish();
            }
          }}
          onLoadEnd={() => {
            if (fallback.current) {
              clearTimeout(fallback.current);
            }
            fallback.current = setTimeout(finish, 4200);
          }}
          onError={() => {
            if (fallback.current) {
              clearTimeout(fallback.current);
            }
            fallback.current = setTimeout(finish, 4000);
          }}
          onShouldStartLoadWithRequest={request =>
            request.url === 'about:blank'
          }
        />
      </View>
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.background,
  },
  logo: { position: 'absolute', alignItems: 'center', gap: 20 },
  title: { fontSize: 48, lineHeight: 56, textAlign: 'center' },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 24,
    color: colors.muted,
    textAlign: 'center',
  },
  spinner: { position: 'absolute', width: 84, height: 84 },
  webview: { backgroundColor: 'transparent', opacity: 0.99 },
});
