<script lang="ts">
  import { useClients } from '../hooks/useClients';
  import { useFilter } from '../hooks/useFilter';
  import { useSort } from '../hooks/useSort';
  import { useSearch } from '../hooks/useSearch';
  import { filteredAndSortedClients } from '../stores/clientsStore';
  import { STATUS_OPTIONS, TABLE_COLUMNS } from '../utils/constants';

  import Loader from '../components/UI/Loader.svelte';
  import Error from '../components/UI/Error.svelte';
  import Button from '../components/UI/Button.svelte';
  import Layout from '../components/Layout/Content.svelte';
  import ContentHeader from '../components/Layout/ContentHeader.svelte';
  import StatusFilter from '../components/Filter/StatusFilter.svelte';
  import SearchInput from '../components/UI/SearchInput.svelte';
  import ClientsTable from '../components/ClientsTable/ClientsTable.svelte';
  import type { FilterStatus } from '../types/filter';

  const queryResult = useClients();
  const filter = useFilter();
  const sort = useSort();
  const search = useSearch();

  $: isFetching = $queryResult.isFetching;
  $: error = $queryResult.error as Error;
  $: filterState = $filter;
  $: sortState = $sort;
  $: searchState = $search;
  $: filteredClients = $filteredAndSortedClients;

  const retry = () => {
    $queryResult.refetch();
  };

  const onSort = (column: string) => {
    sort.setSortColumn(column);
  };

  const onStatusChange = (status: FilterStatus) => {
    filter.toggleStatus(status);
  };

  const onSearchInput = (query: string) => {
    search.setSearch(query);
  };

  const onSearchClear = () => {
    search.clear();
  };
</script>

<Layout>
  <ContentHeader>
    <h2>Список клиентов</h2>
    <div class="header-actions">
      <SearchInput
        value={searchState}
        placeholder="Поиск по имени или email..."
        onInput={onSearchInput}
        onClear={onSearchClear}
      />
      <StatusFilter
        statusOptions={STATUS_OPTIONS}
        selectedStatuses={filterState.selectedStatuses}
        {onStatusChange}
      />

      <Button variant="primary" disabled={isFetching} onClick={retry}>
        {isFetching ? 'Обновление...' : '🔄 Обновить'}
      </Button>
    </div>
  </ContentHeader>

  {#if isFetching}
    <Loader />
  {:else if error}
    <Error error={error.message} onClick={retry} />
  {:else}
    <ClientsTable
      clients={filteredClients}
      columns={TABLE_COLUMNS}
      sortColumn={sortState.sortColumn}
      sortDirection={sortState.sortDirection}
      {onSort}
    />
  {/if}
</Layout>

<style>
  .header-actions {
    display: flex;
    gap: 12px;
    align-items: center;
  }

  h2 {
    font-size: 18px;
    font-weight: 600;
    color: #333;
    margin: 0;
  }
</style>
