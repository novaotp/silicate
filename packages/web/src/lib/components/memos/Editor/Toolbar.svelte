<script lang="ts">
    import IconArrowBackUp from "@tabler/icons-svelte/IconArrowBackUp.svelte";
    import IconArrowForwardUp from "@tabler/icons-svelte/IconArrowForwardUp.svelte";
    import IconDotsCircleHorizontal from "@tabler/icons-svelte/IconDotsCircleHorizontal.svelte";
    import IconHeading from "@tabler/icons-svelte/IconHeading.svelte";
    import IconLetterCase from "@tabler/icons-svelte/IconLetterCase.svelte";
    import IconList from "@tabler/icons-svelte/IconList.svelte";
    import type { Editor } from "@tiptap/core";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher<{ update: null, toggle: "headings" | "fontStyles" | "lists" | "other" | null }>();

    export let editor: Editor;
    export let show: "headings" | "fontStyles" | "lists" | "other" | null;
</script>

<div class="fixed md:relative w-[calc(100%-40px)] md:w-full h-[60px] bottom-10 md:bottom-auto mx-auto gap-[10px] bg-neutral-100 rounded-lg p-[10px] text-sm flex">
        <button
            on:click={() => dispatch("toggle", "headings")}
            class="relative h-full aspect-square flex justify-center items-center rounded z-50 {show === "headings" ? 'bg-neutral-200' : ''}"
        >
            <IconHeading class="size-5" />
        </button>
        <button
            on:click={() => dispatch("toggle", "fontStyles")}
            class="relative h-full aspect-square flex justify-center items-center rounded z-50 {show === "fontStyles" ? 'bg-neutral-200' : ''}"
        >
            <IconLetterCase class="size-5" />
        </button>
        <button
            on:click={() => {
                editor.commands.undo();
                dispatch("update");
            }}
            disabled={!editor.can().undo()}
            class="relative h-full aspect-square flex justify-center items-center rounded z-50 {editor.can().undo() ? '' : 'text-neutral-500'}"
        >
            <IconArrowBackUp class="size-5" />
        </button>
        <button
            on:click={() => {
                editor.commands.redo();
                dispatch("update");
            }}
            disabled={!editor.can().redo()}
            class="relative h-full aspect-square flex justify-center items-center rounded z-50 {editor.can().redo() ? '' : 'text-neutral-500'}"
        >
            <IconArrowForwardUp class="size-5" />
        </button>
        <button
            on:click={() => dispatch("toggle", "lists")}
            class="relative h-full aspect-square flex justify-center items-center rounded z-50 {show === "lists" ? 'bg-neutral-200' : ''}"
        >
            <IconList class="size-5" />
        </button>
        <button
            on:click={() => dispatch("toggle", "other")}
            class="relative h-full aspect-square flex justify-center items-center rounded z-50 {show === "other" ? 'bg-neutral-200' : ''}"
        >
            <IconDotsCircleHorizontal class="size-5" />
        </button>
</div>
