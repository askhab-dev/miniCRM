export type SortDirection = 'asc' | 'desc';

export interface SortState {
  sortColumn: string | null;
  sortDirection: SortDirection;
}

export type TableColumn = { label: string; sortable?: boolean };
