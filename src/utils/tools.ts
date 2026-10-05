import type { RodCondition, RodThickness, TimerState } from '../types/models';

export const projectTypes = ['Basket', 'Tray', 'Trellis'] as const;
export const projectSizes = ['Small', 'Medium', 'Large'] as const;
export type ProjectType = (typeof projectTypes)[number];
export type ProjectSize = (typeof projectSizes)[number];
export function calculateRods(type: ProjectType, size: ProjectSize): number {
  const estimates = {
    Basket: { Small: 40, Medium: 64, Large: 96 },
    Tray: { Small: 24, Medium: 40, Large: 60 },
    Trellis: { Small: 12, Medium: 20, Large: 32 },
  };
  return estimates[type][size];
}
export function soakingDuration(
  thickness: RodThickness,
  condition: RodCondition,
): number {
  const hours = {
    Dried: { Thin: 3, Medium: 6, Thick: 12 },
    'Fresh-cut': { Thin: 0.5, Medium: 1, Thick: 2 },
    Stripped: { Thin: 1, Medium: 2, Thick: 4 },
  };
  return hours[condition][thickness] * 60 * 60 * 1000;
}
export function remainingTime(timer: TimerState, now = Date.now()): number {
  return timer.status === 'running' && timer.endsAt !== null
    ? Math.max(0, timer.endsAt - now)
    : timer.remaining;
}
export function formatDuration(ms: number): string {
  const seconds = Math.ceil(Math.max(0, ms) / 1000);
  return [
    Math.floor(seconds / 3600),
    Math.floor((seconds % 3600) / 60),
    seconds % 60,
  ]
    .map(value => String(value).padStart(2, '0'))
    .join(':');
}
export function dateToLocalISO(date: Date): string {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}`;
}
export function readableDate(date: string): string {
  return new Date(`${date}T12:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
