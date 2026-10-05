import type { ImageSourcePropType } from 'react-native';

export type Difficulty = 'Easy' | 'Medium' | 'Advanced';
export type Article = {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
  paragraphs: string[];
  questions: { statement: string; answer: boolean }[];
};
export type Project = {
  id: string;
  title: string;
  description: string;
  difficulty: Difficulty;
  image: ImageSourcePropType;
  steps: { text: string; image: ImageSourcePropType }[];
  category: 'Practical' | 'Decoration' | 'Garden' | 'Lighting';
  hours: number;
};
export type Pattern = {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
};
export type GalleryEntry = {
  id: string;
  name: string;
  date: string;
  photo: string;
};
export type RodThickness = 'Thin' | 'Medium' | 'Thick';
export type RodCondition = 'Dried' | 'Fresh-cut' | 'Stripped';
export type TimerState = {
  thickness: RodThickness | null;
  condition: RodCondition | null;
  duration: number;
  remaining: number;
  endsAt: number | null;
  status: 'idle' | 'running' | 'paused' | 'finished';
};
export type AppData = {
  version: 1;
  onboarded: boolean;
  favoriteArticles: string[];
  favoriteProjects: string[];
  answers: Record<string, boolean>;
  gallery: GalleryEntry[];
  quizAnswers: number[];
  timer: TimerState;
};
