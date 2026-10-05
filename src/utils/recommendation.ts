import { projects } from '../data/projects';
import type { Project } from '../types/models';

export function recommendProject(answers: number[]): Project {
  if (
    answers.length !== 4 ||
    answers.some(
      answer => !Number.isInteger(answer) || answer < 0 || answer > 3,
    )
  ) {
    throw new Error('Answer all four questions first.');
  }
  const [experience, time, category, challenge] = answers;
  const desiredCategory = ['Practical', 'Decoration', 'Garden', 'Lighting'][
    category
  ];
  const hours = [1, 2, 4, 8][time];
  const ability = Math.min(experience, challenge);
  return [...projects].sort((a, b) => score(b) - score(a))[0];
  function score(project: Project) {
    const difficulty = { Easy: 0, Medium: 2, Advanced: 3 }[project.difficulty];
    const tooHard = difficulty > ability;
    const overTime = Math.max(0, project.hours - hours);
    return (
      (project.category === desiredCategory ? 9 : 0) -
      (tooHard ? 18 + difficulty * 2 : Math.abs(ability - difficulty)) -
      overTime * 6 +
      Math.min(project.hours, hours) * 0.25
    );
  }
}
