<script lang="ts">
  import type { TableColumn } from '../../types/sort';
  import TableHeader from '../UI/Table/TableHeader.svelte';

  export let columns: TableColumn[] = [];
  export let sortColumn: string | null = null;
  export let sortDirection: 'asc' | 'desc' = 'asc';
  export let onSort: (column: string) => void = () => {};
</script>

<thead>
  <tr>
    {#each columns as column (column.label)}
      {#if column.sortable !== false}
        <TableHeader
          sortable={true}
          sorted={sortColumn === column.label ? sortDirection : null}
          onSort={() => onSort(column.label)}
        >
          {column.label}
        </TableHeader>
      {:else}
        <th>{column.label}</th>
      {/if}
    {/each}
  </tr>
</thead>

<style>
  th {
    position: relative;
    text-align: left;
    padding: 12px;
    background: #f8f9fa;
    color: #495057;
    font-weight: 600;
    border-bottom: 2px solid #dee2e6;
    user-select: none;
  }
</style>
