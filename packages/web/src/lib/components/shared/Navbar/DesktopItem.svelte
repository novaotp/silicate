<script lang="ts">
    import { page } from '$app/stores';
    import { type ComponentType } from 'svelte';

    export let icon: ComponentType;
    export let href: string;
    export let label: string;

    $: pathname = $page.url.pathname;
</script>

<!--
@component

Renders a link for the floating menu.

* Includes an icon.
-->

<li class="relative flex w-full items-center justify-center">
    <a
        {href}
        on:click
        class="link group relative flex h-full w-full items-center justify-start py-[10px] text-center text-sm overflow-hidden"
        class:current={pathname === href}
    >
        <span class="relative min-w-20 h-full flex justify-center items-center">
            <svelte:component this={icon} class="group-hover:text-primary-600 min-w-6 min-h-6" />
        </span>
        <span class="group-hover:text-primary-600">{label}</span>
    </a>
</li>

<style lang="postcss">
    .current {
        @apply text-primary-600;
    }

    .current::before {
        @apply content-[""] absolute top-0 left-[1px] w-[2px] h-full bg-primary-600;
    }
</style>
