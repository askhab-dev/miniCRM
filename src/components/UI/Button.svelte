<script lang="ts">
  type ButtonVariant = 'primary' | 'secondary' | 'danger';
  type ButtonSize = 'sm' | 'md' | 'lg';

  export let variant: ButtonVariant = 'secondary';
  export let size: ButtonSize = 'md';
  export let disabled: boolean = false;
  export let onClick: (() => void) | undefined = undefined;
</script>

<button
  class="btn btn-{variant} btn-{size}"
  {disabled}
  on:click={onClick}
>
  <slot />
</button>

<style>
  .btn {
    padding: 8px 16px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .btn:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  .btn-primary {
    background: #007bff;
    color: white;
  }

  .btn-primary:hover:not(:disabled) {
    background: #0056b3;
  }

  .btn-secondary {
    background: #f8f9fa;
    color: #212529;
    border: 1px solid #dee2e6;
  }

  .btn-secondary:hover:not(:disabled) {
    background: #e9ecef;
  }

  .btn-danger {
    background: #dc3545;
    color: white;
  }

  .btn-danger:hover:not(:disabled) {
    background: #c82333;
  }

  .btn-sm {
    padding: 6px 12px;
    font-size: 12px;
  }

  .btn-md {
    padding: 8px 16px;
    font-size: 14px;
  }

  .btn-lg {
    padding: 12px 24px;
    font-size: 16px;
  }
</style>
