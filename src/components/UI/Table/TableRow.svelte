<tr>
  <slot />
</tr>

<style>
  tr {
    border-bottom: 1px solid #e9ecef;
  }

  tr:hover {
    background: #f8f9fa;
  }

  tr :global(td) {
    padding: 12px;
    color: #212529;
  }
</style>
