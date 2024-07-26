<script lang="ts">
    import { onMount, onDestroy, createEventDispatcher } from 'svelte';
    import { Editor } from '@tiptap/core';
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
    import SpecificToolbar from './SpecificToolbar.svelte';
    import Toolbar from './Toolbar.svelte';

    export let content: string | undefined = "";

    let element: HTMLDivElement;
    let editor: Editor;
    let show: "headings" | "fontStyles" | "lists" | "other" | null = null;

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

    /** Updates the memo's content in the database. */
    const update = () => dispatch('edit', element.innerHTML);

    const toggleToolbar = (event: CustomEvent<"headings" | "fontStyles" | "lists" | "other" | null>) => {
        const newValue = event.detail;
        show = (show === newValue) ? null : newValue;
    }
</script>

<div
    on:input={update}
    bind:this={element}
    role="textbox"
    tabindex="0"
    spellcheck="false"
    class="relative w-full h-[calc(100%-140px)] {show ? "md:max-h-[400px]" : "md:max-h-[480px]"} outline-none overflow-auto"
></div>

{#if editor}
    <SpecificToolbar {editor} {show} on:update={update} />
    <Toolbar {editor} {show} on:update={update} on:toggle={toggleToolbar} />
{/if}

<style lang="postcss">
    :global(.my-editor) {
        position: relative;
        width: 100%;
        height: 100%;
        @apply dark:text-neutral-50;
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
</style>
