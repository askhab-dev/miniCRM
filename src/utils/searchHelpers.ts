import Fuse from 'fuse.js';
import type { Client } from '../types/client';

export function createFuseSearch(clients: Client[]) {
  const options = {
    keys: ['name', 'email'],
    threshold: 0.3,
    includeScore: true,
    shouldSort: true,
  };

  return new Fuse(clients, options);
}

export function fuzzySearch(clients: Client[], query: string): Client[] {
  if (!query.trim()) {
    return clients;
  }

  const fuse = createFuseSearch(clients);
  const results = fuse.search(query);

  return results.map((result) => result.item);
}
