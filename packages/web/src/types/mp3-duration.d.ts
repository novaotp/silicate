declare module "mp3-duration" {
    /**
     * Calculate duration of an MP3 in seconds.
     * @param filename Path to the file or a buffer with the file's contents
     * @param cbrEstimate Defaults to `false`. When set to `true`, will estimate the length of a constant-bitrate mp3. This speeds up the calculation a lot but isn't guaranteed to be accurate.
     * @param callback Callback to be called once duration is calculated. It's also possible to instead use the returned `Promise`. `duration` is the duration of the mp3 in `seconds` (including fractional seconds).
     */
    export default function mp3Duration(filename: string | Buffer, cbrEstimate?: boolean, callback?: (error: Error, duration: number) => void): Promise<number>;
}
