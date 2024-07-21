<script lang="ts">
    import { audioElement, currentAudio, currentTime, isPlaying, pauseAudio, playAudio, togglePlay } from "$lib/stores/tools/audio-streaming";
    import { formatDuration, type AudioData } from "./utils";
    import IconPlayerPlayFilled from "@tabler/icons-svelte/icons/player-play-filled";
    import IconPlayerPauseFilled from "@tabler/icons-svelte/icons/player-pause-filled";
    import Progress from "$lib/ui/Progress.svelte";
    import { changeSearchParams } from "$utils/change-search-params";
    import { page } from "$app/stores";
    import AudioPage from "./AudioPage.svelte";

    export let audios: AudioData[];

    let togglePlayNode: HTMLElement;

    $: slug = $page.url.searchParams.get("slug");
    $: audioViaSlug = slug ? audios.find(audio => audio.slug === slug) : undefined;

    const onAudioCardClick = (event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }, audioData: AudioData) => {
        changeSearchParams("slug", audioData.slug);
    }
</script>

{#each audios as audioData}
    {@const { title, slug, audio, thumbnailPath } = audioData}
    <button
        style="background-image: url('{thumbnailPath}');"
        class="relative w-full aspect-video bg-cover rounded-lg overflow-hidden p-5 shadow-div flex flex-col justify-between"
        on:click|stopPropagation={(event) => onAudioCardClick(event, audioData)}
    >
        {#if $currentAudio?.slug}
            <div class="relative w-full flex flex-col gap-1">
                <Progress value={$currentTime / audioElement.duration} max={1} class="h-2" />
                <div class="relative w-full flex justify-between text-white text-sm">
                    <time>{formatDuration($currentTime)}</time>
                    <time>{formatDuration(audio.duration)}</time>
                </div>
            </div>
        {/if}
        <div class="relative w-full h-full flex flex-col justify-end items-start gap-[5px] z-10">
            <h2 class="text-white text-xl font-semibold">{title}</h2>
            <time class="text-neutral-500 text-sm">{formatDuration(audio.duration)}</time>
            <button
                bind:this={togglePlayNode}
                on:click|stopPropagation={() => togglePlay($currentAudio)}
                class="absolute bottom-0 right-0 w-14 aspect-square rounded-full bg-neutral-50 grid place-items-center"
            >
                {#if $currentAudio?.slug === slug && $isPlaying}
                    <IconPlayerPauseFilled class="pointer-events-none" />
                {:else}
                    <IconPlayerPlayFilled class="pointer-events-none" />
                {/if}
            </button>
        </div>
    </button>
{/each}

{#if slug && audioViaSlug}
    <AudioPage audio={audioViaSlug} on:close={() => changeSearchParams("slug", null)} />
{/if}

<style>    
    .shadow-div:after {
        content: "";
        position: absolute;
        z-index: 1;
        bottom: 0;
        left: 0;
        pointer-events: none;
        background-image: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8) 60%);
        width: 100%;
        height: 70%;
    }
</style>
