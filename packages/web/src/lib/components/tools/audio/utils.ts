import type { AudioMetadataSchema } from "../../../../../static/tools/audios/output/audio-metadata";

/** An alias for the auto-generated schema. */
export type AudioMetadata = AudioMetadataSchema;

export type AudioData = AudioMetadata & {
    audio: {
        /** The path that points to the public audio file. */
        path: string,
        /** The duration in seconds of the audio file. */
        duration: number
    }
    /** The path that points to the public thumbnail file. */
    thumbnailPath: string
};

/** Proper time formatting for the audios. */
export const formatDuration = (seconds: number): string => {
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
