import { writable } from 'svelte/store';
import type { FilterStatus, FilterState } from '../types/filter';

function createFilterStore() {
  const initialState: FilterState = {
    selectedStatuses: ['All']
  };

  const { subscribe, set, update } = writable<FilterState>(initialState);

  return {
    subscribe,
    setStatuses: (statuses: FilterStatus[]) => update(state => ({ ...state, selectedStatuses: statuses })),
    toggleStatus: (status: FilterStatus) => {
      update(state => {
        let newStatuses = [...state.selectedStatuses];
        
        if (status === 'All') {
          newStatuses = ['All'];
        } else {
          if (newStatuses.includes('All')) {
            newStatuses = [status];
          } else {
            if (newStatuses.includes(status)) {
              newStatuses = newStatuses.filter(s => s !== status);
              if (newStatuses.length === 0) {
                newStatuses = ['All'];
              }
            } else {
              newStatuses = [...newStatuses, status];
            }
          }
        }
        
        return { ...state, selectedStatuses: newStatuses };
      });
    },
    reset: () => set(initialState)
  };
}

export const filterStore = createFilterStore();
