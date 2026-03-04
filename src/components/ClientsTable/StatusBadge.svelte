<script lang="ts">
  type StatusType = 'active' | 'inactive' | 'blocked';

  export let status: StatusType = 'active';
  export let label: string = '';
</script>

<span class="status-badge status-{status}">
  {label}
</span>

<style>
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
</style>
