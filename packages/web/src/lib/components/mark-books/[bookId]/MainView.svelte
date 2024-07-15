<script lang="ts">
    import type { Group } from '$libs/models/Mark';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import { Button } from '$lib/ui';
    import IconPlus from '@tabler/icons-svelte/IconPlus.svelte';
    import Header from './Header/Header.svelte';
    import BookData from './BookData/BookData.svelte';
    import GroupList from './GroupList.svelte';
    import EmptyBook from './EmptyBook.svelte';

    const groups = getContext<Writable<Group[]>>('groups');

    let showBookEditionModal: boolean = false;
</script>

<Header />
<BookData bind:showBookEditionModal />
{#if $groups.length > 0}
    <GroupList />
    <Button.Normal
        on:click={() => (showBookEditionModal = true)}
        class="fixed bottom-5 right-5 w-[60px] aspect-square flex-center gap-5"
    >
        <IconPlus class="min-w-5 min-h-5" />
        <span class="hidden md:block whitespace-nowrap">Ajouter un groupe</span>
    </Button.Normal>
{:else}
    <EmptyBook bind:showBookEditionModal />
{/if}
