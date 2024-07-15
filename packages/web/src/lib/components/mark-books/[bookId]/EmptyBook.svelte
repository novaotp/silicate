<script lang="ts">
    import { Button } from '$lib/ui';

    export let showBookEditionModal: boolean;
</script>

<!-- Empty state for when the book doesn't contain any groups yet. -->
<div
    class="relative w-full max-w-[800px] sm:mx-auto h-full flex flex-col min-[900px]:flex-row-reverse justify-center items-start sm:items-center gap-5"
>
    <img
        src="/illustrations/no-mark-books.png"
        alt="Illustration : Ajouter un groupe"
        class="w-3/5 xsm:w-1/2 sm:2/5 self-center"
    />
    <div class="relative mx-auto flex flex-col justify-center items-start xsm:items-center gap-5">
        <h2 class="text-2xl dark:text-neutral-50">Créer un groupe</h2>
        <p class="text-neutral-500 dark:text-neutral-400 max-w-[350px] xsm:text-center">
            Crée tes groupes pour organiser tes matières et suivre tes performances de manière structurée.
        </p>
        <Button.Normal type="submit" class="rounded-lg" on:click={() => (showBookEditionModal = true)}>
            Créer un groupe
        </Button.Normal>
    </div>
</div>
