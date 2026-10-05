import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Alert } from 'react-native';
import type { AppData } from '../types/models';
import { emptyData, readData, writeData } from './store';

type Update = (current: AppData) => AppData;
interface AppContextValue {
  data: AppData;
  ready: boolean;
  error: string | null;
  retry: () => void;
  update: (change: Update) => Promise<void>;
  toggleFavorite: (
    kind: 'favoriteArticles' | 'favoriteProjects',
    id: string,
  ) => Promise<void>;
}
const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AppData>(emptyData);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const current = useRef(data);
  const queue = useRef<Promise<void>>(Promise.resolve());
  const hydrate = useCallback(async () => {
    setError(null);
    try {
      const saved = await readData();
      current.current = saved;
      setData(saved);
      setReady(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load your saved data. Please try again.',
      );
    }
  }, []);
  useEffect(() => {
    void hydrate();
  }, [hydrate]);
  const update = useCallback((change: Update) => {
    const task = queue.current.then(async () => {
      const next = change(current.current);
      await writeData(next);
      current.current = next;
      setData(next);
    });
    queue.current = task.catch(() => {});
    return task;
  }, []);
  const toggleFavorite = useCallback(
    async (kind: 'favoriteArticles' | 'favoriteProjects', id: string) => {
      try {
        await update(state => ({
          ...state,
          [kind]: state[kind].includes(id)
            ? state[kind].filter(item => item !== id)
            : [...state[kind], id],
        }));
      } catch {
        Alert.alert(
          'Unable to save',
          'Your favorites could not be saved. Please try again.',
        );
      }
    },
    [update],
  );
  return (
    <AppContext.Provider
      value={{
        data,
        ready,
        error,
        retry: () => {
          void hydrate();
        },
        update,
        toggleFavorite,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppData() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('AppProvider is required');
  }
  return context;
}
