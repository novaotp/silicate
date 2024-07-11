<script lang="ts">
    import ToastContainer from '$components/shared/Toast/Container.svelte';
    import { onMount } from 'svelte';
    import '../app.css';
    import { initTheme } from '$lib/stores/theme';

    onMount(() => {
        initTheme();
    });
</script>

<ToastContainer />
<slot />
