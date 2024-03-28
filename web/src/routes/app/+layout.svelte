<script lang="ts">
    import Navigation from '$lib/components/shared/Navbar/Navigation.svelte';
    import { setContext } from 'svelte';
    import type { LayoutServerData } from './$types';
    import { writable } from 'svelte/store';

    export let data: LayoutServerData;

    setContext('user', writable(data.user));
</script>

<div class="relative h-full w-full flex flex-col md:flex-row">
    <Navigation />
    <div class="relative w-full h-[calc(100%-60px)] md:h-full flex flex-col">
        <slot />
    </div>
</div>
