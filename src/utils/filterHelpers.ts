import type { Client } from '../types/client';
import type { FilterStatus, StatusOption } from '../types/filter';

export function filterByStatus(
  clients: Client[],
  selectedStatuses: FilterStatus[]
): Client[] {
  if (selectedStatuses.includes('All')) {
    return clients;
  }
  
  return clients.filter(client => selectedStatuses.includes(client.status));
}

export function getFilterButtonText(
  selectedStatuses: FilterStatus[],
  statusOptions: StatusOption[]
): string {
  if (selectedStatuses.includes('All')) {
    return 'Все статусы';
  }

  if (selectedStatuses.length === 1) {
    return statusOptions.find(opt => opt.value === selectedStatuses[0])?.label || '';
  }

  return `Выбрано (${selectedStatuses.length})`;
}
