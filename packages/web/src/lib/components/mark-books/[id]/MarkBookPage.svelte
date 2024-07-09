<script lang="ts">
    import { Button, FullScreen } from "$lib/ui";
    import { createEventDispatcher, getContext } from "svelte";
    import { fetchGroupsAndSubjects } from "./utils";
    import type { Book } from "$libs/models/Mark";
    import MainView from "./MainView.svelte";
    import IconChevronLeft from "@tabler/icons-svelte/IconChevronLeft.svelte";
    import type { Writable } from "svelte/store";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    const currentBook = getContext<Writable<Book | undefined>>("currentBook");
    const jwt = getContext<string>("jwt");

    const dispatch = createEventDispatcher<{ close: null }>();

    $: viewBookId = $page.url.searchParams.get("bookId");
</script>

<FullScreen.Modal class="w-full h-[calc(100%-80px)] top-20 px-5 flex flex-col gap-5">
    {#if !viewBookId}
        <!-- Avoid showing not found when closing -->
    {:else if !$currentBook}
        <div class="relative w-full max-w-[800px] sm:mx-auto h-full flex flex-col min-[900px]:flex-row-reverse justify-center items-start sm:items-center gap-5">
            <img src="/illustrations/404-not-found.png" alt="Illustration : Ajouter un mémo" class="w-3/4 xsm:w-1/2 sm:2/5 self-center" />
            <div class="relative mx-auto flex flex-col justify-center items-start xsm:items-center gap-5">
                <h2 class="text-2xl dark:text-neutral-50">Carnet non trouvé</h2>
                <p class="text-neutral-500 dark:text-neutral-400 max-w-[350px] xsm:text-center">
                    Ton lien était soit invalide ou ton carnet n'est plus disponible.
                </p>
                <Button.Normal class="rounded-lg" on:click={() => goto("/app/mark-books")}>
                    Retourner à la page principale
                </Button.Normal>
            </div>
        </div>
    {:else}
        {#await fetchGroupsAndSubjects(jwt, $currentBook.id.toString()) then groupsAndSubjects}
            {#if groupsAndSubjects}
                {@const { groups, subjects } = groupsAndSubjects}
                <div class="relative w-full flex justify-between text-xl">
                    <div class="flex gap-5">
                        <button on:click={() => dispatch("close")}>
                            <IconChevronLeft />
                        </button>
                        <h1>{$currentBook.title}</h1>
                    </div>
                    <span>{$currentBook.averageScore}</span>
                </div>
                <p class="text-neutral-500">{$currentBook.description}</p>
                <MainView groupsData={groups} subjectsData={subjects} />
            {:else}
                <p class="dark:text-neutral-50">Impossible de charger les carnets de notes.</p>
            {/if}
        {:catch err}
            <p class="dark:text-neutral-50">Une erreur est survenue.</p>
            <p class="dark:text-neutral-50">{err}</p>
        {/await}
    {/if}
</FullScreen.Modal>
