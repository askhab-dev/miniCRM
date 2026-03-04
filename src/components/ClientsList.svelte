<script lang="ts">
  import { useQuery } from '@sveltestack/svelte-query';
  import { fetchClients } from '../api/brokenApi';
  import Loader from './Loader.svelte';
  import Error from './Error.svelte';
  import type { Client } from '../types/client';

  const queryResult = useQuery('clients', async () => {
    const clients = await fetchClients();

    if (clients.length > 0) {
      return clients;
    };

    // Выкинем ошибку для авто-ретрая запроса.
    throw { error: 'Данные не найдены' };
  });

  const retry = () => {
    $queryResult.refetch();
  };

  const idCache = new Set();
  const isDuplicate = (id: number) => {
    console.log(idCache)
    if (idCache.has(id)) {
      return true;
    } else {
      idCache.add(id);
    }

    return false;
  }

  $: isFetching = $queryResult.isFetching;
  $: error = $queryResult.error as Error;
  $: clients = $queryResult.data?.sort((a, b) => a.id - b.id) || [];
  $: {
    if (clients) {
      idCache.clear();
    }
  }

  const getValidDate = (date: Client['createdAt']) => {
    return date && Date.parse(date) ? new Date(date).toLocaleDateString() : '-';
  }

  const COLUMNS_HEADERS = ['ID', 'Имя', 'Email', 'Статус', 'Баланс ($)', 'Дата создания', 'Дубль']
</script>

<section class="content">
  <div class="content-header">
    <h2>Список клиентов</h2>
    <button on:click={retry} disabled={isFetching} class="refresh-btn">
      {isFetching ? 'Обновление...' : '🔄 Обновить'}
    </button>
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
            {#each COLUMNS_HEADERS as head}
              <th>{head}</th>
            {/each}
          </tr>
        </thead>

        <tbody>
          {#each clients as client}
            <tr>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.email}</td>
              <td>
                <span class="status-badge status-{client.status.toLowerCase()}">
                  {client.status}
                </span>
              </td>
              <td class="balance">{client.balance === null ? '-' :  client.balance}</td>
              <td>{getValidDate(client.createdAt)}</td>
              <td>{isDuplicate(client.id) ? '✅' : ''}</td>
            </tr>
          {/each}
        </tbody>
      </table>
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
    text-align: left;
    padding: 12px;
    background: #f8f9fa;
    color: #495057;
    font-weight: 600;
    border-bottom: 2px solid #dee2e6;
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
    background: #8d8d8d;
    color: #ffffff;
  }
  
  .status-pending {
    background: #fff3cd;
    color: #856404;
  }
  
  .balance {
    font-weight: 500;
    color: #28a745 !important;
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
