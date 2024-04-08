<script lang="ts">
    import FullScreen from '$lib/components/shared/FullScreen.svelte';
    import { IconCalendarClock } from '@tabler/icons-svelte';
    import { fly } from 'svelte/transition';
    import SveltyPicker from 'svelty-picker';
    import { createEventDispatcher } from 'svelte';
    import * as Button from "$lib/components/shared/Button";

    export let value: string;

    const dispatch = createEventDispatcher<{ edit: null }>();

    $: date = new Date(value).toLocaleDateString('fr-CH', { day: '2-digit', month: 'long', year: 'numeric' });
    $: time = new Date(value).toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' }).split(':').join('h');

    let show: boolean = false;
</script>

<div class="relative w-full flex justify-between">
    <div class="relative flex items-center gap-4 text-neutral-500">
        <IconCalendarClock />
        <span>Échéance</span>
    </div>
    <Button.Normal.Secondary on:click={() => (show = true)} size="small">
        {date}, {time}
    </Button.Normal.Secondary>
</div>
{#if show}
    <FullScreen class="flex justify-center items-center">
        <div transition:fly={{ y: 50 }}>
            <SveltyPicker
                pickerOnly
                format="dd.mm.yyyy hh:ii"
                mode="datetime"
                {value}
                on:cancel={() => (show = false)}
                on:dateChange={(e) => {
                    value = e.detail.dateValue;
                    show = false;
                    dispatch("edit")
                }}
            />
        </div>
    </FullScreen>
{/if}
