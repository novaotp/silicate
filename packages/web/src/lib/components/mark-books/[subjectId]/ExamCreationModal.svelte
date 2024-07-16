<script lang="ts">
    import { addToast } from "$lib/stores/toast";
    import { createEventDispatcher, getContext } from "svelte";
    import { Button, Card, FullScreen, Input, Label, TextArea } from "$lib/ui";
    import { enhance } from "$app/forms";
    import type { Writable } from "svelte/store";
    import type { SubmitFunction } from "@sveltejs/kit";
    import { confirmCardClasses } from "$lib/ui/Confirm";
    import type { Exam } from "$libs/models/Mark";
    import { toDateInputValue } from "$utils/to-date-input";

    const exams = getContext<Writable<Exam[]>>('exams');

    const dispatch = createEventDispatcher<{ close: null }>();

    let title: string = "";
    let comment: string = "";
    let score: number;
    let weight: number = 1;
    let date: string = toDateInputValue(new Date());

    const closeModal = () => {
        dispatch("close")
    }

    const createEnhance: SubmitFunction = () => {
        return ({ result }) => {
            if (result.type === "failure") {
                return addToast({ type: "error", message: result.data!.message })
            } else if (result.type === "success") {
                addToast({ type: 'success', message: 'Examen ajoutée avec succès.' });

                if (!result.data?.exam) {
                    throw new Error("Expected to receive the newly created exam after creating it.");
                }

                $exams = [...$exams, result.data.exam]
                closeModal();
            }
        }
    }
</script>

<FullScreen.Backdrop class="flex-center" on:click={closeModal}>
    <Card class={confirmCardClasses}>
        <form
            method="post"
            action="?/createExam"
            use:enhance={createEnhance}
            class="flex flex-col gap-5"
        >
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="title">Titre</Label>
                <Input name="title" bind:value={title} placeholder="Le titre de l'examen..." />
                {#if title === ""}
                    <p class="text-accent-danger-500 text-sm">Titre obligatoire.</p>
                {/if}
            </div>
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="comment">Commentaire</Label>
                <TextArea name="comment" bind:value={comment} placeholder="Le commentaire de l'examen..." />
            </div>
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="score">Score</Label>
                <Input type="number" step={0.1} name="score" bind:value={score} placeholder="Le score de l'examen..." />
                {#if !score}
                    <p class="text-accent-danger-500 text-sm">Score obligatoire.</p>
                {/if}
            </div>
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="weight">Pondération</Label>
                <Input type="number" step={0.1} name="weight" bind:value={weight} placeholder="La pondération du groupe..." />
                {#if !weight}
                    <p class="text-accent-danger-500 text-sm">Pondération obligatoire.</p>
                {/if}
            </div>
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="date">Date</Label>
                <Input name="date" type="date" bind:value={date} placeholder="La date de l'examen..." />
            </div>
            <div class="w-full flex justify-end items-center gap-5">
                <Button.Normal variant="secondary" on:click={closeModal}>
                    Annuler
                </Button.Normal>
                <Button.Normal type="submit" disabled={title === "" || !score || !weight}>
                    Créer
                </Button.Normal>
            </div>
        </form>
    </Card>
</FullScreen.Backdrop>
