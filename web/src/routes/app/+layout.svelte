<script lang="ts">
    import Navigation from '$lib/components/shared/Navbar/Navigation.svelte';
    import { onMount, setContext } from 'svelte';
    import type { LayoutServerData } from './$types';
    import { writable } from 'svelte/store';
    import { addToast } from '$lib/stores/toast';
    import { goto } from '$app/navigation';

    export let data: LayoutServerData;

    onMount(() => {
        if (data.message) {
            addToast({ type: "info", message: data.message });
            goto("/auth/login");
        }
    })

    setContext('user', writable(data.user));
    setContext('jwt', data.jwt);
</script>

<div class="relative h-full w-full flex flex-col md:flex-row">
    <Navigation />
    <div class="relative w-full h-[calc(100%-60px)] md:h-full flex flex-col">
        <slot />
    </div>
</div>
