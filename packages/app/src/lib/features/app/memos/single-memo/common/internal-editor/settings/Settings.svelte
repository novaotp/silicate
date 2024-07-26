<script lang="ts">
	import { getContext } from "svelte";
	import { fly } from "svelte/transition";
	import { page } from "$app/stores";
	import IconTrash from "@tabler/icons-svelte/icons/trash";
	import { Overlay } from "$ui/layout";
	import { Button } from "$ui/forms";
	import DeleteMemoConfirmation from "./DeleteMemoConfirmation.svelte";
	import type { Writable } from "svelte/store";
	import type { Memo } from "$common/models/memo";

    export let showSettings: boolean;

    const memos = getContext<Writable<Memo[]>>('memos');

    let showDeleteConfirmation: boolean = false;

    $: memoId = Number($page.url.searchParams.get('memoId')!);
    $: memo = $memos.find(m => m.id === memoId)!;

    const onDeleteMemoClick = () => {
        showSettings = false;
        showDeleteConfirmation = true;
    }
</script>

<Overlay on:click={() => (showSettings = false)} class="flex justify-center items-end z-[999]">
    <div
        role="dialog"
        transition:fly={{ y: 50 }}
        class="fixed w-full flex flex-col shadow-2xl bg-white dark:bg-neutral-700 dark:text-neutral-50"
    >
        <Button.Danger
            on:click={onDeleteMemoClick}
            class="w-full px-5 h-14 border-0 rounded-none flex justify-start items-center gap-10"
        >
            <IconTrash />
            <span>Supprimer</span>
        </Button.Danger>
    </div>
</Overlay>

{#if showDeleteConfirmation}
    <DeleteMemoConfirmation bind:showDeleteConfirmation />
{/if}
