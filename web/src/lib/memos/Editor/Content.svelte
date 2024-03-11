<script lang="ts">
    import { parse } from 'marked';

    export let content: string;
    export const bold: boolean = true;
    export const italic: boolean = false;
    export let isPreview: boolean;

    $: modifiedContent = content;

    const surroundSelection = (surround: string = "") => {
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
    };
    
</script>

{#if !isPreview}
    <textarea
        bind:value={modifiedContent}
        class="relative w-full h-full"
        on:click={() => surroundSelection()}
    ></textarea>
{:else}
    <div class="relative w-full h-full">
        {@html `${parse(modifiedContent)}
            <style>
                @import url("./Content.styles.css");
            </style>`}
    </div>
{/if}
