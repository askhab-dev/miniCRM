export function useDuplicateDetection() {
  const idCache = new Set<number>();

  return {
    isDuplicate: (id: number) => {
      if (idCache.has(id)) {
        return true;
      } else {
        idCache.add(id);
      }
      return false;
    },
    reset: () => idCache.clear(),
  };
}
