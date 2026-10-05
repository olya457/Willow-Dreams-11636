import AsyncStorage from '@react-native-async-storage/async-storage';
import type { AppData, TimerState } from '../types/models';

export const STORAGE_KEY = '@willow-dreams/data-v1';
export const initialTimer: TimerState = {
  thickness: null,
  condition: null,
  duration: 0,
  remaining: 0,
  endsAt: null,
  status: 'idle',
};
export const emptyData: AppData = {
  version: 1,
  onboarded: false,
  favoriteArticles: [],
  favoriteProjects: [],
  answers: {},
  gallery: [],
  quizAnswers: [],
  timer: initialTimer,
};

export function decodeData(raw: string): AppData {
  const data = JSON.parse(raw);
  const strings = (value: unknown) =>
    Array.isArray(value) && value.every(item => typeof item === 'string');
  if (
    !data ||
    data.version !== 1 ||
    typeof data.onboarded !== 'boolean' ||
    !strings(data.favoriteArticles) ||
    !strings(data.favoriteProjects) ||
    !Array.isArray(data.gallery) ||
    !Array.isArray(data.quizAnswers) ||
    !data.quizAnswers.every(
      (x: unknown) => Number.isInteger(x) && Number(x) >= 0 && Number(x) < 4,
    ) ||
    data.quizAnswers.length > 4 ||
    !data.answers ||
    typeof data.answers !== 'object' ||
    Object.values(data.answers).some(x => typeof x !== 'boolean')
  ) {
    throw new Error(
      'Your saved data could not be read. It has not been changed.',
    );
  }
  if (
    data.gallery.some(
      (item: any) =>
        !item ||
        !['id', 'name', 'date', 'photo'].every(
          key => typeof item[key] === 'string',
        ) ||
        !/^\d{4}-\d{2}-\d{2}$/.test(item.date),
    )
  ) {
    throw new Error(
      'Your gallery data could not be read. It has not been changed.',
    );
  }
  const timer = data.timer;
  if (
    !timer ||
    !['idle', 'running', 'paused', 'finished'].includes(timer.status) ||
    ![null, 'Thin', 'Medium', 'Thick'].includes(timer.thickness) ||
    ![null, 'Dried', 'Fresh-cut', 'Stripped'].includes(timer.condition) ||
    !Number.isFinite(timer.duration) ||
    timer.duration < 0 ||
    !Number.isFinite(timer.remaining) ||
    timer.remaining < 0 ||
    (timer.endsAt !== null && !Number.isFinite(timer.endsAt)) ||
    (timer.status === 'running' && timer.endsAt === null)
  ) {
    throw new Error(
      'Your saved timer could not be read. It has not been changed.',
    );
  }
  return data as AppData;
}

export async function readData(): Promise<AppData> {
  const raw = await AsyncStorage.getItem(STORAGE_KEY);
  return raw ? decodeData(raw) : { ...emptyData, timer: { ...initialTimer } };
}

export const writeData = (data: AppData) =>
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
