import React, { useEffect, useState } from 'react';
import { Keyboard, Pressable, StyleSheet } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, type IconName } from '../components/Icon';
import LinearGradient from 'react-native-linear-gradient';
import { backgroundGradient, colors } from '../theme/theme';

const icons: Record<string, IconName> = {
  Articles: 'articles',
  Patterns: 'patterns',
  Projects: 'projects',
  Finder: 'quiz',
  Tools: 'tools',
  Gallery: 'gallery',
};
const labels: Record<string, string> = {
  Articles: 'Articles',
  Patterns: 'Weaving patterns',
  Projects: 'Projects',
  Finder: 'Find your project',
  Tools: 'Tools',
  Gallery: 'My gallery',
};
export function TabBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const [keyboard, setKeyboard] = useState(false);
  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', () =>
      setKeyboard(true),
    );
    const hide = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboard(false),
    );
    return () => {
      show.remove();
      hide.remove();
    };
  }, []);
  if (keyboard) {
    return null;
  }
  return (
    <LinearGradient
      colors={backgroundGradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[
        styles.bar,
        {
          paddingBottom: Math.max(12, insets.bottom),
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const selected = state.index === index;
        return (
          <Pressable
            key={route.key}
            accessibilityRole="tab"
            accessibilityLabel={labels[route.name]}
            accessibilityState={{ selected }}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!selected && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            }}
            onLongPress={() =>
              navigation.emit({ type: 'tabLongPress', target: route.key })
            }
            style={[styles.tab, selected && styles.active]}
          >
            <Icon
              name={icons[route.name]}
              color={selected ? colors.accent : colors.text}
              size={22}
            />
          </Pressable>
        );
      })}
    </LinearGradient>
  );
}

export function renderTabBar(props: BottomTabBarProps) {
  return <TabBar {...props} />;
}

const styles = StyleSheet.create({
  bar: {
    flexDirection: 'row',
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.divider,
  },
  tab: {
    flex: 1,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: 2,
    borderTopColor: 'transparent',
    marginTop: -1,
  },
  active: { borderTopColor: colors.accent },
});
