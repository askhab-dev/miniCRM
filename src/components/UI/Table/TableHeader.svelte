<script lang="ts">
  export let sortable: boolean = true;
  export let sorted: 'asc' | 'desc' | null = null;
  export let onSort: (() => void) | undefined = undefined;
</script>

<th
  class:sortable
  class:sorted-asc={sorted === 'asc'}
  class:sorted-desc={sorted === 'desc'}
  on:click={onSort}
  on:keydown
>
  <slot />
  {#if sorted}
    <span class="sort-icon">
      {sorted === 'asc' ? ' ↑' : ' ↓'}
    </span>
  {/if}
</th>

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
    transition: background 0.2s;
  }

  th.sortable {
    cursor: pointer;
  }

  th.sortable:hover {
    background: #e9ecef;
  }

  th.sorted-asc,
  th.sorted-desc {
    background: #e9ecef;
    color: #007bff;
  }

  .sort-icon {
    position: absolute;
    right: 12px;
    top: 4px;
    font-size: 22px;
  }
</style>
