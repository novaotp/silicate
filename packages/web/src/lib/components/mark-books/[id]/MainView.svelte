<script lang="ts">
    import type { Group, Subject } from "$libs/models/Mark";
    import IconChevronRight from "@tabler/icons-svelte/IconChevronRight.svelte";
    import { page } from "$app/stores";
    import { changeMultipleSearchParams } from "$utils/change-search-params";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import SubjectPage from "./[subjectId]/SubjectPage.svelte";

    export let groupsData: Group[];
    export let subjectsData: Subject[];

    const currentGroup = getContext<Writable<Group | undefined>>("currentGroup");
    const currentSubject = getContext<Writable<Subject | undefined>>("currentSubject");
    const groups = getContext<Writable<Group[]>>("groups");
    const subjects = getContext<Writable<Subject[]>>("subjects");
    $groups = groupsData;
    $subjects = subjectsData;

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

    /* const editBookEnhance: SubmitFunction = () => {
        return ({ result }) => {
            if (result.type === "failure") {
                return addToast({ type: "error", message: result.data!.message });
            } else if (result.type === "success") {
                showBookEdition = false;
                addToast({ type: "info", message: result.data!.message });
            }
        }
    } */
</script>

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
{#if viewGroupId && viewSubjectId}
    <SubjectPage on:close={closeSubjectView} />
{/if}
<!-- {#if showBookEdition}
    <FullScreen.Backdrop class="flex justify-center items-center" on:click={() => (showBookEdition = false)}>
        <Card class="flex flex-col gap-5">
            <form method="post" action="?/editBook" use:enhance={editBookEnhance}>
                <input type="hidden" name="gradingSystem" value="{bookData.gradingSystem}" />
                <div class="relative w-full flex flex-col gap-[10px]">
                    <Label for="title">Titre</Label>
                    <Input name="title" bind:value={bookData.title} placeholder="Le titre du carnet de note..." />
                </div>
                <div class="relative w-full flex flex-col gap-[10px]">
                    <Label for="description">Description</Label>
                    <TextArea name="description" bind:value={bookData.description} placeholder="La description du carnet de note..." />
                </div>
                <div class="relative w-full flex gap-5">
                    <Button.Normal type="button" variant="secondary" on:click={() => (showBookEdition = false)}>
                        Annuler
                    </Button.Normal>
                    <Button.Normal type="submit" variant="primary">
                        Modifier
                    </Button.Normal>
                </div>
            </form>
        </Card>
    </FullScreen.Backdrop>
{/if} -->

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
