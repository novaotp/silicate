<script lang="ts">
    import { FullScreen } from '$lib/ui';
    import { createEventDispatcher } from 'svelte';
    import IconChevronLeft from '@tabler/icons-svelte/icons/chevron-left';
    import { formatDuration, type AudioData } from './utils';
    import {
        currentAudio,
        currentTime,
        isPlaying,
        togglePlay,
        resetAudio,
        toggleRepeat,
        isRepeatToggled,
        currentVolume,
        changeVolume,
        toNewTime
    } from '$lib/stores/tools/audio-streaming';
    import IconPlayerPlayFilled from '@tabler/icons-svelte/icons/player-play-filled';
    import IconPlayerPauseFilled from '@tabler/icons-svelte/icons/player-pause-filled';
    import IconPlayerSkipBackFilled from '@tabler/icons-svelte/icons/player-skip-back-filled';
    import IconRepeat from '@tabler/icons-svelte/icons/repeat';
    import IconRepeatOff from '@tabler/icons-svelte/icons/repeat-off';
    import IconVolume2 from '@tabler/icons-svelte/icons/volume-2';
    import IconVolumeOff from '@tabler/icons-svelte/icons/volume-off';
    import Slider from '$lib/ui/Slider.svelte';

    export let audio: AudioData;

    const dispatch = createEventDispatcher<{ close: null }>();
</script>

<FullScreen.Modal class="w-full h-[calc(100%-80px)] top-20 flex flex-col gap-5 px-5">
    <button on:click={() => dispatch('close')} class="flex gap-5">
        <IconChevronLeft />
        <span>Retour</span>
    </button>
    <div
        style="background-image: url('{audio.thumbnailPath}');"
        class="relative w-full aspect-video bg-cover rounded-lg overflow-hidden p-5 shadow-div flex flex-col justify-between"
    ></div>
    <div class="relative w-full flex flex-col gap-1">
        <Slider
            step={1}
            min={0}
            max={audio.audio.duration}
            value={$currentTime}
            class="h-1"
            on:input={(event) => {
                console.log("yoyo")
            }}
        />
        <div class="relative w-full flex justify-between text-black text-sm">
            <time>{formatDuration($currentTime)}</time>
            <time>{formatDuration(audio.audio.duration)}</time>
        </div>
    </div>
    <div class="flex justify-center gap-5 mt-2">
        <button on:click={resetAudio}>
            <IconPlayerSkipBackFilled />
        </button>
        <button on:click={() => togglePlay(audio)}>
            {#if $currentAudio?.slug === audio.slug && $isPlaying}
                <IconPlayerPauseFilled class="pointer-events-none" />
            {:else}
                <IconPlayerPlayFilled class="pointer-events-none" />
            {/if}
        </button>
        <button on:click={toggleRepeat}>
            {#if $isRepeatToggled}
                <IconRepeat />
            {:else}
                <IconRepeatOff />
            {/if}
        </button>
    </div>
    <div class="flex items-center gap-2 mt-2">
        {#if $currentVolume > 0}
            <IconVolume2 />
        {:else}
            <IconVolumeOff />
        {/if}
        <Slider
            step={0.01}
            min={0}
            max={1}
            value={[$currentVolume]}
            on:input={(event) => changeVolume(event.detail)}
            class=""
        />
    </div>
</FullScreen.Modal>
