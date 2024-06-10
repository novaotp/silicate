<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade, fly } from 'svelte/transition';

    export let name: string;
    export let blob: Blob;

    $: src = URL.createObjectURL(blob);

    const dispatch = createEventDispatcher<{ close: null, delete: string }>();

    const deleteThis = () => {
        dispatch("close");
        dispatch("delete", name);
    }

    let clientHeight: number;
    let clientWidth: number;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.2)] z-[1000]"
    on:click|stopPropagation={() => dispatch("close")}
    transition:fade
>
    <div class="relative w-[90%] bg-white flex flex-col justify-center items-center rounded-lg py-5 gap-5" transition:fly={{ y: 50 }}>
        <h3 class="px-5 text-neutral-950">Aperçu de {name}</h3>
        <button on:click={deleteThis} class="relative bg-accent-danger-500 text-neutral-50 px-4 py-2 rounded-lg z-[2000]">Supprimer</button>
        <div bind:clientHeight bind:clientWidth>
            <embed {src} class="relative" width="{window.innerWidth / 10 * 9}px" height="{window.innerHeight / 3 * 2}px" />
        </div>
    </div>
</div>
