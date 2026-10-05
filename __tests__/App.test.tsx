import React from 'react';
import { Text } from 'react-native';
import { act, create, type ReactTestRenderer } from 'react-test-renderer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppProvider, useAppData } from '../src/storage/AppProvider';
import { emptyData, STORAGE_KEY } from '../src/storage/store';

let api: ReturnType<typeof useAppData>;
function Probe() {
  api = useAppData();
  return <Text>{api.ready ? 'ready' : api.error || 'loading'}</Text>;
}
let root: ReactTestRenderer;
beforeEach(() => {
  jest.clearAllMocks();
  (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
  (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
});
afterEach(async () => {
  await act(() => root?.unmount());
});
async function mount() {
  await act(async () => {
    root = create(
      <AppProvider>
        <Probe />
      </AppProvider>,
    );
  });
}

test('starts with an empty gallery and no favorites', async () => {
  await mount();
  expect(api.ready).toBe(true);
  expect(api.data.gallery).toEqual([]);
  expect(api.data.favoriteArticles).toEqual([]);
  expect(AsyncStorage.setItem).not.toHaveBeenCalled();
});
test('restores user data without replacing it with defaults', async () => {
  const saved = {
    ...emptyData,
    onboarded: true,
    favoriteArticles: ['choosing-willow-rods'],
  };
  (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(saved));
  await mount();
  expect(api.data).toEqual(saved);
  expect(AsyncStorage.setItem).not.toHaveBeenCalled();
});
test('serializes concurrent writes without losing favorites or gallery changes', async () => {
  await mount();
  await act(async () => {
    await Promise.all([
      api.update(state => ({ ...state, favoriteProjects: ['coaster'] })),
      api.update(state => ({
        ...state,
        gallery: [
          {
            id: 'mine',
            name: 'My basket',
            date: '2026-10-05',
            photo: 'file:///private/photo.jpg',
          },
        ],
      })),
    ]);
  });
  expect(api.data.favoriteProjects).toEqual(['coaster']);
  expect(api.data.gallery).toHaveLength(1);
  expect(AsyncStorage.setItem).toHaveBeenLastCalledWith(
    STORAGE_KEY,
    JSON.stringify(api.data),
  );
});
test('failed storage write preserves the previous data and allows retry', async () => {
  await mount();
  (AsyncStorage.setItem as jest.Mock).mockRejectedValueOnce(
    new Error('disk full'),
  );
  await act(async () => {
    await expect(
      api.update(state => ({ ...state, onboarded: true })),
    ).rejects.toThrow('disk full');
  });
  expect(api.data.onboarded).toBe(false);
  await act(async () => {
    await api.update(state => ({ ...state, onboarded: true }));
  });
  expect(api.data.onboarded).toBe(true);
});
test('corrupt data is not overwritten', async () => {
  (AsyncStorage.getItem as jest.Mock).mockResolvedValue('{bad json');
  await mount();
  expect(api.ready).toBe(false);
  expect(api.error).not.toBeNull();
  expect(AsyncStorage.setItem).not.toHaveBeenCalled();
});
