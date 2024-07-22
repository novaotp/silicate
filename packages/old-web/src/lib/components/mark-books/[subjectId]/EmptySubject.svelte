<script lang="ts">
    import { Button } from '$lib/ui';

    export let showExamCreationModal: boolean;
</script>

<!--
@component
Empty state for when the subject doesn't contain any exams yet.
-->

<div
    class="relative w-full max-w-[800px] sm:mx-auto h-full flex flex-col min-[900px]:flex-row-reverse justify-center items-start sm:items-center gap-5"
>
    <img
        src="/illustrations/no-exams.png"
        alt="Illustration : Ajouter un examen"
        class="w-3/5 xsm:w-1/2 sm:2/5 self-center"
    />
    <div class="relative mx-auto flex flex-col justify-center items-start xsm:items-center gap-5">
        <h2 class="text-2xl dark:text-neutral-50">Créer un examen</h2>
        <p class="text-neutral-500 dark:text-neutral-400 max-w-[350px] xsm:text-center">
            Ajoute des examens pour évaluer tes connaissances et mesurer tes progrès dans chaque matière.
        </p>
        <Button.Normal type="submit" class="rounded-lg" on:click={() => (showExamCreationModal = true)}>
            Créer un examen
        </Button.Normal>
    </div>
</div>
