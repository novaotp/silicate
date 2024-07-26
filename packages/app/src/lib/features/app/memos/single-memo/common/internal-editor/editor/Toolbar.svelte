<script lang="ts">
    import IconArrowBackUp from '@tabler/icons-svelte/icons/arrow-back-up';
    import IconArrowForwardUp from '@tabler/icons-svelte/icons/arrow-forward-up';
    import IconDotsCircleHorizontal from '@tabler/icons-svelte/icons/dots-circle-horizontal';
    import IconHeading from '@tabler/icons-svelte/icons/heading';
    import IconLetterCase from '@tabler/icons-svelte/icons/letter-case';
    import IconList from '@tabler/icons-svelte/icons/list';
    import type { Editor } from "@tiptap/core";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher<{ update: null, toggle: "headings" | "fontStyles" | "lists" | "other" | null }>();

    export let editor: Editor;
    export let show: "headings" | "fontStyles" | "lists" | "other" | null;
</script>

<div class="fixed md:relative w-[calc(100%-40px)] md:w-full h-[60px] bottom-5 md:bottom-auto mx-auto gap-[10px] bg-neutral-100 dark:bg-neutral-800 rounded-lg p-[10px] text-sm flex">
        <button
            on:click={() => dispatch("toggle", "headings")}
            class="relative h-full aspect-square flex justify-center items-center dark:text-neutral-50 rounded z-50 {show === "headings" ? 'bg-neutral-200 dark:bg-neutral-600' : ''}"
        >
            <IconHeading class="size-5" />
        </button>
        <button
            on:click={() => dispatch("toggle", "fontStyles")}
            class="relative h-full aspect-square flex justify-center items-center dark:text-neutral-50 rounded z-50 {show === "fontStyles" ? 'bg-neutral-200 dark:bg-neutral-600' : ''}"
        >
            <IconLetterCase class="size-5" />
        </button>
        <button
            on:click={() => {
                editor.commands.undo();
                dispatch("update");
            }}
            disabled={!editor.can().undo()}
            class="relative h-full aspect-square flex justify-center items-center dark:text-neutral-50 rounded z-50 {editor.can().undo() ? '' : 'text-neutral-500'}"
        >
            <IconArrowBackUp class="size-5" />
        </button>
        <button
            on:click={() => {
                editor.commands.redo();
                dispatch("update");
            }}
            disabled={!editor.can().redo()}
            class="relative h-full aspect-square flex justify-center items-center dark:text-neutral-50 rounded z-50 {editor.can().redo() ? '' : 'text-neutral-500'}"
        >
            <IconArrowForwardUp class="size-5" />
        </button>
        <button
            on:click={() => dispatch("toggle", "lists")}
            class="relative h-full aspect-square flex justify-center items-center dark:text-neutral-50 rounded z-50 {show === "lists" ? 'bg-neutral-200 dark:bg-neutral-600' : ''}"
        >
            <IconList class="size-5" />
        </button>
        <button
            on:click={() => dispatch("toggle", "other")}
            class="relative h-full aspect-square flex justify-center items-center dark:text-neutral-50 rounded z-50 {show === "other" ? 'bg-neutral-200 dark:bg-neutral-600' : ''}"
        >
            <IconDotsCircleHorizontal class="size-5" />
        </button>
</div>
