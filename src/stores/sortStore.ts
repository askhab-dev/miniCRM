import { writable } from 'svelte/store';
import type { SortState, SortDirection } from '../types/sort';

function createSortStore() {
  const initialState: SortState = {
    sortColumn: null,
    sortDirection: 'asc'
  };

  const { subscribe, set, update } = writable<SortState>(initialState);

  return {
    subscribe,
    setSortColumn: (column: string | null) => {
      update(state => {
        if (state.sortColumn === column) {
          return {
            ...state,
            sortDirection: state.sortDirection === 'asc' ? 'desc' : 'asc'
          };
        } else {
          return {
            sortColumn: column,
            sortDirection: 'asc'
          };
        }
      });
    },
    reset: () => set(initialState)
  };
}

export const sortStore = createSortStore();
