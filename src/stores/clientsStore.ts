import { writable, derived } from 'svelte/store';
import type { Client } from '../types/client';
import { filterStore } from './filterStore';
import { sortStore } from './sortStore';
import { filterByStatus } from '../utils/filterHelpers';
import { sortClients } from '../utils/sortHelpers';

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
  [clientsStore, filterStore, sortStore],
  ([$clients, $filter, $sort]) => {
    const filtered = filterByStatus($clients, $filter.selectedStatuses);
    const sorted = sortClients(filtered, $sort.sortColumn, $sort.sortDirection);
    return sorted;
  }
);
