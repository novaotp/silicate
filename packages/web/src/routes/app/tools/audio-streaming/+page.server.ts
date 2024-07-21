import type { AudioData, AudioMetadata } from '$components/tools/audio/utils';
import type { PageServerLoad } from './$types';
import { type Dirent } from 'node:fs';
import fs from 'node:fs/promises';
import mp3Duration from "mp3-duration";

const AUDIOS_PATH = './static/tools/audios/assets';
const AUDIOS_PATH_WITHOUT_STATIC = '/tools/audios/assets';

export const load: PageServerLoad = async () => {
    return { audios: getAudios() };
};

const getAudios = async (): Promise<AudioData[]> => {
    const directoryEntries: Dirent[] = await fs.readdir(AUDIOS_PATH, {
        encoding: 'utf8',
        withFileTypes: true,
        recursive: false
    });

    const futureAudios: Promise<AudioData>[] = directoryEntries
        .filter(directoryEntry => directoryEntry.isDirectory())
        .map(async (directoryEntry) => {
            const metadata = await readMetadata(`${AUDIOS_PATH}/${directoryEntry.name}/metadata.json`);
            const thumbnailPath = `${AUDIOS_PATH_WITHOUT_STATIC}/${directoryEntry.name}/thumbnail.avif`;
            const audioPath = `${AUDIOS_PATH_WITHOUT_STATIC}/${directoryEntry.name}/audio.mp3`;
            const audioDuration = await mp3Duration(`${AUDIOS_PATH}/${directoryEntry.name}/audio.mp3`);

            return {
                ...metadata,
                thumbnailPath,
                audio: {
                    path: audioPath,
                    duration: audioDuration
                }
            } satisfies AudioData;
        });

    const audios: AudioData[] = await Promise.all(futureAudios);

    return audios;
}

const readMetadata = async (path: string): Promise<AudioMetadata> => {
    const contents = await fs.readFile(path, { encoding: "utf8" });
    const schema = JSON.parse(contents);

    // ? Should we validate the metadata

    return schema;
}
