<script lang="ts">
    import { goto } from '$app/navigation';
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
    class="relative flex h-[50px] w-full items-center justify-center
            border-x border-t border-gray-400 first-of-type:rounded-t-md
            last-of-type:rounded-b-md last-of-type:border-b"
>
    <button on:click={() => dispatch('close')} on:click={() => goto(href)} class="relative flex h-full w-full items-center justify-start px-5 gap-5">
        <svelte:component this={icon} />
        <span>{label}</span>
    </button>
</li>
