import IconBmp from "@tabler/icons-svelte/IconBmp.svelte";
import IconCsv from "@tabler/icons-svelte/IconCsv.svelte";
import IconGif from "@tabler/icons-svelte/IconGif.svelte";
import IconHtml from "@tabler/icons-svelte/IconHtml.svelte";
import IconJpg from "@tabler/icons-svelte/IconJpg.svelte";
import IconJson from "@tabler/icons-svelte/IconJson.svelte";
import IconPdf from "@tabler/icons-svelte/IconPdf.svelte";
import IconPng from "@tabler/icons-svelte/IconPng.svelte";
import IconSql from "@tabler/icons-svelte/IconSql.svelte";
import IconSvg from "@tabler/icons-svelte/IconSvg.svelte";
import IconToml from "@tabler/icons-svelte/IconToml.svelte";
import IconZip from "@tabler/icons-svelte/IconZip.svelte";
import IconTxt from "@tabler/icons-svelte/IconTxt.svelte"

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
