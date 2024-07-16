<script lang="ts">
    import type { Exam } from "$libs/models/Mark";
    import IconPlus from "@tabler/icons-svelte/icons/plus";
    import { Button } from "$lib/ui";
    import { getContext } from "svelte";
    import { type Writable } from "svelte/store";
    import Header from "./Header/Header.svelte";
    import ExamList from "./ExamList.svelte";
    import EmptySubject from "./EmptySubject.svelte";
    import ExamCreationModal from "./ExamCreationModal.svelte";

    const exams = getContext<Writable<Exam[]>>("exams");

    let showExamCreationModal: boolean = false;
</script>

<Header />
{#if $exams.length > 0}
    <ExamList />
    <Button.Normal on:click={() => (showExamCreationModal = true)} class="fixed bottom-5 right-5 w-[60px] aspect-square flex-center gap-5">
        <IconPlus class="min-w-6 min-h-6" />
        <span class="hidden md:block whitespace-nowrap">Ajouter un examen</span>
    </Button.Normal>
{:else}
    <EmptySubject bind:showExamCreationModal />
{/if}

{#if showExamCreationModal}
    <ExamCreationModal on:close={() => (showExamCreationModal = false)} />
{/if}
