<script lang="ts">
  export let error = 'Ошибка';
  export let onClick: null | (() => void) = null;
</script>

<div class="error-state">
  <div class="error-icon">⚠️</div>
  <p class="error-message">{error}</p>
  {#if onClick}
    <button class="btn btn-primary" on:click={onClick}>
      Попробовать снова
    </button>
  {/if}
</div>

<style>
  .error-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 60px 20px;
    text-align: center;
  }

  .error-icon {
    font-size: 48px;
    margin-bottom: 16px;
  }

  .error-message {
    color: #dc3545;
    margin-bottom: 20px;
    font-size: 14px;
  }
</style>
