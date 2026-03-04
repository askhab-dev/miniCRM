<script lang="ts">
  export let isDuplicate: boolean = false;
</script>

<span class="duplicate-indicator">
  {#if isDuplicate}
    <span class="duplicate-mark">✅</span>
  {/if}
</span>

<style>
  .duplicate-indicator {
    display: inline-block;
    min-width: 24px;
  }

  .duplicate-mark {
    font-size: 14px;
  }
</style>
