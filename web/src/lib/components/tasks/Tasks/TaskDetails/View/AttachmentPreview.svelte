<script lang="ts">
    import { fade, fly } from 'svelte/transition';

    export let show: boolean;
    export let name: string;
    export let pendingBlob: () => Promise<Blob>;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div
    class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-[rgba(0,0,0,0.2)] z-[1000]"
    on:click|stopPropagation={() => (show = false)}
    transition:fade
>
    <div class="relative w-[90%] bg-white flex flex-col justify-center items-center rounded-lg" transition:fly={{ y: 50 }}>
        <h3 class="p-5">Aperçu de {name}</h3>
        {#await pendingBlob()}
            <p>Chargement...</p>
        {:then blob}
            {@const src = URL.createObjectURL(blob)}
            <embed {src} class="relative w-full" />
        {/await}
    </div>
</div>
