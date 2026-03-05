import type { StatusOption } from '../types/filter';
import type { TableColumn } from '../types/sort';

export const STATUS_OPTIONS: StatusOption[] = [
  { value: 'All', label: 'Все', color: '#6c757d' },
  { value: 'active', label: 'Активные', color: '#28a745' },
  { value: 'inactive', label: 'Неактивные', color: '#dc3545' },
  { value: 'blocked', label: 'Заблокированные', color: '#343a40' },
];

export const TABLE_COLUMNS: TableColumn[] = [
  { label: 'ID' },
  { label: 'Имя' },
  { label: 'Email' },
  { label: 'Статус' },
  { label: 'Баланс ($)' },
  { label: 'Дата создания' },
  { label: 'Дубль', sortable: false },
  { label: 'VIP', sortable: false },
];
