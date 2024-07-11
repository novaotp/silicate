<script lang="ts">
    import { cn } from '$utils/cn';
    import { createEventDispatcher } from 'svelte';
    import Button from './Button';
    import Card from './Card.svelte';

    export let confirmType: 'normal' | 'warning' | 'danger' = 'danger';
    export let noText: string = "Non";
    export let yesText: string = "Oui";

    const dispatch = createEventDispatcher<{ no: null, yes: null }>();

    $: ButtonComponent = confirmType === 'normal' ? Button.Normal : confirmType === 'warning' ? Button.Warning : Button.Danger;
</script>

<Card class={cn('flex flex-col gap-5 max-w-lg rounded-none sm:rounded-lg', $$restProps['class'])}>
    <div class="relative w-full text-center sm:text-start text-lg font-semibold">
        <slot name="title" />
    </div>
    <div class="relative w-full text-sm text-center sm:text-start text-neutral-500">
        <slot name="content" />
    </div>
    <div class="relative w-full flex flex-col sm:flex-row-reverse justify-start gap-5">
        <svelte:component this={ButtonComponent} variant="primary" on:click={() => dispatch("yes")}>
            {yesText}
        </svelte:component>
        <svelte:component this={ButtonComponent} variant="secondary" on:click={() => dispatch("no")}>
            {noText}
        </svelte:component>
    </div>
</Card>
