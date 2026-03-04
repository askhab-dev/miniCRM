<script lang="ts">
  import { useQuery } from '@sveltestack/svelte-query';
  import { fetchClients } from '../api/brokenApi';
  import Loader from './Loader.svelte';
  import Error from './Error.svelte';
  import type { Client } from '../types/client';

  const queryResult = useQuery('clients', async () => {
    const clients = await fetchClients();

    if (clients.length > 0) {
      return clients as Client[];
    };

    // Выкинем ошибку для авто-ретрая запроса.
    throw { error: 'Данные не найдены' };
  });

  const retry = () => {
    $queryResult.refetch();
  };

  let showFilter = false;
  let selectedStatuses = ['All'];
  
  let sortColumn: string | null = null;
  let sortDirection: 'asc' | 'desc' = 'asc';

  const statusOptions = [
    { value: 'All', label: 'Все', color: '#6c757d' },
    { value: 'active', label: 'Активные', color: '#28a745' },
    { value: 'inactive', label: 'Неактивные', color: '#dc3545' },
    { value: 'blocked', label: 'Заблокированные', color: '#343a40' }
  ];

  function toggleStatusFilter() {
    showFilter = !showFilter;
  }

  function handleStatusChange(statusValue: string) {
    if (statusValue === 'All') {
      selectedStatuses = ['All'];
    } else {
      if (selectedStatuses.includes('All')) {
        selectedStatuses = [statusValue];
      } else {
        if (selectedStatuses.includes(statusValue)) {
          selectedStatuses = selectedStatuses.filter(s => s !== statusValue);

          if (selectedStatuses.length === 0) {
            selectedStatuses = ['All'];
          }
        } else {
          selectedStatuses = [...selectedStatuses, statusValue];
        }
      }
    }
  }

  function handleSort(column: string) {
    if (sortColumn === column) {
      sortDirection = sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      sortColumn = column;
      sortDirection = 'asc';
    }
  }

  function getSortValue(client: Client, column: string): any {
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

  const idCache = new Set();
  const isDuplicate = (id: number) => {
    if (idCache.has(id)) {
      return true;
    } else {
      idCache.add(id);
    }

    return false;
  }

  $: isFetching = $queryResult.isFetching;
  $: error = $queryResult.error as Error;
  $: allClients = $queryResult.data?.sort((a, b) => a.id - b.id) || [];

  // Сначала фильтруем, потом сортируем
  $: filteredClients = (selectedStatuses.includes('All') 
    ? allClients 
    : allClients.filter(client => selectedStatuses.includes(client.status)))
    .sort((a, b) => {
      if (!sortColumn) return 0;

      const valA = getSortValue(a, sortColumn);
      const valB = getSortValue(b, sortColumn);

      if (valA === valB) return 0;

      const comparison = valA > valB ? 1 : -1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });

  $: {
    if (filteredClients) {
      idCache.clear();
    }
  }

  const getValidDate = (date: Client['createdAt']) => {
    return date && Date.parse(date) ? new Date(date).toLocaleDateString() : '-';
  }

  type TableColumn = { label: string; sortable?: boolean };
  const COLUMNS: TableColumn[] = [
    { label: 'ID' },
    { label: 'Имя' },
    { label: 'Email' },
    { label: 'Статус' },
    { label: 'Баланс ($)' },
    { label: 'Дата создания' },
    { label: 'Дубль', sortable: false }
  ];

  $: filterButtonText = selectedStatuses.includes('All') 
    ? 'Все статусы' 
    : selectedStatuses.length === 1 
      ? statusOptions.find(opt => opt.value === selectedStatuses[0])?.label 
      : `Выбрано (${selectedStatuses.length})`;
</script>

<section class="content">
  <div class="content-header">
    <h2>Список клиентов</h2>
    <div class="header-actions">
      <div class="filter-container">
        <button 
          on:click={toggleStatusFilter} 
          class="filter-btn"
          class:active={showFilter}
        >
          <span class="filter-icon">⚙️</span>
          {filterButtonText}
        </button>
        
        {#if showFilter}
          <div class="filter-dropdown">
            <div class="filter-header">
              <h4>Фильтр по статусу</h4>
            </div>

            <div class="filter-options">
              {#each statusOptions as status}
                <label class="filter-option">
                  <input
                    type="checkbox"
                    checked={selectedStatuses.includes(status.value)}
                    on:change={() => handleStatusChange(status.value)}
                  />
                  <span
                    class="status-badge" 
                    style:background-color={status.color}
                    style:color="white"
                  >
                    {status.label}
                  </span>
                </label>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      <button on:click={retry} disabled={isFetching} class="refresh-btn">
        {isFetching ? 'Обновление...' : '🔄 Обновить'}
      </button>
    </div>
  </div>

  {#if isFetching}
    <Loader />

  {:else if error}
    <Error error={error.message} onClick={retry} />
  
  {:else}
    <div class="table-wrapper">
      <table class="clients-table">
        <thead>
          <tr>
            {#each COLUMNS as column}
              {#if column.sortable !== false}
                <th 
                  on:click={() => handleSort(column.label)}
                  class:sortable={true}
                  class:sorted-asc={sortColumn === column.label && sortDirection === 'asc'}
                  class:sorted-desc={sortColumn === column.label && sortDirection === 'desc'}
                >
                  {column.label}
                  {#if sortColumn === column.label}
                    <span class="sort-icon">
                      {sortDirection === 'asc' ? ' ↑' : ' ↓'}
                    </span>
                  {/if}
                </th>
              {:else}
                <th>{column.label}</th>
              {/if}
            {/each}
          </tr>
        </thead>

        <tbody>
          {#each filteredClients as client}
            <tr>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>
                <span class="status-badge status-{client.status.toLowerCase()}">
                  {client.status}
                </span>
              </td>
              <td class="balance">{client.balance === null ? '-' : client.balance}</td>
              <td>{getValidDate(client.createdAt)}</td>
              <td>{isDuplicate(client.id) ? '✅' : ''}</td>
            </tr>
          {/each}
        </tbody>
      </table>
      
      {#if filteredClients.length === 0}
        <div class="no-results">
          Нет клиентов с выбранными статусами
        </div>
      {/if}
    </div>
  {/if}
</section>

<style>
  .content {
    flex: 1;
    background: white;
    border-radius: 12px;
    padding: 24px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    min-height: 600px;
    position: relative;
  }
  
  .content-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 24px;
    padding-bottom: 16px;
    border-bottom: 1px solid #eee;
  }

  .content-header h2 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }
  
  .header-actions {
    display: flex;
    gap: 12px;
    align-items: center;
  }
  
  .filter-container {
    position: relative;
  }
  
  .filter-btn {
    padding: 8px 16px;
    background: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s;
  }
  
  .filter-btn:hover {
    background: #e9ecef;
  }
  
  .filter-btn.active {
    background: #e9ecef;
    border-color: #007bff;
  }
  
  .filter-icon {
    font-size: 16px;
  }
  
  .filter-dropdown {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    width: 240px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.15);
    border: 1px solid #eee;
    z-index: 1000;
    overflow: hidden;
  }
  
  .filter-header {
    padding: 12px 16px;
    background: #f8f9fa;
    border-bottom: 1px solid #eee;
  }
  
  .filter-header h4 {
    margin: 0;
    font-size: 14px;
    font-weight: 600;
    color: #333;
  }
  
  .filter-options {
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .filter-option {
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .filter-option input[type="checkbox"] {
    width: 16px;
    height: 16px;
    cursor: pointer;
  }
  
  .filter-option .status-badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
  }

  .refresh-btn {
    padding: 8px 16px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
  }
  
  .refresh-btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  .table-wrapper {
    position: relative;
    overflow-x: auto;
  }
  
  .clients-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  }
  
  .clients-table th {
    position: relative;
    text-align: left;
    padding: 12px;
    background: #f8f9fa;
    color: #495057;
    font-weight: 600;
    border-bottom: 2px solid #dee2e6;
    cursor: pointer;
    user-select: none;
    transition: background 0.2s;
  }
  
  .clients-table th.sortable:hover {
    background: #e9ecef;
  }
  
  .clients-table th.sorted-asc,
  .clients-table th.sorted-desc {
    background: #e9ecef;
    color: #007bff;
  }
  
  .sort-icon {
    position: absolute;
    right: 12px;
    top: 4px;
    font-size: 22px;
  }
  
  .clients-table td {
    padding: 12px;
    border-bottom: 1px solid #e9ecef;
    color: #212529;
  }
  
  .clients-table tr:hover {
    background: #f8f9fa;
  }
  
  .status-badge {
    display: inline-block;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 500;
  }
  
  .status-active {
    background: #d4edda;
    color: #155724;
  }

  .status-inactive {
    background: #f8d7da;
    color: #721c24;
  }

  .status-blocked {
    background: #343a40;
    color: white;
  }

  .status-pending {
    background: #fff3cd;
    color: #856404;
  }
  
  .balance {
    font-weight: 500;
    color: #28a745 !important;
  }
  
  .no-results {
    text-align: center;
    padding: 40px;
    color: #6c757d;
    font-size: 14px;
  }
  
  .updating-overlay {
    position: absolute;
    bottom: 20px;
    right: 20px;
    background: rgba(0,0,0,0.7);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 13px;
    pointer-events: none;
  }
</style>
