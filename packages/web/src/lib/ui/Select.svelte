<script lang="ts">
    import { cn } from '$utils/cn';
    import { createEventDispatcher } from 'svelte';
    import IconSelector from '@tabler/icons-svelte/IconSelector.svelte';
    import { flyAndScale } from '$utils/transitions/fly-and-scale';
    import { scale } from 'svelte/transition';
    import { clickOutside } from '$utils/click-outside';

    export let items: { value: string; label: string }[];
    export let invert: boolean = false;

    let triggerNode: HTMLButtonElement;
    let showList: boolean = false;
    const dispatch = createEventDispatcher<{ change: string }>();

    const onChange = (value: string) => {
        dispatch('change', value);
        showList = false;
    };
</script>

<div role="listbox" class={cn('relative flex flex-col h-full text-sm', $$restProps['class'] || '')}>
    <button
        bind:this={triggerNode}
        class="relative h-full rounded-lg px-5 flex justify-center items-center gap-5 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-50"
        on:click={() => (showList = !showList)}
    >
        <slot />
        <IconSelector class="size-5" />
    </button>
    {#if showList}
        <ul
            in:flyAndScale
            out:scale={{ start: 0.95, opacity: 0, duration: 50 }}
            use:clickOutside={{ avoid: [triggerNode] }}
            on:emit={() => (showList = !showList)}
            class="absolute {invert ? "bottom-[calc(100%+10px)]" : "top-[calc(100%+10px)]"} left-0 w-full rounded-lg overflow-hidden flex flex-col bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-50 shadow-[0_0_2px_2px_rgba(0,0,0,0.1)] z-10
                   divide-y-[1px] divide-neutral-100 dark:divide-neutral-500"
        >
            {#each items as { value, label }}
                <li class="relative w-full h-[50px]">
                    <button
                        on:click={() => onChange(value)}
                        class="relative w-full h-full flex justify-center items-center hover:bg-neutral-200 dark:hover:bg-neutral-700 duration-100"
                    >
                        {label}
                    </button>
                </li>
            {/each}
        </ul>
    {/if}
</div>
