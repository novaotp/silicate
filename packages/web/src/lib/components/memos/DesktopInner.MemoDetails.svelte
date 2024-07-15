<script lang="ts">
    import { deserialize, enhance } from "$app/forms";
    import { page } from "$app/stores";
    import { addToast } from "$lib/stores/toast";
    import { Button } from "$lib/ui";
    import type { Memo } from "$libs/models/Memo";
    import IconTrash from '@tabler/icons-svelte/IconTrash.svelte';
    import IconPinned from '@tabler/icons-svelte/IconPinned.svelte';
    import IconPinnedFilled from '@tabler/icons-svelte/IconPinnedFilled.svelte';
    import IconX from '@tabler/icons-svelte/IconX.svelte';
    import CategoryChanger from "./CategoryChanger.svelte";
    import Inner from "./Inner.MemoDetails.svelte";
    import { changeSearchParams, type MemoPageContext } from "./utils";
    import { getContext } from "svelte";
    import type { SubmitFunction } from "../../../routes/app/memos/$types";

    export let memo: Memo;
    let replica = { ...memo };

    const { memos } = getContext<MemoPageContext>('page');
    let showSettings = false;

    const edit = async () => {
        // Optimistic update
        replica.pinned = !replica.pinned;

        const formData = new FormData();
        formData.set("id", replica.id.toString());
        formData.set("title", replica.title);
        formData.set("content", replica.content);
        formData.set("pinned", String(replica.pinned));
        if (replica.category) {
            formData.set("category", replica.category)
        }

        const response = await fetch(`${$page.url.pathname}?/edit`, {
            method: "POST",
            body: formData
        });

        const result = deserialize<{ memos: Memo[], categories: string[] }, { message: string }>(await response.text());

        if (result.type === "failure") {
            // Optimistic update failover
            replica.pinned = !replica.pinned;
            return addToast({ type: 'error', message: result.data!.message });
        } else if (result.type === "success") {
            $memos = result.data!.memos;
        }

        memo = { ...replica, pinned: replica.pinned }
    };

    const destroyEnhance: SubmitFunction = ({ formData }) => {
        formData.set("id", memo.id!.toString());

        return ({ result }) => {
            if (result.type === "failure") {
                return addToast({ type: 'error', message: result.data!.message });
            } else if (result.type === "success") {
                // @ts-ignore
                addToast({ type: 'success', message: result.data!.message });
                changeSearchParams('id', null);
                $memos = $memos.filter((m) => m.id !== memo.id);
            }
        }
    }
</script>

<header class="relative flex justify-between items-center w-full h-[60px] z-[100] bg-white dark:bg-neutral-900 dark:text-neutral-50">
    <button class="rounded-full" on:click={() => changeSearchParams('id', null)}>
        <IconX />
    </button>
    <div class="flex gap-10 items-center">
        <button class="rounded-full" on:click={edit}>
            {#if replica.pinned}
                <IconPinnedFilled />
            {:else}
                <IconPinned />
            {/if}
        </button>
        <CategoryChanger {memo} />
        <form method="post" action="?/destroy" use:enhance={destroyEnhance}>
            <Button.Danger variant="tertiary" type="submit" class="px-0 h-14 border-0 rounded-none flex justify-start items-center gap-5">
                <IconTrash />
            </Button.Danger>
        </form>
    </div>
</header>
<Inner bind:memo bind:showSettings />
