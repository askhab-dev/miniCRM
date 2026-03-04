<script lang="ts">
  import Button from '../UI/Button.svelte';

  export let active: boolean = false;
  export let text: string = '';
  export let onClick: (() => void) | undefined = undefined;
</script>

<Button
  variant={active ? 'primary' : 'secondary'}
  size="md"
  {onClick}
>
  <span class="filter-icon">⚙️</span>
  {text}
</Button>

<style>
  .filter-icon {
    font-size: 16px;
  }
</style>
