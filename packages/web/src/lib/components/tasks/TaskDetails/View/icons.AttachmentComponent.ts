import IconBmp from '@tabler/icons-svelte/icons/bmp';
import IconCsv from '@tabler/icons-svelte/icons/csv';
import IconGif from '@tabler/icons-svelte/icons/gif';
import IconHtml from '@tabler/icons-svelte/icons/html';
import IconJpg from '@tabler/icons-svelte/icons/jpg';
import IconJson from '@tabler/icons-svelte/icons/json';
import IconPdf from '@tabler/icons-svelte/icons/pdf';
import IconPng from '@tabler/icons-svelte/icons/png';
import IconSql from '@tabler/icons-svelte/icons/sql';
import IconSvg from '@tabler/icons-svelte/icons/svg';
import IconToml from '@tabler/icons-svelte/icons/toml';
import IconZip from '@tabler/icons-svelte/icons/zip';
import IconTxt from '@tabler/icons-svelte/icons/txt';

/**
 * Maps a file extension to an icon.
 * @param extension The extension of the file
 * @returns The appropriate icon for the given extension, defaulting to a text icon if it doesn't exist.
 */
export const getFileIcon = (extension: string) => {
    extension = extension.toLowerCase();

    switch (extension) {
        case "bmp":
            return IconBmp;
        case "csv":
            return IconCsv;
        case "gif":
            return IconGif;
        case "html":
            return IconHtml;
        case "jpg":
        case "jpeg":
            return IconJpg;
        case "json":
            return IconJson;
        case "pdf":
            return IconPdf;
        case "png":
            return IconPng;
        case "sql":
            return IconSql;
        case "svg":
            return IconSvg;
        case "toml":
            return IconToml;
        case "zip":
            return IconZip;
        case "txt":
            return IconTxt;
        default:
            console.warn(`Unknown file extension for an icon : ${extension}`);
            return IconTxt;
    }
}
