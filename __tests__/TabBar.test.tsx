import React from 'react';
import { act, create, type ReactTestRenderer } from 'react-test-renderer';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { renderTabBar, TabBar } from '../src/navigation/TabBar';

jest.mock('react-native-safe-area-context', () => ({
  useSafeAreaInsets: () => ({ top: 0, right: 0, bottom: 34, left: 0 }),
}));
jest.mock('../src/components/Icon', () => ({ Icon: () => null }));

test('navigation can call the tab renderer outside React and mount its result', async () => {
  const navigate = jest.fn();
  const emit = jest.fn().mockReturnValue({ defaultPrevented: false });
  const props = {
    state: {
      index: 0,
      routes: [
        { key: 'articles', name: 'Articles' },
        { key: 'gallery', name: 'Gallery' },
      ],
    },
    navigation: { navigate, emit },
    descriptors: {},
    insets: { top: 0, right: 0, bottom: 34, left: 0 },
  } as unknown as BottomTabBarProps;
  const element = renderTabBar(props);
  expect(React.isValidElement(element)).toBe(true);
  expect(element.type).toBe(TabBar);
  let root: ReactTestRenderer | undefined;
  try {
    await act(() => {
      root = create(element);
    });
    const tabs = root!.root.findAll(
      node =>
        typeof node.props.onPress === 'function' && node.props.accessibilityRole === 'tab',
    );
    expect(tabs).toHaveLength(2);
    expect(tabs[0].props.accessibilityState.selected).toBe(true);
    await act(() => tabs[1].props.onPress());
    expect(navigate).toHaveBeenCalledWith('Gallery');
    emit.mockReturnValue({ defaultPrevented: true });
    navigate.mockClear();
    await act(() => tabs[1].props.onPress());
    expect(navigate).not.toHaveBeenCalled();
  } finally {
    await act(() => root?.unmount());
  }
});
