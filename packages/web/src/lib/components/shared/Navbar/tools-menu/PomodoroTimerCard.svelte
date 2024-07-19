<script lang="ts">
    import { resetTimer, startTimer, pauseTimer, timeLeft, timerCurrentState } from "$lib/stores/tools/pomodoro-timer";
    import { Button } from "$lib/ui";
    import IconClock from '@tabler/icons-svelte/icons/clock';

    $: minutes = Math.floor(($timeLeft / 1000) / 60);
    $: seconds = ($timeLeft / 1000) % 60;
    $: displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
</script>

<div class="relative w-full p-5 flex gap-5">
    <div class="relative my-auto w-10 aspect-square bg-neutral-100 grid place-items-center rounded-lg">
        <IconClock />
    </div>
    <div class="relative flex-grow h-full flex flex-col gap-[10px]">
        <h3>Minuteur Pomodoro</h3>
        <div>
            <time>{displayTime}</time>
            <span class="text-sm text-neutral-500">minutes restantes</span>
        </div>
        <div class="relative flex justify-start gap-[10px]">
            {#if $timerCurrentState === 'running' || $timerCurrentState === 'paused'}
                <Button.Normal size="small"
                    on:click={() => {
                        $timerCurrentState === 'paused' ? startTimer() : pauseTimer();
                    }}
                >
                    {#if $timerCurrentState === 'paused'}
                        Reprendre
                    {:else}
                        Pause
                    {/if}
                </Button.Normal>
                <Button.Normal size="small" on:click={resetTimer} variant="secondary">Annuler</Button.Normal>
            {:else}
                <Button.Normal size="small" on:click={startTimer}>Commencer</Button.Normal>
            {/if}
        </div>
    </div>
</div>
