<script lang="ts">
    import { onMount } from 'svelte';
    import IconPlayerPlayFilled from '@tabler/icons-svelte/icons/player-play-filled';
    import IconPlayerPauseFilled from '@tabler/icons-svelte/icons/player-pause-filled';
    import IconPlayerSkipBackFilled from '@tabler/icons-svelte/icons/player-skip-back-filled';
    import IconPlayerSkipForwardFilled from '@tabler/icons-svelte/icons/player-skip-forward-filled';
    import IconRepeat from '@tabler/icons-svelte/icons/repeat';
    import IconRepeatOff from '@tabler/icons-svelte/icons/repeat-off';
    import IconVolume2 from '@tabler/icons-svelte/icons/volume-2';
    import IconVolumeOff from '@tabler/icons-svelte/icons/volume-off';
    import IconExternalLink from '@tabler/icons-svelte/icons/external-link';
    import IconVideo from '@tabler/icons-svelte/icons/video';
    import IconUserFilled from '@tabler/icons-svelte/icons/user-filled';

    let audioNode: HTMLAudioElement;
    let isAudioPaused = true;
    let shouldRepeatAudio = false;
    let progress = 0;
    let duration = 0;
    let currentTime = 0;
    let volume = 1; // Volume ranges from 0 to 1

    onMount(() => {
        audioNode.addEventListener('loadedmetadata', () => {
            duration = audioNode.duration;
        });

        audioNode.addEventListener('play', () => {
            isAudioPaused = false;
        });

        audioNode.addEventListener('pause', () => {
            isAudioPaused = true;
        });

        audioNode.addEventListener('timeupdate', () => {
            currentTime = audioNode.currentTime;
            progress = (currentTime / duration) * 100;
        });

        audioNode.addEventListener('ended', () => {
            if (shouldRepeatAudio) {
                audioNode.currentTime = 0;
                audioNode.play();
            }
        });
    });

    const togglePlay = async () => {
        if (audioNode.paused) {
            await audioNode.play();
        } else {
            audioNode.pause();
        }
    };

    const resetAudio = () => {
        audioNode.currentTime = 0;
        audioNode.pause();
    };

    const goToEnd = () => {
        audioNode.currentTime = duration;
        audioNode.pause();
    };

    const toggleRepeat = () => {
        shouldRepeatAudio = !shouldRepeatAudio;
    };

    const seek = (event: MouseEvent) => {
        const progressBar = event.currentTarget as HTMLElement;
        const rect = progressBar.getBoundingClientRect();
        const offsetX = event.clientX - rect.left;
        const newProgress = offsetX / rect.width;
        audioNode.currentTime = newProgress * duration;
    };

    const handleMouseMove = (event: MouseEvent) => {
        if (event.buttons !== 1) return; // Only proceed if the mouse is being dragged (left button is pressed)
        seek(event);
    };

    const changeVolume = (event) => {
        const input = event.target as HTMLInputElement;
        volume = parseFloat(input.value);
        audioNode.volume = volume;
    };

    function formatTime(seconds: number): string {
        if (seconds < 0) {
            throw new Error('Time cannot be negative');
        }

        seconds = Math.floor(seconds); // Ensure milliseconds are not included

        const h = Math.floor(seconds / 3600);
        const m = Math.floor((seconds % 3600) / 60);
        const s = seconds % 60;

        const formattedMinutes = `${m < 10 ? '0' : ''}${m}`;
        const formattedSeconds = `${s < 10 ? '0' : ''}${s}`;

        if (h > 0) {
            return `${h}:${formattedMinutes}:${formattedSeconds}`;
        } else {
            return `${m}:${formattedSeconds}`;
        }
    }
</script>

<!--
@component
The main component of the audio tool.
-->

<main class="relative w-full h-full flex flex-col gap-5">
    <audio bind:this={audioNode} src='/tools/audios/light-rain.mp3' class="absolute w-0 h-0"></audio>

    <div class="relative w-full aspect-video rounded-lg overflow-hidden">
        <img src="https://img.youtube.com/vi/Jvgx5HHJ0qw/maxresdefault.jpg" alt="Thumbnail" class="w-full h-full object-cover"/>
    </div>

    {#if audioNode}
        <div class="relative w-full flex flex-col items-center">
            <!-- svelte-ignore a11y-click-events-have-key-events -->
            <!-- svelte-ignore a11y-no-static-element-interactions -->
            <div
                class="relative w-full flex flex-col gap-1 cursor-pointer"
                on:click={seek}
                on:mousemove={handleMouseMove}
            >
                <div class="w-full h-2 bg-neutral-300 rounded-full overflow-hidden">
                    <div class="h-full bg-primary-500 transition-width duration-100" style="width: {progress}%"></div>
                </div>
                <div class="flex justify-between text-sm text-neutral-500">
                    <time>{formatTime(currentTime)}</time>
                    <time>{formatTime(duration)}</time>
                </div>
            </div>
            <div class="flex justify-center gap-5 mt-2">
                <button on:click={resetAudio}>
                    <IconPlayerSkipBackFilled />
                </button>
                {#if isAudioPaused}
                    <button on:click={togglePlay}>
                        <IconPlayerPlayFilled />
                    </button>
                {:else}
                    <button on:click={togglePlay}>
                        <IconPlayerPauseFilled />
                    </button>
                {/if}
                <button on:click={goToEnd}>
                    <IconPlayerSkipForwardFilled />
                </button>
                <button on:click={toggleRepeat}>
                    {#if shouldRepeatAudio}
                        <IconRepeat />
                    {:else}
                        <IconRepeatOff />
                    {/if}
                </button>
            </div>
            <div class="flex items-center gap-2 mt-2">
                {#if volume > 0}
                    <IconVolume2 />
                {:else}
                    <IconVolumeOff />
                {/if}
                <input type="range" min="0" max="1" step="0.01" value={volume} on:input={changeVolume} class="w-full h-1 bg-primary-500 rounded-full overflow-hidden appearance-none cursor-pointer" />
            </div>
        </div>
    {/if}

    <div class="relative border border-neutral-100 rounded-lg flex flex-col gap-5 p-5">
        <h3 class="font-semibold text-xl">Crédits</h3>
        <div class="flex gap-5">
            <IconUserFilled class="text-neutral-500" />
            <a href="https://www.youtube.com/@COSMICRESORT" class="flex gap-2 items-center text-blue-500">
                <span>Cosmic Resort</span>
                <IconExternalLink />
            </a>
        </div>
        <div class="flex gap-5">
            <IconVideo class="text-neutral-500" />
            <a href="https://www.youtube.com/watch?v=Jvgx5HHJ0qw" class="flex gap-2 items-center text-blue-500">
                <span>Vidéo youtube</span>
                <IconExternalLink />
            </a>
        </div>
    </div>
</main>
