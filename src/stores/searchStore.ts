import { writable } from 'svelte/store';

function createSearchStore() {
  const { subscribe, set } = writable<string>('');

  return {
    subscribe,
    setSearch: (query: string) => set(query),
    clear: () => set(''),
    reset: () => set(''),
  };
}

export const searchStore = createSearchStore();
