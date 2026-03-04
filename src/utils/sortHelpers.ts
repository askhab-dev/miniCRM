import type { Client } from '../types/client';

function getSortValue(client: Client, column: string) {
  switch(column) {
    case 'ID':
      return client.id;
    case 'Имя':
      return client.name.toLowerCase();
    case 'Email':
      return client.email.toLowerCase();
    case 'Статус':
      return client.status;
    case 'Баланс ($)':
      // Для баланса: null/undefined считаем как -Infinity (минимальное значение)
      return client.balance === null ? -Infinity : client.balance;
    case 'Дата создания':
      // Для даты: null/undefined считаем как минимальную дату
      if (!client.createdAt) return -Infinity;
      const date = new Date(client.createdAt);
      return isNaN(date.getTime()) ? -Infinity : date.getTime();
    default:
      return '';
  }
}

export function sortClients(
  clients: Client[],
  sortColumn: string | null,
  sortDirection: 'asc' | 'desc'
): Client[] {
  if (!sortColumn) return clients;

  return [...clients].sort((a, b) => {
    const valA = getSortValue(a, sortColumn);
    const valB = getSortValue(b, sortColumn);

    if (valA === valB) return 0;

    const comparison = valA > valB ? 1 : -1;
    return sortDirection === 'asc' ? comparison : -comparison;
  });
}
