<script lang="ts">
    import { Button, FullScreen } from '$lib/ui';
    import Card from '$lib/ui/Card.svelte';
    import { createEventDispatcher } from 'svelte';

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

<FullScreen.Backdrop class="grid place-items-center" on:click={() => dispatch("close")}>
    <Card class="relative w-[90%] flex flex-col justify-center items-center rounded-lg py-5 gap-5">
        <h3 class="px-5 text-neutral-950 dark:text-neutral-50">Aperçu de {name}</h3>
        <Button.Danger on:click={deleteThis}>Supprimer</Button.Danger>
        <div bind:clientHeight bind:clientWidth>
            <embed {src} class="relative" width="{window.innerWidth / 10 * 9}px" height="{window.innerHeight / 3 * 2}px" />
        </div>
    </Card>
</FullScreen.Backdrop>
