<script lang="ts">
  import type { Client } from '../../types/client';
  import { isVip } from '../../utils/vip';
  import { getValidDate } from '../../utils/date';
  import StatusBadge from './StatusBadge.svelte';
  import DuplicateIndicator from './DuplicateIndicator.svelte';

  export let client: Client;
  export let isDuplicate: boolean = false;

  $: statusType = client.status as any;
</script>

<tr>
  <td>{client.id}</td>
  <td>{client.name}</td>
  <td>{client.email}</td>
  <td>
    <StatusBadge status={statusType} label={client.status} />
  </td>
  <td class="balance">{client.balance === null ? '-' : client.balance}</td>
  <td>{getValidDate(client.createdAt)}</td>
  <td>
    <DuplicateIndicator {isDuplicate} />
  </td>
  <td>{isVip(client) ? '✅' : ''}</td>
</tr>

<style>
  tr {
    border-bottom: 1px solid #e9ecef;
  }

  tr:hover {
    background: #f8f9fa;
  }

  td {
    padding: 12px;
    color: #212529;
  }

  .balance {
    font-weight: 500;
    color: #28a745 !important;
  }
</style>
