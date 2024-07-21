import type { AudioData } from '$components/tools/audio/utils';
import { get, writable } from 'svelte/store';

export const currentAudio = writable<AudioData | null>(null);
export const currentTime = writable<number>(0);
export const isPlaying = writable<boolean>(false);
export const isRepeatToggled = writable<boolean>(false);
export const currentVolume = writable<number>(0.5);

export const audioElement = document.createElement('audio');

audioElement.volume = 0.5;
audioElement.autoplay = false;

audioElement.ontimeupdate = function () {
    currentTime.set(audioElement.currentTime);
};

audioElement.onended = function () {
    if (get(isRepeatToggled)) {
        audioElement.currentTime = 0;
        playAudio();
    } else {
        isPlaying.set(false);
    }
};

export const playAudio = async (newAudio: AudioData | null = null) => {
    if (newAudio !== null && get(currentAudio)?.slug !== newAudio.slug) {
        currentAudio.set(newAudio);
        audioElement.src = newAudio.audio.path;
    }

    await audioElement.play();
    isPlaying.set(true);
};

export const pauseAudio = () => {
    audioElement.pause();
    isPlaying.set(false);
};

// * Should be changed to resetOrPrevious
// * And goes to previous if currentTime < 5 seconds
export const resetAudio = () => {
    audioElement.currentTime = 0;
};

export const togglePlay = async (newAudio: AudioData | null = null) => {
    if (get(isPlaying)) {
        pauseAudio();
    } else {
        await playAudio(newAudio);
    }
};

export const toggleRepeat = () => {
    isRepeatToggled.update((old) => !old);
};

export const changeVolume = (newVolume: number) => {
    audioElement.volume = newVolume;
    currentVolume.set(newVolume);
};

export const toNewTime = (newTime: number) => {
    audioElement.currentTime = newTime;
    currentTime.set(newTime);
}

/* const goToEnd = () => {
    audioNode.currentTime = duration;
    audioNode.pause();
}; */
