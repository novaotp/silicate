/**
 * @see https://stackoverflow.com/a/196991/20892950
 */
export const toTitleCase = (str: string) => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

/**
 * @see https://stackoverflow.com/a/74485111/20892950
 */
export const byteConverter = (bytes: number, decimals: number): string => {
    const K_UNIT = 1024;
    const SIZES = ["B", "KB", "MB", "GB", "TB", "PB"];
  
    const i = Math.floor(Math.log(bytes) / Math.log(K_UNIT));
    const size = parseFloat((bytes / Math.pow(K_UNIT, i)).toFixed(decimals));

    return `${size} ${SIZES[i]}`;
}

