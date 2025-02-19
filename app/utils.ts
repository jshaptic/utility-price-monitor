
export const mean = (arr: number[]): number | undefined => {
    if (!arr.length) return undefined;
    return arr.reduce((a, b) => a + b, 0) / arr.length;
}
export const median = (arr: number[]): number | undefined => {
  if (!arr.length) return undefined;
  const s = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};
