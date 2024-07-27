<script lang="ts">
    import IconAlignCenter from '@tabler/icons-svelte/icons/align-center';
    import IconAlignJustified from '@tabler/icons-svelte/icons/align-justified';
    import IconAlignLeft from '@tabler/icons-svelte/icons/align-left';
    import IconAlignRight from '@tabler/icons-svelte/icons/align-right';
    import IconBold from '@tabler/icons-svelte/icons/bold';
    import IconIndentDecrease from '@tabler/icons-svelte/icons/indent-decrease';
    import IconIndentIncrease from '@tabler/icons-svelte/icons/indent-increase';
    import IconItalic from '@tabler/icons-svelte/icons/italic';
    import IconList from '@tabler/icons-svelte/icons/list';
    import IconListNumbers from '@tabler/icons-svelte/icons/list-numbers';
    import IconSeparator from '@tabler/icons-svelte/icons/separator';
    import IconStrikethrough from '@tabler/icons-svelte/icons/strikethrough';
    import type { Editor } from "@tiptap/core";
    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher<{ update: null }>();

    export let editor: Editor;
    export let show: "headings" | "fontStyles" | "lists" | "other" | null;
</script>

{#if show}
    <div class="fixed md:relative w-[calc(100%-40px)] md:w-full h-[60px] bottom-[90px] md:mb-5 md:bottom-auto mx-auto gap-[10px] bg-neutral-100 dark:bg-neutral-700 rounded-lg p-[10px] text-sm flex">
        {#if show === "headings"}
            <button
                class="relative h-full aspect-square flex justify-center items-center rounded dark:text-neutral-50"
                on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                class:active={editor.isActive('heading', { level: 1 })}
            >
                H1
            </button>
            <button
                class="relative h-full aspect-square flex justify-center items-center rounded dark:text-neutral-50"
                on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                class:active={editor.isActive('heading', { level: 2 })}
            >
                H2
            </button>
            <button
                class="relative h-full aspect-square flex justify-center items-center rounded dark:text-neutral-50"
                on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                class:active={editor.isActive('heading', { level: 3 })}
            >
                H3
            </button>
            <button
                class="relative h-full aspect-square flex justify-center items-center rounded dark:text-neutral-50"
                on:click={() => editor.chain().focus().setParagraph().run()}
                class:active={editor.isActive('paragraph')}
            >
                P
            </button>
        {:else if show === "fontStyles"}
            <button
                on:click={() => editor.chain().focus().toggleBold().run()}
                class:active={editor.isActive('bold')}
                class="relative h-full aspect-square flex justify-center items-center rounded dark:text-neutral-50 z-50"
            >
                <IconBold class="size-5" />
            </button>
            <button
                on:click={() => {
                    editor.chain().focus().toggleItalic().run();
                    dispatch("update");
                }}
                class:active={editor.isActive('italic')}
                class="relative h-full aspect-square flex justify-center items-center rounded dark:text-neutral-50 z-50"
            >
                <IconItalic class="size-5" />
            </button>
            <button
                on:click={() => editor.chain().focus().toggleStrike().run()}
                class:active={editor.isActive('strike')}
                class="relative h-full aspect-square flex justify-center items-center rounded dark:text-neutral-50 z-50"
            >
                <IconStrikethrough class="size-5" />
            </button>
            <button
                on:click={() => {
                    if (editor.isActive({ textAlign: 'left' })) {
                        editor.chain().focus().setTextAlign('center').run();
                    } else if (editor.isActive({ textAlign: 'center' })) {
                        editor.chain().focus().setTextAlign('right').run();
                    } else if (editor.isActive({ textAlign: 'right' })) {
                        editor.chain().focus().setTextAlign('justify').run();
                    } else if (editor.isActive({ textAlign: 'justify' })) {
                        editor.chain().focus().setTextAlign('left').run();
                    }

                    dispatch('update');
                }}
            >
                {#if editor.isActive({ textAlign: 'left' })}
                    <IconAlignLeft />
                {:else if editor.isActive({ textAlign: 'center' })}
                    <IconAlignCenter />
                {:else if editor.isActive({ textAlign: 'right' })}
                    <IconAlignRight />
                {:else if editor.isActive({ textAlign: 'justify' })}
                    <IconAlignJustified />
                {/if}
            </button>
        {:else if show === "lists"}
            <button
                on:click={() => editor.chain().focus().toggleBulletList().run()}
                class:active={editor.isActive('bulletList')}
                class="relative h-full aspect-square flex justify-center items-center rounded dark:text-neutral-50 z-50"
            >
                <IconList class="size-5" />
            </button>
            <button
                on:click={() => editor.chain().focus().toggleOrderedList().run()}
                class:active={editor.isActive('orderedList')}
                class="relative h-full aspect-square flex justify-center items-center rounded dark:text-neutral-50 z-50"
            >
                <IconListNumbers class="size-5" />
            </button>
            <button
                on:click={() => editor.chain().focus().liftListItem('listItem').run()}
                disabled={!editor.isActive('listItem')}
                class="relative h-full aspect-square flex justify-center items-center rounded dark:text-neutral-50 z-50 {editor.isActive('listItem')
                    ? ''
                    : 'text-neutral-500'}"
            >
                <IconIndentDecrease class="size-5" />
            </button>
            <button
                on:click={() => editor.chain().focus().sinkListItem('listItem').run()}
                disabled={!editor.isActive('listItem')}
                class="relative h-full aspect-square flex justify-center items-center rounded dark:text-neutral-50 z-50 {editor.isActive('listItem')
                    ? ''
                    : 'text-neutral-500'}"
            >
                <IconIndentIncrease class="size-5" />
            </button>
        {:else if show === "other"}
            <button
                on:click={() => editor.commands.setHorizontalRule()}
                class="relative h-full aspect-square flex justify-center items-center rounded dark:text-neutral-50 z-50"
            >
                <IconSeparator class="size-5" />
            </button>
        {/if}
    </div>
{/if}
