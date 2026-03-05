import { sortStore } from '../stores/sortStore';

export function useSort() {
  return {
    subscribe: sortStore.subscribe,
    setSortColumn: (column: string | null) => sortStore.setSortColumn(column),
    reset: () => sortStore.reset(),
  };
}
