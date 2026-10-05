import {
  calculateRods,
  formatDuration,
  remainingTime,
  soakingDuration,
} from '../src/utils/tools';
import { initialTimer } from '../src/storage/store';
import { recommendProject } from '../src/utils/recommendation';
import { articles } from '../src/data/articles';
import { projects } from '../src/data/projects';
import { patterns } from '../src/data/patterns';

test('matches the calculator and soaking examples from the design', () => {
  expect(calculateRods('Basket', 'Medium')).toBe(64);
  expect(soakingDuration('Medium', 'Dried')).toBe(6 * 3600000);
  expect(formatDuration(soakingDuration('Medium', 'Dried'))).toBe('06:00:00');
});
test('timer accounts for elapsed time while the app was closed', () => {
  const timer = {
    ...initialTimer,
    status: 'running' as const,
    endsAt: 100000,
    remaining: 90000,
  };
  expect(remainingTime(timer, 40000)).toBe(60000);
  expect(remainingTime(timer, 110000)).toBe(0);
  expect(formatDuration(remainingTime(timer, 40000))).toBe('00:01:00');
});
test('paused timers do not lose time', () => {
  expect(
    remainingTime(
      { ...initialTimer, status: 'paused', remaining: 5000 },
      999999,
    ),
  ).toBe(5000);
});
test('beginner with one hour receives an easy short project', () => {
  const project = recommendProject([0, 0, 0, 0]);
  expect(project.id).toBe('coaster');
  expect(project.difficulty).toBe('Easy');
});
test('recommendation responds to interests, time and experience', () => {
  expect(recommendProject([3, 3, 3, 3]).id).toBe('lantern');
  expect(recommendProject([2, 2, 2, 2]).id).toBe('plant-holder');
  expect(recommendProject([0, 0, 1, 0]).id).toBe('star');
});
test('incomplete quizzes cannot generate recommendations', () => {
  expect(() => recommendProject([0, 0])).toThrow();
  expect(() => recommendProject([0, 0, 9, 0])).toThrow();
});
test('each Figma project has four steps and every article has two questions', () => {
  expect(articles).toHaveLength(8);
  expect(projects).toHaveLength(8);
  expect(patterns).toHaveLength(8);
  for (const article of articles) {
    expect(article.questions).toHaveLength(2);
    expect(article.paragraphs).toHaveLength(2);
  }
  for (const project of projects) {
    expect(project.steps).toHaveLength(4);
  }
});
