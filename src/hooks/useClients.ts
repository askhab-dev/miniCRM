import { useQuery } from '@sveltestack/svelte-query';
import { fetchClients } from '../api/brokenApi';
import type { Client } from '../types/client';
import { clientsStore } from '../stores/clientsStore';

export function useClients() {
  const queryResult = useQuery('clients', async () => {
    const clients = await fetchClients();

    if (clients.length > 0) {
      clientsStore.setClients(clients as Client[]);
      return clients as Client[];
    }

    // Выкинем ошибку для авто-ретрая запроса.
    throw { error: 'Данные не найдены' };
  });

  return queryResult;
}
