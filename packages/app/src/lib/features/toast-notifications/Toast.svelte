<script lang="ts">
    import SuccessIcon from '@tabler/icons-svelte/icons/check';
    import ErrorIcon from '@tabler/icons-svelte/icons/exclamation-circle';
    import InfoIcon from '@tabler/icons-svelte/icons/info-circle';
    import CloseIcon from '@tabler/icons-svelte/icons/x';
    import { createEventDispatcher } from 'svelte';
    import { fade } from 'svelte/transition';

    const dispatch = createEventDispatcher();

    export let type: 'success' | 'error' | 'info';

    $: icon = type === 'success' ? SuccessIcon : type === 'error' ? ErrorIcon : InfoIcon;
    $: bgColor = type === 'success' ? 'bg-accent-success-600' : type === 'error' ? 'bg-accent-danger-500' : 'bg-primary-500';
</script>

<article class="relative w-full flex items-center gap-4 rounded px-4 py-2 text-neutral-50 {bgColor}" role="alert" transition:fade>
    <svelte:component this={icon} class="size-6" />
    <p class="text-sm flex-grow">
        <slot />
    </p>
    <button class="border-none bg-transparent text-neutral-50" on:click={() => dispatch('dismiss')}>
        <CloseIcon class="size-6" />
    </button>
</article>
