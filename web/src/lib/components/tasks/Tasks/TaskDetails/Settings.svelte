<script lang="ts">
    import { page } from '$app/stores';
    import { IconArchive, IconArchiveOff, IconTrash } from '@tabler/icons-svelte';
    import { createEventDispatcher } from 'svelte';
    import { fade, fly } from 'svelte/transition';

    export let show: boolean;
    export let archived: boolean;

    const dispatch = createEventDispatcher<{ close: null, destroy: null, archive: null }>();
</script>

{#if show}
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
    <div
        class="md:hidden fixed flex h-full w-full top-0 left-0 justify-center items-end z-[110] bg-[rgba(0,0,0,0.1)]"
        on:click={() => dispatch('close')}
        transition:fade
    >
        <div role="dialog" class="fixed w-full rounded-md flex flex-col p-5 gap-4 shadow-2xl bg-white" transition:fly={{ y: 50 }}>
            <button on:click={() => dispatch("destroy")} class="relative w-full h-5 flex justify-start items-center gap-10">
                <IconTrash />
                <span>Supprimer</span>
            </button>
            <button on:click={() => dispatch("archive")} class="relative w-full h-5 flex justify-start items-center gap-10">
                {#if archived}
                    <IconArchiveOff />
                    <span>Retirer de l'archive</span>
                {:else}
                    <IconArchive />
                    <span>Archiver</span>
                {/if}
            </button>
        </div>
    </div>
{/if}
