<script lang="ts">
    import { type ComponentType } from 'svelte';

    export let icon: ComponentType;
    export let href: string;
    export let label: string;
</script>

<!--
@component

Renders a link for the floating menu.

* Includes an icon.
-->

<li class="relative flex w-full h-[60px] items-center justify-center">
    <a {href} on:click class="relative flex h-full w-full items-center justify-start gap-8 p-2 text-center rounded-md hover:bg-stone-400 text-sm">
        <svelte:component this={icon} class="min-w-6 min-h-6" />
        <span>{label}</span>
    </a>
</li>
