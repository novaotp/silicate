<script lang="ts">
    import IconX from '@tabler/icons-svelte/icons/x';
	import { Card, Overlay } from "$ui/layout";
	import { changeSearchParams } from "$utils/change-search-params";
	import DeleteMemo from "./DeleteMemo.svelte";
	import EditPinnedStatus from "./EditPinnedStatus.svelte";
	import InternalEditor from "../common/internal-editor/InternalEditor.svelte";

    export let showSettings: boolean;
</script>

<Overlay z={2} on:click={() => changeSearchParams('id', null)} />
<div class="fixed w-full h-full top-0 left-0 flex justify-center items-center z-3">
    <Card class="w-[760px] max-h-[760px]">
        <header class="relative flex justify-between items-center w-full z-[100] bg-white dark:bg-neutral-900 dark:text-neutral-50">
            <button class="rounded-full" on:click={() => changeSearchParams('id', null)}>
                <IconX />
            </button>
            <div class="relative flex gap-5 items-center">
                <EditPinnedStatus />
                <!-- <CategoryChanger {memo} /> -->
                <DeleteMemo />
            </div>
        </header>
        <InternalEditor bind:showSettings />
    </Card>
</div>
