<script lang="ts">
  import type { StatusOption, FilterStatus } from '../../types/filter';
  import { getFilterButtonText } from '../../utils/filterHelpers';
  import FilterButton from './FilterButton.svelte';
  import FilterDropdown from './FilterDropdown.svelte';

  export let statusOptions: StatusOption[] = [];
  export let selectedStatuses: FilterStatus[] = ['All'];
  export let onStatusChange: (status: FilterStatus) => void = () => {};

  let showFilter = false;
  let buttonText = getFilterButtonText(selectedStatuses, statusOptions);

  const toggleFilter = () => {
    showFilter = !showFilter;
  }

  const handleStatusChange = (status: FilterStatus) => {
    onStatusChange(status);
  }

  $: {
      buttonText = getFilterButtonText(selectedStatuses, statusOptions)
  };
</script>

<div class="filter-container">
  <FilterButton
    active={showFilter}
    text={buttonText}
    onClick={toggleFilter}
  />

  {#if showFilter}
    <FilterDropdown
      {statusOptions}
      {selectedStatuses}
      onStatusChange={handleStatusChange}
    />
  {/if}
</div>

<style>
  .filter-container {
    position: relative;
  }
</style>
