<script lang="ts">
    import { addToast } from '$lib/stores/toast';
    import { createEventDispatcher, getContext } from 'svelte';
    import { Button, Card, FullScreen, Input, Label, TextArea } from '$lib/ui';
    import { enhance } from '$app/forms';
    import type { Writable } from 'svelte/store';
    import type { SubmitFunction } from '@sveltejs/kit';
    import { confirmCardClasses } from '$lib/ui/Confirm';
    import type { Exam, Subject } from '$libs/models/Mark';
    import { toDateInputValue } from '$utils/to-date-input';
    import IconX from "@tabler/icons-svelte/icons/x";
    import IconTrash from "@tabler/icons-svelte/icons/trash";

    export let examId: number;

    const subject = getContext<Writable<Subject>>('subject');
    const exams = getContext<Writable<Exam[]>>('exams');

    let exam: Exam = $exams.find((e) => e.id === examId)!;
    const dispatch = createEventDispatcher<{ close: null }>();

    const closeModal = () => {
        dispatch('close');
    };

    const editEnhance: SubmitFunction = ({ formData }) => {
        formData.set("id", exam.id.toString());
        
        return ({ result }) => {
            if (result.type === 'failure') {
                return addToast({ type: 'error', message: result.data!.message });
            } else if (result.type === 'success') {
                addToast({ type: 'success', message: 'Examen modifié avec succès.' });

                // Update the average score
                if (result.data?.subject) {
                    $subject = result.data.subject;
                }

                $exams = $exams.map((e) => (e.id === exam.id ? exam : e));
                closeModal();
            }
        };
    };

    const deleteEnhance: SubmitFunction = ({ formData }) => {
        formData.set("id", exam.id.toString());
        
        return ({ result }) => {
            if (result.type === 'failure') {
                return addToast({ type: 'error', message: result.data!.message });
            } else if (result.type === 'success') {
                addToast({ type: 'success', message: 'Examen supprimé avec succès.' });

                // Update the average score
                if (result.data?.subject) {
                    $subject = result.data.subject;
                }

                closeModal();

                // Wait for the FullScreen.Backdrop animation to finish
                setTimeout(() => {
                    $exams = $exams.filter((e) => e.id !== exam.id);
                }, 400);
            }
        };
    };
</script>

<FullScreen.Backdrop class="flex-center" on:click={closeModal}>
    <Card class={confirmCardClasses}>
        <div class="relative w-full h-10 flex justify-between">
            <button on:click={closeModal}>
                <IconX />
            </button>
            <form method="post" action="?/destroyExam" use:enhance={deleteEnhance}>
                <Button.Danger type="submit" variant="tertiary" class="px-0">
                    <IconTrash />
                </Button.Danger>
            </form>
        </div>
        <form
            method="post"
            action="?/editExam"
            use:enhance={editEnhance}
            class="flex flex-col gap-5"
        >
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="title">Titre</Label>
                <Input
                    name="title"
                    bind:value={exam.title}
                    placeholder="Le titre de l'examen..."
                />
                {#if exam.title === ''}
                    <p class="text-accent-danger-500 text-sm">
                        Titre obligatoire.
                    </p>
                {/if}
            </div>
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="comment">Commentaire</Label>
                <TextArea
                    name="comment"
                    bind:value={exam.comment}
                    placeholder="Le commentaire de l'examen..."
                />
            </div>
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="score">Score</Label>
                <Input
                    type="number"
                    step={0.1}
                    name="score"
                    bind:value={exam.score}
                    placeholder="Le score de l'examen..."
                />
                {#if !exam.score}
                    <p class="text-accent-danger-500 text-sm">
                        Score obligatoire.
                    </p>
                {/if}
            </div>
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="weight">Pondération</Label>
                <Input
                    type="number"
                    step={0.1}
                    name="weight"
                    bind:value={exam.weight}
                    placeholder="La pondération du groupe..."
                />
                {#if !exam.weight}
                    <p class="text-accent-danger-500 text-sm">
                        Pondération obligatoire.
                    </p>
                {/if}
            </div>
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="date">Date</Label>
                <Input
                    name="date"
                    type="date"
                    value={toDateInputValue(new Date(exam.date))}
                    on:change={(event) =>
                        (exam.date = event.currentTarget.value)}
                    placeholder="La date de l'examen..."
                />
            </div>
            <div class="w-full flex justify-end items-center gap-5">
                <Button.Normal variant="secondary" on:click={closeModal}>
                    Annuler
                </Button.Normal>
                <Button.Normal
                    type="submit"
                    disabled={exam.title === '' || !exam.score || !exam.weight}
                >
                    Modifier
                </Button.Normal>
            </div>
        </form>
    </Card>
</FullScreen.Backdrop>
