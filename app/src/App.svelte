<script lang="ts">
    import Router from 'svelte-spa-router';
    import { routes } from './router';
    import ToastContainer from '$lib/components/Toast/Container.svelte';
</script>

<Router {routes} />
<ToastContainer />
