export type FilterStatus = 'All' | 'active' | 'inactive' | 'blocked';

export interface StatusOption {
  value: FilterStatus;
  label: string;
  color: string;
}

export interface FilterState {
  selectedStatuses: FilterStatus[];
}
