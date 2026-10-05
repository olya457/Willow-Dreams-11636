import React from 'react';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  type NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { renderTabBar } from './TabBar';
import { LibraryScreen } from '../screens/LibraryScreen';
import { ArticleDetailScreen } from '../screens/ArticleDetailScreen';
import { ProjectDetailScreen } from '../screens/ProjectDetailScreen';
import { PatternsScreen } from '../screens/PatternsScreen';
import { FinderScreen } from '../screens/FinderScreen';
import { ToolsScreen } from '../screens/ToolsScreen';
import { GalleryScreen } from '../screens/GalleryScreen';
import { GalleryFormScreen } from '../screens/GalleryFormScreen';
import { OnboardingScreen } from '../screens/OnboardingScreen';
import { colors, fonts } from '../theme/theme';
import { useAppData } from '../storage/AppProvider';
import type {
  FinderStackParams,
  GalleryStackParams,
  LibraryStackParams,
  TabParams,
} from './types';

const LibraryStack = createNativeStackNavigator<LibraryStackParams>();
const FinderStack = createNativeStackNavigator<FinderStackParams>();
const GalleryStack = createNativeStackNavigator<GalleryStackParams>();
const Tabs = createBottomTabNavigator<TabParams>();
const Root = createNativeStackNavigator<{
  Onboarding: undefined;
  Main: undefined;
}>();
const stackOptions = {
  headerShown: false,
  contentStyle: { backgroundColor: colors.background },
};
function ArticlesHome(
  props: NativeStackScreenProps<LibraryStackParams, 'Library'>,
) {
  return <LibraryScreen {...props} kind="Articles" />;
}
function ProjectsHome(
  props: NativeStackScreenProps<LibraryStackParams, 'Library'>,
) {
  return <LibraryScreen {...props} kind="Projects" />;
}
function ArticlesNavigator() {
  return (
    <LibraryStack.Navigator screenOptions={stackOptions}>
      <LibraryStack.Screen name="Library" component={ArticlesHome} />
      <LibraryStack.Screen
        name="ArticleDetail"
        component={ArticleDetailScreen}
      />
    </LibraryStack.Navigator>
  );
}
function ProjectsNavigator() {
  return (
    <LibraryStack.Navigator screenOptions={stackOptions}>
      <LibraryStack.Screen name="Library" component={ProjectsHome} />
      <LibraryStack.Screen
        name="ProjectDetail"
        component={ProjectDetailScreen}
      />
    </LibraryStack.Navigator>
  );
}
function FinderNavigator() {
  return (
    <FinderStack.Navigator screenOptions={stackOptions}>
      <FinderStack.Screen name="Finder" component={FinderScreen} />
      <FinderStack.Screen
        name="ProjectDetail"
        component={ProjectDetailScreen}
      />
    </FinderStack.Navigator>
  );
}
function GalleryNavigator() {
  return (
    <GalleryStack.Navigator screenOptions={stackOptions}>
      <GalleryStack.Screen name="Gallery" component={GalleryScreen} />
      <GalleryStack.Screen name="GalleryForm" component={GalleryFormScreen} />
    </GalleryStack.Navigator>
  );
}
function MainNavigator() {
  return (
    <Tabs.Navigator
      tabBar={renderTabBar}
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background },
        animation: 'none',
      }}
    >
      <Tabs.Screen name="Articles" component={ArticlesNavigator} />
      <Tabs.Screen name="Patterns" component={PatternsScreen} />
      <Tabs.Screen name="Projects" component={ProjectsNavigator} />
      <Tabs.Screen name="Finder" component={FinderNavigator} />
      <Tabs.Screen name="Tools" component={ToolsScreen} />
      <Tabs.Screen name="Gallery" component={GalleryNavigator} />
    </Tabs.Navigator>
  );
}
const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.background,
    primary: colors.gold,
    text: colors.text,
    border: colors.divider,
  },
  fonts: {
    ...DarkTheme.fonts,
    regular: { fontFamily: fonts.body, fontWeight: '400' as const },
  },
};
export function AppNavigator() {
  const { data } = useAppData();
  return (
    <NavigationContainer theme={navigationTheme}>
      <Root.Navigator screenOptions={stackOptions}>
        {data.onboarded ? (
          <Root.Screen name="Main" component={MainNavigator} />
        ) : (
          <Root.Screen name="Onboarding" component={OnboardingScreen} />
        )}
      </Root.Navigator>
    </NavigationContainer>
  );
}
