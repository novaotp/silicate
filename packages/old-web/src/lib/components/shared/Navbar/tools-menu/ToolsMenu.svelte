<script lang="ts">
    import { Button, Separator } from '$lib/ui';
    import { clickOutside } from '$utils/click-outside';
    import { fly } from 'svelte/transition';
    import IconToolOff from '@tabler/icons-svelte/icons/tools-off';
    import { goto } from '$app/navigation';
    import { timerCurrentState } from '$lib/stores/tools/pomodoro-timer';
    import PomodoroTimerCard from './PomodoroTimerCard.svelte';
    import { currentAudio } from '$lib/stores/tools/audio-streaming';
    import AudioStreamingCard from './AudioStreamingCard.svelte';

    export let show: boolean;
    export let avoidButtonNode: HTMLElement;

    let innerWidth: number;

    const isAnyToolRunning = () => {
        return $timerCurrentState !== "idle" || $currentAudio !== null;
    }
</script>

<svelte:window bind:innerWidth />

{#if show}
    <article
        use:clickOutside={{ avoid: [avoidButtonNode] }}
        on:emit={() => (show = false)}
        transition:fly={{ y: innerWidth < 768 ? -50 : 50 }}
        class="fixed top-20 md:top-auto md:bottom-[10px] left-5 w-[calc(100%-40px)] md:max-w-[400px] max-h-[600px]
                flex flex-col z-[200] rounded-lg bg-white dark:bg-neutral-900 shadow-[0_0_8px_8px_rgba(0,0,0,0.1)]
                {show ? 'md:left-[210px]' : 'md:left-[90px]'}"
    >
        <div class="relative w-full p-5 flex justify-between items-baseline">
            <h2 class="dark:text-neutral-50">Outils pédagogiques</h2>
        </div>
        <Separator />
        <ul class="relative w-full flex flex-col overflow-auto divide-y divide-neutral-100 dark:divide-neutral-500">
            {#if isAnyToolRunning()}
                {#if $timerCurrentState !== "idle"}
                    <PomodoroTimerCard />
                {/if}
                {#if $currentAudio !== null}
                    <AudioStreamingCard />
                {/if}
            {:else}
                <li
                    class="relative w-full p-5 flex flex-col justify-center items-center gap-[10px]
                            text-neutral-500 dark:text-neutral-300"
                >
                    <IconToolOff class="size-10" />
                    <span class="text-sm text-center">
                        Aucun outil ne tourne en ce moment.. Reviens lorsque tu en actives un !
                    </span>
                    <Button.Normal
                        on:click={() => {
                            show = false;
                            goto("/app/tools")
                        }}
                        class="text-sm"
                    >
                        Activer un outil
                    </Button.Normal>
                </li>
            {/if}
        </ul>
    </article>
{/if}
