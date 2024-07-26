<script lang="ts">
    import IconX from '@tabler/icons-svelte/icons/x';
	import { Card, Overlay } from "$ui/layout";
	import { changeSearchParams } from "$utils/change-search-params";
	import DeleteMemo from "./DeleteMemo.svelte";
	import EditPinnedStatus from "./EditPinnedStatus.svelte";
	import InternalEditor from "../common/internal-editor/InternalEditor.svelte";

    export let showSettings: boolean;
</script>

<Overlay on:click={() => changeSearchParams('id', null)} class="hidden md:flex justify-center items-center">
    <Card class="w-[760px] max-h-[760px]">
        <header class="relative flex justify-between items-center w-full h-[60px] z-[100] bg-white dark:bg-neutral-900 dark:text-neutral-50">
            <button class="rounded-full" on:click={() => changeSearchParams('id', null)}>
                <IconX />
            </button>
            <div class="flex gap-10 items-center">
                <EditPinnedStatus />
                <!-- <CategoryChanger {memo} /> -->
                <DeleteMemo />
            </div>
        </header>
        <InternalEditor bind:showSettings />
    </Card>
</Overlay>
