<script lang="ts">
    import IconChevronLeft from '@tabler/icons-svelte/icons/chevron-left';
    import IconDotsVertical from '@tabler/icons-svelte/icons/dots-vertical';
	import { changeSearchParams } from "$utils/change-search-params";
    import { FullScreen } from "$ui/modals";
	import InternalEditor from "../common/internal-editor/InternalEditor.svelte";
	import EditPinnedStatus from './EditPinnedStatus.svelte';
	import DeleteMemo from './DeleteMemo.svelte';

    export let showSettings: boolean;
</script>

<FullScreen>
    <header class="fixed flex justify-between items-center w-full h-[60px] px-5 z-[100] bg-white dark:bg-neutral-950 dark:text-neutral-50">
        <button class="rounded-full" on:click={() => changeSearchParams('id', null)}>
            <IconChevronLeft />
        </button>
        <div class="flex gap-5">
            <EditPinnedStatus />
            <DeleteMemo />
        </div>
    </header>
    <div class="relative w-full h-full flex flex-col justify-start items-start p-5 pt-[60px] gap-5">
        <InternalEditor bind:showSettings />
    </div>
</FullScreen>
