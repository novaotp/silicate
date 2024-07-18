<script lang="ts">
    import type { Group } from '$libs/models/Mark';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import Header from './Header/Header.svelte';
    import BookData from './BookData/BookData.svelte';
    import GroupList from './GroupList.svelte';
    import EmptyBook from './EmptyBook.svelte';
    import GroupCreationModal from './GroupCreationModal.svelte';
    import Add from './Add.svelte';
    import SubjectCreationModal from './SubjectCreationModal.svelte';

    const groups = getContext<Writable<Group[]>>('groups');

    let showBookEditionModal: boolean = false;
    let showGroupCreationModal: boolean = false;
    let showSubjectCreationModal: boolean = false;
</script>

<!--
@component
The main component of the mark-book's page.
-->

<Header />
<BookData bind:showBookEditionModal />
{#if $groups.length > 0}
    <GroupList />
    <Add bind:showGroupCreationModal bind:showSubjectCreationModal />
{:else}
    <EmptyBook bind:showGroupCreationModal />
{/if}

{#if showGroupCreationModal}
    <GroupCreationModal on:close={() => (showGroupCreationModal = false)} />
{/if}

{#if showSubjectCreationModal}
    <SubjectCreationModal on:close={() => (showSubjectCreationModal = false)} />
{/if}
