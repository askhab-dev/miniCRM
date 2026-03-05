import { writable, derived } from 'svelte/store';
import type { Client } from '../types/client';
import { filterStore } from './filterStore';
import { sortStore } from './sortStore';
import { searchStore } from './searchStore';
import { filterByStatus } from '../utils/filterHelpers';
import { sortClients } from '../utils/sortHelpers';
import { fuzzySearch } from '../utils/searchHelpers';

function createClientsStore() {
  const { subscribe: subscribeClients, set: setClients } = writable<Client[]>([]);

  return {
    subscribe: subscribeClients,
    setClients,
    reset: () => setClients([])
  };
}

export const clientsStore = createClientsStore();

export const filteredAndSortedClients = derived(
  [clientsStore, filterStore, sortStore, searchStore],
  ([$clients, $filter, $sort, $search]) => {
    const filteredByStatus = filterByStatus($clients, $filter.selectedStatuses);

    const searched = fuzzySearch(filteredByStatus, $search);

    const sorted = sortClients(searched, $sort.sortColumn, $sort.sortDirection);

    return sorted;
  }
);
