<script lang="ts">
    import { Button, FullScreen } from '$lib/ui';
    import { createEventDispatcher, getContext } from 'svelte';
    import { fetchExams } from './utils';
    import type { Book, Group, Subject } from '$libs/models/Mark';
    import MainView from './MainView.svelte';
    import IconChevronLeft from '@tabler/icons-svelte/IconChevronLeft.svelte';
    import type { Writable } from 'svelte/store';
    import { changeMultipleSearchParams } from '$utils/change-search-params';
    import { page } from '$app/stores';

    const currentBook = getContext<Writable<Book>>('currentBook');
    const currentGroup = getContext<Writable<Group | undefined>>('currentGroup');
    const currentSubject = getContext<Writable<Subject | undefined>>('currentSubject');
    const jwt = getContext<string>('jwt');

    const dispatch = createEventDispatcher<{ close: null }>();

    $: viewGroupId = $page.url.searchParams.get("groupId");
    $: viewSubjectId = $page.url.searchParams.get("subjectId");
</script>

<FullScreen.Modal class="w-full h-[calc(100%-80px)] top-20 px-5 flex flex-col gap-5 z-[1000]">
    {#if $currentGroup && $currentSubject}
        {#await fetchExams(jwt, $currentBook.id.toString(), $currentGroup.id.toString(), $currentSubject.id.toString()) then exams}
            {#if exams}
                <div class="relative w-full flex justify-between text-xl">
                    <div class="flex gap-5">
                        <button on:click={() => dispatch('close')}>
                            <IconChevronLeft />
                        </button>
                        <h1>{$currentSubject.title}</h1>
                    </div>
                    <span>{$currentSubject.averageScore}</span>
                </div>
                <p class="text-neutral-500">{$currentSubject.description}</p>
                <MainView examsData={exams} />
            {:else}
                <p class="dark:text-neutral-50">Impossible de charger les carnets de notes.</p>
            {/if}
        {:catch err}
            <p class="dark:text-neutral-50">Une erreur est survenue.</p>
            <p class="dark:text-neutral-50">{err}</p>
        {/await}
    {:else if !viewGroupId && !viewSubjectId}
        <!-- Avoid showing not found when closing -->
    {:else}
        <div
            class="relative w-full max-w-[800px] sm:mx-auto h-full flex flex-col min-[900px]:flex-row-reverse justify-center items-start sm:items-center gap-5"
        >
            <img src="/illustrations/404-not-found.png" alt="Illustration : Ajouter un mémo" class="w-3/4 xsm:w-1/2 sm:2/5 self-center" />
            <div class="relative mx-auto flex flex-col justify-center items-start xsm:items-center gap-5">
                <h2 class="text-2xl dark:text-neutral-50">Branche non trouvée</h2>
                <p class="text-neutral-500 dark:text-neutral-400 max-w-[350px] xsm:text-center">
                    Ton lien était soit invalide ou ta branche n'est plus disponible.
                </p>
                <Button.Normal class="rounded-lg" on:click={() => changeMultipleSearchParams({ groupId: null, subjectId: null })}>
                    Retourner à la page principale
                </Button.Normal>
            </div>
        </div>
    {/if}
</FullScreen.Modal>
