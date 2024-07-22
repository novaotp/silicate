<script lang="ts">
    import { Button } from '$lib/ui';

    export let showBookCreationModal: boolean;
</script>

<!--
@component
Empty state for when the user hasn't created a single book yet.
-->

<div
    class="relative w-full max-w-[800px] sm:mx-auto h-full flex flex-col
    min-[900px]:flex-row-reverse justify-center items-start sm:items-center gap-5"
>
    <img
        src="/illustrations/no-mark-books.png"
        alt="Illustration : Ajouter un carnet"
        class="w-3/5 xsm:w-1/2 sm:2/5 self-center"
    />
    <div
        class="relative mx-auto flex flex-col justify-center items-start xsm:items-center gap-5"
    >
        <h2 class="text-2xl dark:text-neutral-50">Créer un carnet</h2>
        <p
            class="text-neutral-500 dark:text-neutral-400 max-w-[350px] xsm:text-center"
        >
            Gère tes notes de cours efficacement et garde une trace de tes
            progrès académiques.
        </p>
        <Button.Normal on:click={() => (showBookCreationModal = true)}>
            Créer un carnet
        </Button.Normal>
    </div>
</div>
