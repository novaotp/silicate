<script lang="ts">
    import { parse } from 'marked';
    import { createEventDispatcher } from 'svelte';

    export let content: string;
    export let isPreview: boolean;

    const dispatch = createEventDispatcher();

    /* const surroundSelection = (surround: string = "") => {
        if (window.getSelection) {
            const selection = window.getSelection();

            console.log("Here !")
            console.log(selection?.rangeCount)
                const range = selection?.getRangeAt(0).cloneRange();
                console.log(range?.toString());
                // surroundContents(surround);
                selection?.removeAllRanges();
                selection?.addRange(range!);
        }
    }; */
</script>

{#if !isPreview}
    <textarea bind:value={content} class="relative w-full h-full" on:keyup={() => dispatch('edit')}></textarea>
{:else}
    <div class="relative w-full h-full">
        {@html parse(content)}
    </div>
{/if}

<style>
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: 700;
    }

    h1 {
        font-size: 2em;
    }

    h2 {
        font-size: 1.5em;
    }

    h3 {
        font-size: 1.17em;
    }

    h4 {
        font-size: 1em;
    }

    h5 {
        font-size: 0.83em;
    }

    h6 {
        font-size: 0.67em;
    }

    ul {
        list-style: circle;
    }
</style>
