<script lang="ts">
    import { audioElement, currentAudio, currentTime, isPlaying, isRepeatToggled, resetAudio, togglePlay, toggleRepeat } from "$lib/stores/tools/audio-streaming";
    import Progress from "$lib/ui/Progress.svelte";
    import CardTemplate from "./CardTemplate.svelte";
    import IconMusic from "@tabler/icons-svelte/icons/music";
    import IconPlayerPlayFilled from '@tabler/icons-svelte/icons/player-play-filled';
    import IconPlayerPauseFilled from '@tabler/icons-svelte/icons/player-pause-filled';
    import IconPlayerSkipBackFilled from '@tabler/icons-svelte/icons/player-skip-back-filled';
    import IconRepeat from '@tabler/icons-svelte/icons/repeat';
    import IconRepeatOff from '@tabler/icons-svelte/icons/repeat-off';
    import { formatDuration } from "$components/tools/audio/utils";
</script>

<CardTemplate icon={IconMusic}>
    <h3>{$currentAudio?.title}</h3>
    <div class="relative w-full flex flex-col gap-1">
        <Progress
            value={$currentTime / audioElement.duration}
            max={1}
            class="h-2"
            progressBar={{
                progressColor: "bg-primary-500",
                barColor: "bg-neutral-300"
            }}
        />
        <div class="relative w-full flex justify-between text-black text-sm">
            <time>{formatDuration($currentTime)}</time>
            <time>{formatDuration($currentAudio?.audio.duration ?? 0)}</time>
        </div>
    </div>
    <div class="flex justify-center gap-5 mt-2">
        <button on:click|stopPropagation={resetAudio}>
            <IconPlayerSkipBackFilled />
        </button>
        <button on:click|stopPropagation={() => togglePlay($currentAudio)}>
            {#if $isPlaying}
                <IconPlayerPauseFilled />
            {:else}
            <IconPlayerPlayFilled />
            {/if}
        </button>
        <button on:click|stopPropagation={toggleRepeat}>
            {#if $isRepeatToggled}
                <IconRepeat />
            {:else}
                <IconRepeatOff />
            {/if}
        </button>
    </div>
</CardTemplate>
