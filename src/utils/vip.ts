import type { Client } from '../types/client';
import { getValidDate, isMoreThan30Days } from './date';

export function isVip(client: Client): boolean {
  const balance = Number(client.balance);

  if (isNaN(balance) || balance < 1001) {
    return false;
  }

  if (client.status === 'blocked') {
    return false;
  }

  const date = getValidDate(client.createdAt);

  if (date === '-' || !isMoreThan30Days(date)) {
    return false;
  }

  return true;
}
