<script lang="ts">
  import { useQuery } from '@sveltestack/svelte-query';
  import { fetchClients } from '../api/brokenApi';
  import Loader from './Loader.svelte';
  import Error from './Error.svelte';

  const queryResult = useQuery('clients', () => fetchClients());
  const retry = () => $queryResult.refetch();

  $: isFetching = $queryResult.isFetching;
  $: error = $queryResult.error as Error;
  $: clients = $queryResult.data || [];
  $: hasData = clients && clients.length > 0;
  $: isEmpty = clients && clients.length === 0;
</script>

<section class="content">
  <div class="content-header">
    <h2>Список клиентов</h2>
  </div>

  {#if isFetching}
    <Loader />
  
  {:else if error}
    <Error 
      error={error.message} 
      onClick={retry} 
    />
  
  {:else if isEmpty}
    <Error 
      error="Данные клиентов не найдены" 
      onClick={retry}
    />
  
  {:else if hasData}
    <div class="clients-placeholder">
      <p>Загружено {clients.length} клиентов</p>
      <pre class="debug">{JSON.stringify(clients, null, 2)}</pre>
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
  }
  
  .clients-placeholder {
    padding: 20px;
    background: #f8f9fa;
    border-radius: 8px;
    color: #666;
  }

  .debug {
    margin-top: 16px;
    padding: 16px;
    background: #2c3e50;
    color: #fff;
    border-radius: 6px;
    font-size: 12px;
    overflow: auto;
    max-height: 300px;
  }
</style>