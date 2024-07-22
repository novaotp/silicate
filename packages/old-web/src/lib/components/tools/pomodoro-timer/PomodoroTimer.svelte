<script lang="ts">
    import { timerCurrentState, pauseTimer, POMODORO_TIMER_DURATION, resetTimer, startTimer, timeLeft } from '$lib/stores/tools/pomodoro-timer';
    import { Button } from '$lib/ui';
    
    $: minutes = Math.floor(($timeLeft / 1000) / 60);
    $: seconds = ($timeLeft / 1000) % 60;
    $: displayTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
</script>

<div class="relative w-full h-full flex flex-col gap-5 items-center justify-center bg-gray-100">
    <div class="relative w-[350px] aspect-square">
        <svg viewBox="0 0 36 36">
            <path
                class="fill-none stroke-[#FF5733] stroke-[1.5]"
                d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
                stroke-dasharray="{($timeLeft * 100) / POMODORO_TIMER_DURATION}, 100"
            />
        </svg>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-5 items-center">
            <h2 class="text-4xl text-center">Minuteur Pomodoro</h2>
            <time class="text-6xl">{displayTime}</time>
        </div>
    </div>
    <div class="flex justify-center gap-5">
        {#if $timerCurrentState === 'running' || $timerCurrentState === 'paused'}
            <Button.Normal
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
            <Button.Normal on:click={resetTimer} variant="secondary">Annuler</Button.Normal>
        {:else}
            <Button.Normal on:click={startTimer}>Commencer</Button.Normal>
        {/if}
    </div>
</div>

<style>
    path {
        transition: stroke-dashoffset 1s linear;
    }
</style>
