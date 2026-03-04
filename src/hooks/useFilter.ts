import { filterStore } from '../stores/filterStore';
import type { FilterStatus } from '../types/filter';

export function useFilter() {
  return {
    subscribe: filterStore.subscribe,
    toggleStatus: (status: FilterStatus) => filterStore.toggleStatus(status),
    setStatuses: (statuses: FilterStatus[]) => filterStore.setStatuses(statuses),
    reset: () => filterStore.reset()
  };
}
