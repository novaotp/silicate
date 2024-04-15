<script lang="ts">
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { Editor } from '@tiptap/core';
    import { IconBold, IconHeading, IconItalic, IconList, IconStrikethrough } from '@tabler/icons-svelte';
    import Document from '@tiptap/extension-document';
    import BulletList from '@tiptap/extension-bullet-list';
    import ListItem from '@tiptap/extension-list-item';
    import Paragraph from '@tiptap/extension-paragraph';
    import Text from '@tiptap/extension-text';
    import Bold from '@tiptap/extension-bold';
    import Italic from '@tiptap/extension-italic';
    import Strike from '@tiptap/extension-strike';
    import Heading from "@tiptap/extension-heading";

    export let content: string;
    let element: HTMLDivElement;
    let editor: Editor;
    let showHeadings: boolean = false;

    const dispatch = createEventDispatcher<{ edit: string }>();

    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [Document, Paragraph, Text, BulletList, ListItem, Bold, Italic, Strike, Heading],
            content: content,
            editorProps: {
                attributes: {
                    class: 'my-editor'
                }
            },
            onTransaction: () => {
                // force re-render so `editor.isActive` works as expected
                editor = editor;
            }
        });
    });

    onDestroy(() => {
        if (editor) {
            editor.destroy();
        }
    });
</script>

<div bind:this={element} class="relative w-full h-full editor" on:input={() => dispatch('edit', editor.getHTML())} />

<div class="relative w-full min-h-[60px] gap-[10px] bg-neutral-100 rounded-lg p-[10px] text-sm flex">
    {#if editor}
        <div class="relative w-[40px]">
            <button
                on:click={() => (showHeadings = !showHeadings)}
                class="relative h-full aspect-square flex justify-center items-center rounded z-50 {showHeadings ? 'bg-neutral-200' : ''}"
            >
                <IconHeading />
            </button>
            <div class="absolute {showHeadings ? 'flex' : 'hidden'} bottom-[calc(100%+20px)] bg-neutral-100 w-full aspect-square flex-col">
                <button
                    class="relative h-full aspect-square flex justify-center items-center rounded"
                    on:click={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                    class:active={editor.isActive('heading', { level: 1 })}
                >
                    H1
                </button>
                <button
                    class="relative h-full aspect-square flex justify-center items-center rounded"
                    on:click={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                    class:active={editor.isActive('heading', { level: 2 })}
                >
                    H2
                </button>
                <button
                    class="relative h-full aspect-square flex justify-center items-center rounded"
                    on:click={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                    class:active={editor.isActive('heading', { level: 3 })}
                >
                    H3
                </button>
                <button
                    class="relative h-full aspect-square flex justify-center items-center rounded"
                    on:click={() => editor.chain().focus().setParagraph().run()}
                    class:active={editor.isActive('paragraph')}
                >
                    P
                </button>
            </div>
        </div>
        <button
            on:click={() => editor.chain().focus().toggleBold().run()}
            class:active={editor.isActive('bold')}
            class="relative h-full aspect-square flex justify-center items-center rounded z-50 {showHeadings ? 'bg-neutral-200' : ''}"
        >
            <IconBold />
        </button>
        <button
            on:click={() => editor.chain().focus().toggleItalic().run()}
            class:active={editor.isActive('italic')}
            class="relative h-full aspect-square flex justify-center items-center rounded z-50 {showHeadings ? 'bg-neutral-200' : ''}"
        >
            <IconItalic />
        </button>
        <button
            on:click={() => editor.chain().focus().toggleStrike().run()}
            class:active={editor.isActive('strike')}
            class="relative h-full aspect-square flex justify-center items-center rounded z-50 {showHeadings ? 'bg-neutral-200' : ''}"
        >
            <IconStrikethrough />
        </button>
        <button
            on:click={() => editor.chain().focus().toggleBulletList().run()}
            class:active={editor.isActive('bulletList')}
            class="relative h-full aspect-square flex justify-center items-center rounded z-50 {showHeadings ? 'bg-neutral-200' : ''}"
        >
            <IconList />
        </button>
    {/if}
</div>

<style>
    :global(.my-editor) {
        position: relative;
        width: 100%;
        height: 100%;
    }
    :global(.my-editor h1) {
        font-size: 20px;
        font-weight: 600;
    }

    :global(.my-editor h2) {
        font-size: 18px;
        font-weight: 600;
    }

    :global(.my-editor h3) {
        font-size: 16px;
        font-weight: 600;
    }

    :global(.my-editor p) {
        font-size: 14px;
        font-weight: 400;
    }

    :global(.my-editor ul) {
        list-style: square;
        margin-left: 20px;
    }

    :global(.my-editor ul ul) {
        list-style: circle;
        margin-left: 20px;
    }

    button.active {
        background: black;
        color: white;
    }
</style>
