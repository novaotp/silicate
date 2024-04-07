<script lang="ts">
    import { IconNotes } from '@tabler/icons-svelte';
    import { createEventDispatcher } from 'svelte';

    export let value: string;

    const maxRows: number = 5;
    $: totalRows = (value.match(/\n/g) || []).length + 1 || 1;
    $: rows = expanded ? totalRows : maxRows;

    const dispatch = createEventDispatcher<{ edit: null }>();
    let timer: NodeJS.Timeout;
    let expanded: boolean = false;

    /**
     * @see https://svelte.dev/repl/1c7c89b3a80c48708f0f07720fb37a53?version=4.2.12
     */
    const resize = (node: Element) => {
        let rect: DOMRectReadOnly;
        let target: Element;

        const observer = new ResizeObserver((entries, observer) => {
            for (let entry of entries) {
                rect = entry.contentRect;
                target = entry.target;
            }

            node.dispatchEvent(
                new CustomEvent('resize', {
                    detail: { rect, target }
                })
            );
        });

        observer.observe(node);

        return {
            destroy() {
                observer.disconnect();
            }
        };
    };
</script>

<div class="relative w-full flex flex-col gap-3 text-gray-500">
    <div class="relative w-full flex justify-between">
        <div class="flex gap-4">
            <IconNotes />
            <h3>Description</h3>
        </div>
        <button on:click={() => (expanded = !expanded)} class="text-sm text-gray-500">
            { expanded ? "Réduire" : "Étendre" }
        </button>
    </div>
    <textarea
        {rows}
        bind:value
        use:resize
        spellcheck={false}
        on:focus={() => (expanded = true)}
        on:input={() => {
            clearTimeout(timer);
            timer = setTimeout(() => dispatch('edit'), 750);
        }}
        class="relative w-full flex flex-col p-5 rounded-lg border border-gray-300 text-black text-sm resize-none"
    ></textarea>
</div>
