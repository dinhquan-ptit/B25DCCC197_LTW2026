export const POINTS = { 1: 10, 2: 20, 3: 30 };

export const LEVELS = { 1: 'Dễ', 2: 'Trung bình', 3: 'Khó' };

export const TOPICS = ['HTML', 'CSS', 'JavaScript', 'React'];

export const LETTERS = ['A', 'B', 'C', 'D'];

export const TIME_PER_QUESTION = 20;

export const EXTRA_TIME = 15;

export const RANKS = [
  { min: 300, title: 'Rung chuông vàng' },
  { min: 200, title: 'Xuất sắc' },
  { min: 100, title: 'Khá' },
  { min: 0, title: 'Cần cố gắng' },
];
export function calcScore(answers) {
  return answers
    .filter((a) => a.correct)
    .reduce((sum, a) => sum + (POINTS[a.level] || 0), 0);
}

export function getRank(score) {
  const found = RANKS.find((r) => score >= r.min);
  return found ? found.title : 'Cần cố gắng';
}