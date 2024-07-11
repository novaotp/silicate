<script lang="ts">
    import type { Book, Group, Subject } from "$libs/models/Mark";
    import IconChevronRight from "@tabler/icons-svelte/IconChevronRight.svelte";
    import { page } from "$app/stores";
    import { changeMultipleSearchParams, changeSearchParams } from "$utils/change-search-params";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import SubjectPage from "./[subjectId]/SubjectPage.svelte";
    import { Button, Card } from "$lib/ui";
    import IconPlus from "@tabler/icons-svelte/IconPlus.svelte";
    import BookEditionModal from "./BookEditionModal.svelte";
    import IconChevronLeft from "@tabler/icons-svelte/IconChevronLeft.svelte";
    import BookDeletion from "./BookDeletion.svelte";

    export let groupsData: Group[];
    export let subjectsData: Subject[];

    const currentBook = getContext<Writable<Book | undefined>>("currentBook");
    const currentGroup = getContext<Writable<Group | undefined>>("currentGroup");
    const currentSubject = getContext<Writable<Subject | undefined>>("currentSubject");
    const groups = getContext<Writable<Group[]>>("groups");
    const subjects = getContext<Writable<Subject[]>>("subjects");
    $groups = groupsData;
    $subjects = subjectsData;

    let showBookEditionModal: boolean = false;

    $: groupedSubjects = $groups.map(group => {
        return {
            ...group,
            subjects: $subjects.filter(subject => subject.groupId === group.id)
        }
    })

    $: viewGroupId = $page.url.searchParams.get("groupId");
    $: viewSubjectId = $page.url.searchParams.get("subjectId");
    $: $currentGroup = $groups.find(g => g.id.toString() === viewGroupId);
    $: $currentSubject = $subjects.find(s => s.id.toString() === viewSubjectId);

    const showSubjectView = (subject: Subject) => changeMultipleSearchParams({ groupId: subject.groupId, subjectId: subject.id });
    const closeSubjectView = () => changeMultipleSearchParams({ groupId: null, subjectId: null });
</script>

<div class="relative w-full flex justify-between">
    <button on:click={() => changeSearchParams("bookId", null)} class="flex gap-5">
        <IconChevronLeft />
        <span>Retour</span>
    </button>
    <BookDeletion />
</div>
<button
    on:click={() => (showBookEditionModal = true)}
    class="rounded-lg p-5 bg-primary-500 text-white flex flex-col gap-5"
>
    <div class="flex justify-between">
        <div class="flex gap-5">
            <h1>{$currentBook?.title}</h1>
        </div>
        {#if $currentBook?.averageScore}
            <span>{$currentBook?.averageScore}</span>
        {/if}
    </div>
    {#if $currentBook?.description}
        <p class="text-sm text-start">{$currentBook?.description}</p>
    {/if}
</button>
{#if $groups.length > 0}
    {#each groupedSubjects as { subjects, ...group }}
        <div class="relative w-full flex flex-col gap-[10px]">
            <div class="relative w-full flex justify-between">
                <h2>{group.title} ({group.weight}x)</h2>
                <span>{group.averageScore}</span>
            </div>
            <p class="relative text-neutral-500 text-sm pl-5 group-description">
                {group.description}
            </p>
            <ul class="relative w-full pl-10 flex flex-col gap-[10px]">
                {#each subjects as subject}
                    <button
                        on:click={() => showSubjectView(subject)}
                        class="flex justify-between"
                    >
                        <span>{subject.title} ({subject.averageScore})</span>
                        <IconChevronRight class="size-5" />
                    </button>
                {/each}
            </ul>
        </div>
    {/each}
    <Button.Normal on:click={() => (showBookEditionModal = true)} class="fixed bottom-5 right-5 w-[60px] aspect-square flex-center gap-5">
        <IconPlus class="min-w-5 min-h-5" />
        <span class="hidden md:block whitespace-nowrap">Ajouter un mémo</span>
    </Button.Normal>
{:else}
    <!-- Empty state for when the book doesn't contain any groups yet. -->
    <div class="relative w-full max-w-[800px] sm:mx-auto h-full flex flex-col min-[900px]:flex-row-reverse justify-center items-start sm:items-center gap-5">
        <img src="/illustrations/no-mark-books.png" alt="Illustration : Ajouter un groupe" class="w-3/5 xsm:w-1/2 sm:2/5 self-center" />
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
{/if}

{#if viewGroupId && viewSubjectId}
    <SubjectPage on:close={closeSubjectView} />
{/if}

{#if showBookEditionModal}
    <BookEditionModal on:close={() => (showBookEditionModal = false)} />
{/if}

<style lang="postcss">
    .group-description::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 2px;
        @apply bg-neutral-300;
    }
</style>
