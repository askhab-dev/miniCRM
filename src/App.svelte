<script lang="ts">
  import { QueryClient, QueryClientProvider } from '@sveltestack/svelte-query'
  import Footer from './components/Footer.svelte';
  import Header from './components/Header.svelte';
  import ClientsList from './components/ClientsList.svelte';

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        refetchOnMount: true,
        retry: 3,
        staleTime: 5 * 60 * 1000,
        cacheTime: 10 * 60 * 1000,
      },
    },
  });

</script>

<QueryClientProvider client={queryClient}>
  <main class="app">
    <Header />

    <div class="layout">
      <ClientsList />
    </div>

    <Footer />
  </main>
</QueryClientProvider>

<style>
  .app {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  .layout {
    display: flex;
    flex: 1;
    max-width: 1400px;
    width: 100%;
    margin: 0 auto;
    padding: 24px;
  }

</style>
