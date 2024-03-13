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
    <textarea
        bind:value={content}
        class="relative w-full h-full"
        on:keyup={() => dispatch("edit")}
    ></textarea>
{:else}
    <div class="relative w-full h-full">
        {@html `${parse(content)}
            <style>
                @import url("./Content.styles.css");
            </style>`}
    </div>
{/if}
