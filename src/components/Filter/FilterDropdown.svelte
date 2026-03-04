<script lang="ts">
  import type { StatusOption, FilterStatus } from '../../types/filter';

  export let statusOptions: StatusOption[] = [];
  export let selectedStatuses: FilterStatus[] = ['All'];
  export let onStatusChange: (status: FilterStatus) => void = () => {};
</script>

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
          on:change={() => onStatusChange(status.value)}
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

<style>
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
</style>
