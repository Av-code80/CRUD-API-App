export const exponentialBackoff = (retryCount: number): number => {
  return Math.min(1000 * 2 ** retryCount, 3000);
};
