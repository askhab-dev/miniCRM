import { searchStore } from '../stores/searchStore';

export function useSearch() {
  return {
    subscribe: searchStore.subscribe,
    setSearch: (query: string) => searchStore.setSearch(query),
    clear: () => searchStore.clear(),
    reset: () => searchStore.reset(),
  };
}
