<script lang="ts">
    import { PUBLIC_BACKEND_URL } from "$env/static/public";
    import { getContext } from "svelte";
    import { byteConverter, toTitleCase } from "./utils";
    import * as AllIcons from "@tabler/icons-svelte";

    export let path: string;
    export let name: string;

    $: extension = name.split(".").at(-1)!;
    
    $: fileBlob = async () => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/attachment`, {
            method: 'POST',
            body: JSON.stringify({
                path: path
            }),
            headers: {
                accept: 'application/json',
                authorization: jwt,
                'content-type': 'application/json'
            }
        });
        return await response.blob();
    };

    const jwt = getContext<string>("jwt");

    $: icon = () => {
        const iconKey = `IconFileType${toTitleCase(extension)}`;

        if (Object.keys(AllIcons).includes(iconKey)) {
            /* @ts-ignore */
            return AllIcons[iconKey];
        } else {
            return AllIcons["IconFileTypeTxt"];
        }
    }

    /**
     * @see https://stackoverflow.com/a/59414837
     */
     const download = async () => {
        const file = await fileBlob();

        let link = document.createElement('a');
        link.href = window.URL.createObjectURL(file);
        link.download = name;
        link.click();
    };

    const size = async () => {
        const file = await fileBlob();

        return file.size;
    }
</script>

<button class="relative flex justify-between items-center gap-5 min-w-40 max-w-80 px-4 py-2 rounded-lg border border-gray-300">
    <div class="relative h-full flex justify-center items-center">
        <svelte:component this={icon()} class="size-6" />
    </div>
    <div class="relative flex flex-col items-start max-w-40">
        <span class="text-ellipsis whitespace-nowrap overflow-hidden max-w-40">{name}</span>
        {#await size() then size}
            <div class="flex text-gray-500 text-sm">
                <span>{byteConverter(size, 2)}</span>
                <span>&nbsp;-&nbsp;</span>
                <button on:click|stopPropagation={download}>Télécharger</button>
            </div>
        {/await}
    </div>
</button>
