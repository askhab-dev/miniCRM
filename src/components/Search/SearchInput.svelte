<script lang="ts">
  export let value: string = '';
  export let placeholder: string = 'Поиск...';
  export let onInput: (value: string) => void = () => {};
  export let onClear: () => void = () => {};

  let inputElement: HTMLInputElement;

  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    onInput(target.value);
  }

  function handleClear() {
    if (inputElement) {
      inputElement.value = '';
      inputElement.focus();
    }
    onClear();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      handleClear();
    }
  }
</script>

<div class="search-container">
  <div class="search-input-wrapper">
    <input
      bind:this={inputElement}
      type="text"
      {placeholder}
      value={value}
      on:input={handleInput}
      on:keydown={handleKeydown}
      class="search-input"
    />
    {#if value}
      <button
        on:click={handleClear}
        class="clear-button"
        type="button"
        aria-label="Очистить поиск"
      >
        ✕
      </button>
    {/if}
    <div class="search-icon">🔍</div>
  </div>
</div>

<style>
  .search-container {
    position: relative;
    width: 100%;
    max-width: 300px;
  }

  .search-input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
  }

  .search-input {
    width: 100%;
    padding: 8px 40px 8px 36px;
    border: 1px solid #dee2e6;
    border-radius: 6px;
    font-size: 14px;
    background: white;
    transition: border-color 0.2s, box-shadow 0.2s;
  }

  .search-input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }

  .search-input::placeholder {
    color: #6c757d;
  }

  .search-icon {
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 16px;
    color: #6c757d;
    pointer-events: none;
  }

  .clear-button {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    font-size: 16px;
    color: #6c757d;
    cursor: pointer;
    padding: 2px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    transition: background-color 0.2s, color 0.2s;
  }

  .clear-button:hover {
    background-color: #f8f9fa;
    color: #495057;
  }
</style>
