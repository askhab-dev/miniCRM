<script lang="ts">
  import type { Client } from '../../types/client';
  import type { TableColumn } from '../../types/sort';
  import { useDuplicateDetection } from '../../hooks/useDuplicateDetection';
  import ClientsTableHeader from './ClientsTableHeader.svelte';
  import ClientsTableRow from './ClientsTableRow.svelte';

  export let clients: Client[] = [];
  export let columns: TableColumn[] = [];
  export let sortColumn: string | null = null;
  export let sortDirection: 'asc' | 'desc' = 'asc';
  export let onSort: (column: string) => void = () => {};

  const { isDuplicate, reset } = useDuplicateDetection();

  $: {
    if (clients) {
      reset();
    }
  }
</script>

<div class="table-wrapper">
  <table class="clients-table">
    <ClientsTableHeader
      {columns}
      {sortColumn}
      {sortDirection}
      {onSort}
    />

    {#if clients.length > 0}
      <tbody>
        {#each clients as client}
          <ClientsTableRow
            {client}
            isDuplicate={isDuplicate(client.id)}
          />
        {/each}
      </tbody>
    {/if}
  </table>

  {#if clients.length === 0}
    <div class="no-results">
      Нет клиентов, соответствующих критериям поиска и фильтрации
    </div>
  {/if}
</div>

<style>
  .table-wrapper {
    position: relative;
    overflow-x: auto;
  }

  .clients-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }

  .no-results {
    text-align: center;
    padding: 40px;
    color: #6c757d;
    font-size: 14px;
  }
</style>
