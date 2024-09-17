export const generateRandomValue = (start: number, end: number) =>
  ~~(Math.random() * (end - start)) + start;
