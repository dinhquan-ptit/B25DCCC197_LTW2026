import { POINTS, RANKS } from './data';

export const calcScore = (answers) => {
  return answers
    .filter((a) => a.correct)
    .reduce((sum, a) => sum + (POINTS[a.level] || 0), 0);
};

export const getRank = (score) => {
  const found = RANKS.find((r) => score >= r.min);
  return found ? found.title : 'Cần cố gắng';
};