<script lang="ts">
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { Editor } from '@tiptap/core';
    import IconAlignCenter from "@tabler/icons-svelte/IconAlignCenter.svelte";
    import IconAlignJustified from "@tabler/icons-svelte/IconAlignJustified.svelte";
    import IconAlignLeft from "@tabler/icons-svelte/IconAlignLeft.svelte";
    import IconAlignRight from "@tabler/icons-svelte/IconAlignRight.svelte";
    import IconArrowBackUp from "@tabler/icons-svelte/IconArrowBackUp.svelte";
    import IconArrowForwardUp from "@tabler/icons-svelte/IconArrowForwardUp.svelte";
    import IconBold from "@tabler/icons-svelte/IconBold.svelte";
    import IconDotsCircleHorizontal from "@tabler/icons-svelte/IconDotsCircleHorizontal.svelte";
    import IconHeading from "@tabler/icons-svelte/IconHeading.svelte";
    import IconIndentDecrease from "@tabler/icons-svelte/IconIndentDecrease.svelte";
    import IconIndentIncrease from "@tabler/icons-svelte/IconIndentIncrease.svelte";
    import IconItalic from "@tabler/icons-svelte/IconItalic.svelte";
    import IconLetterCase from "@tabler/icons-svelte/IconLetterCase.svelte";
    import IconList from "@tabler/icons-svelte/IconList.svelte";
    import IconListNumbers from "@tabler/icons-svelte/IconListNumbers.svelte";
    import IconSeparator from "@tabler/icons-svelte/IconSeparator.svelte";
    import IconStrikethrough from "@tabler/icons-svelte/IconStrikethrough.svelte";
    import Document from '@tiptap/extension-document';
    import BulletList from '@tiptap/extension-bullet-list';
    import ListItem from '@tiptap/extension-list-item';
    import Paragraph from '@tiptap/extension-paragraph';
    import Text from '@tiptap/extension-text';
    import Bold from '@tiptap/extension-bold';
    import Italic from '@tiptap/extension-italic';
    import Strike from '@tiptap/extension-strike';
    import Underline from '@tiptap/extension-underline';
    import Heading from '@tiptap/extension-heading';
    import HorizontalRule from '@tiptap/extension-horizontal-rule';
    import History from '@tiptap/extension-history';
    import OrderedList from '@tiptap/extension-ordered-list';
    import TextAlign from '@tiptap/extension-text-align';

    export let content: string;
    let element: HTMLDivElement;
    let editor: Editor;

    let showOtherOptions: boolean = false;
    let showHeadings: boolean = false;
    let showFontStylings: boolean = false;
    let showListOptions: boolean = false;

    const dispatch = createEventDispatcher<{ edit: string }>();

    onMount(() => {
        editor = new Editor({
            element: element,
            extensions: [
                Document,
                Paragraph,
                Text,
                BulletList,
                ListItem,
                Bold,
                Italic,
                Strike,
                Heading,
                Underline,
                HorizontalRule,
                History,
                TextAlign.configure({
                    types: ['heading', 'paragraph'],
                }),
                OrderedList
            ],
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

<div
    bind:this={element}
    class="relative w-full h-[calc(100%-140px)] outline-none overflow-auto"
    on:change={() => {
        dispatch('edit', editor.getHTML());
    }}
/>
{#if showHeadings || showFontStylings || showListOptions || showOtherOptions}
    <div class="fixed w-[calc(100%-40px)] h-[60px] bottom-[90px] mx-auto gap-[10px] bg-neutral-100 rounded-lg p-[10px] text-sm flex">
        {#if showHeadings}
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
        {:else if showFontStylings}
            <button
                on:click={() => editor.chain().focus().toggleBold().run()}
                class:active={editor.isActive('bold')}
                class="relative h-full aspect-square flex justify-center items-center rounded z-50"
            >
                <IconBold class="size-5" />
            </button>
            <button
                on:click={() => editor.chain().focus().toggleItalic().run()}
                class:active={editor.isActive('italic')}
                class="relative h-full aspect-square flex justify-center items-center rounded z-50"
            >
                <IconItalic class="size-5" />
            </button>
            <button
                on:click={() => editor.chain().focus().toggleStrike().run()}
                class:active={editor.isActive('strike')}
                class="relative h-full aspect-square flex justify-center items-center rounded z-50"
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

                    dispatch('edit', editor.getHTML());
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
        {:else if showListOptions}
            <button
                on:click={() => editor.chain().focus().toggleBulletList().run()}
                class:active={editor.isActive('bulletList')}
                class="relative h-full aspect-square flex justify-center items-center rounded z-50"
            >
                <IconList class="size-5" />
            </button>
            <button
                on:click={() => editor.chain().focus().toggleOrderedList().run()}
                class:active={editor.isActive('orderedList')}
                class="relative h-full aspect-square flex justify-center items-center rounded z-50"
            >
                <IconListNumbers class="size-5" />
            </button>
            <button
                on:click={() => editor.chain().focus().liftListItem('listItem').run()}
                disabled={!editor.isActive('listItem')}
                class="relative h-full aspect-square flex justify-center items-center rounded z-50 {editor.isActive('listItem')
                    ? ''
                    : 'text-neutral-500'}"
            >
                <IconIndentDecrease class="size-5" />
            </button>
            <button
                on:click={() => editor.chain().focus().sinkListItem('listItem').run()}
                disabled={!editor.isActive('listItem')}
                class="relative h-full aspect-square flex justify-center items-center rounded z-50 {editor.isActive('listItem')
                    ? ''
                    : 'text-neutral-500'}"
            >
                <IconIndentIncrease class="size-5" />
            </button>
        {:else if showOtherOptions}
            <button
                on:click={() => editor.commands.setHorizontalRule()}
                class="relative h-full aspect-square flex justify-center items-center rounded z-50"
            >
                <IconSeparator class="size-5" />
            </button>
        {/if}
    </div>
{/if}
<div class="fixed w-[calc(100%-40px)] h-[60px] bottom-5 mx-auto gap-[10px] bg-neutral-100 rounded-lg p-[10px] text-sm flex">
    {#if editor}
        <button
            on:click={() => {
                showOtherOptions = false;
                showFontStylings = false;
                showListOptions = false;
                showHeadings = !showHeadings;
            }}
            class="relative h-full aspect-square flex justify-center items-center rounded z-50 {showHeadings ? 'bg-neutral-200' : ''}"
        >
            <IconHeading class="size-5" />
        </button>
        <button
            on:click={() => {
                showOtherOptions = false;
                showHeadings = false;
                showListOptions = false;
                showFontStylings = !showFontStylings;
            }}
            class="relative h-full aspect-square flex justify-center items-center rounded z-50 {showFontStylings ? 'bg-neutral-200' : ''}"
        >
            <IconLetterCase class="size-5" />
        </button>
        <button
            on:click={() => {
                editor.commands.undo();
                dispatch('edit', editor.getHTML());
            }}
            disabled={!editor.can().undo()}
            class="relative h-full aspect-square flex justify-center items-center rounded z-50 {editor.can().undo() ? '' : 'text-neutral-500'}"
        >
            <IconArrowBackUp class="size-5" />
        </button>
        <button
            on:click={() => {
                editor.commands.redo();
                dispatch('edit', editor.getHTML());
            }}
            disabled={!editor.can().redo()}
            class="relative h-full aspect-square flex justify-center items-center rounded z-50 {editor.can().redo() ? '' : 'text-neutral-500'}"
        >
            <IconArrowForwardUp class="size-5" />
        </button>
        <button
            on:click={() => {
                showOtherOptions = false;
                showHeadings = false;
                showFontStylings = false;
                showListOptions = !showListOptions;
            }}
            class="relative h-full aspect-square flex justify-center items-center rounded z-50 {showListOptions ? 'bg-neutral-200' : ''}"
        >
            <IconList class="size-5" />
        </button>
        <button
            on:click={() => {
                showHeadings = false;
                showFontStylings = false;
                showListOptions = false;
                showOtherOptions = !showOtherOptions;
            }}
            class="relative h-full aspect-square flex justify-center items-center rounded z-50 {showOtherOptions ? 'bg-neutral-200' : ''}"
        >
            <IconDotsCircleHorizontal class="size-5" />
        </button>
    {/if}
</div>

<style>
    :global(.my-editor) {
        position: relative;
        width: 100%;
        height: 100%;
    }

    :global(.my-editor:focus-visible) {
        outline: none;
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

    :global(.my-editor ol) {
        list-style: decimal;
        margin-left: 20px;
    }

    :global(.my-editor a) {
        text-decoration: underline;
        color: blue;
    }

    button.active {
        background: black;
        color: white;
    }
</style>
