<script lang="ts">
    import { createEventDispatcher, type ComponentType } from 'svelte';

    export let icon: ComponentType;
    export let href: string;
    export let label: string;

    const dispatch = createEventDispatcher();
</script>

<!--
@component

Renders a link for the floating menu.

* Includes an icon.
-->

<li
    class="relative flex w-full items-center justify-center h-[50px]
            border-x border-t border-gray-400 first-of-type:rounded-t-md
            last-of-type:rounded-b-md last-of-type:border-b dark:border-neutral-500"
>
    <a on:click={() => dispatch('close')} {href} class="relative flex h-full w-full items-center justify-start px-5 gap-5 dark:text-neutral-100">
        <svelte:component this={icon} class="stroke-[1.5]" />
        <span>{label}</span>
    </a>
</li>
