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
    import SubjectData from "./subject-data/SubjectData.svelte";

    const exams = getContext<Writable<Exam[]>>("exams");

    let showExamCreationModal: boolean = false;
</script>

<div class="relative flex-grow h-full p-5 pt-0 md:pt-5 md:shadow-[-2px_0_4px_4px_rgba(0,0,0,0.1)] flex flex-col gap-5">
    <Header />
    <SubjectData />
    {#if $exams.length > 0}
        <ExamList />
        <Button.Normal
            on:click={() => (showExamCreationModal = true)}
            class="fixed bottom-5 right-5 w-[60px] aspect-square flex-center gap-5"
        >
            <IconPlus class="min-w-6 min-h-6" />
            <span class="hidden md:block whitespace-nowrap">Ajouter un examen</span>
        </Button.Normal>
    {:else}
        <EmptySubject bind:showExamCreationModal />
    {/if}
</div>

{#if showExamCreationModal}
    <ExamCreationModal on:close={() => (showExamCreationModal = false)} />
{/if}
