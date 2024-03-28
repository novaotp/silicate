<script lang="ts">
    import type { User } from '$libs/models/User';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import type { PageData } from './$types';

    export let data: PageData;

    const user = getContext<Writable<User>>('user');
</script>

<svelte:head>
    <title>Dashboard - Silicate</title>
</svelte:head>

{#if !data.user}
    <p>Something went wrong.</p>
{:else}
    <main class="px-5 flex flex-col gap-5">
        <h1 class="text-2xl font-semibold">Content de te revoir, {$user.firstName} !</h1>
    </main>
{/if}
