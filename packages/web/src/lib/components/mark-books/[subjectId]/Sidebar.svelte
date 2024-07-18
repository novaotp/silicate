<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { getContext } from "svelte";
    import IconChevronRight from "@tabler/icons-svelte/icons/chevron-right";
    import type { Writable } from "svelte/store";
    import type { Book, Group, Subject } from "$libs/models/Mark";

    const books = getContext<Writable<Book[]>>("books");
    const groups = getContext<Writable<Group[]>>("groups");
    const subjects = getContext<Writable<Subject[]>>("subjects");

    $: currentBook = $books.find(b => b.id.toString() === $page.params.bookId);
</script>

<div class="hidden lg:flex relative min-w-[400px] flex-col h-full bg-neutral-100">
    <div class="relative w-full h-[120px] bg-primary-500 p-5 flex justify-between items-center">
        <h2 class="text-white text-xl">{currentBook?.title}</h2>
        {#if currentBook?.averageScore}
            <div class="relative h-10 aspect-square rounded-full bg-white text-primary-600 grid place-items-center">
                {currentBook.averageScore}
            </div>
        {/if}
    </div>
    <ul class="relative w-full flex flex-col gap-5 p-5">
        {#each $groups as group}
            <div class="relative w-full flex flex-col gap-[10px]">
                <div class="relative w-full flex justify-between">
                    <h2>{group.title} ({group.weight}x)</h2>
                    {#if group.averageScore}
                        <span>{group.averageScore}</span>
                    {/if}
                </div>
                <p class="relative text-neutral-500 text-sm pl-5 group-description">
                    {group.description}
                </p>
                <ul class="relative w-full pl-10 flex flex-col gap-[10px]">
                    {#each $subjects.filter(subject => subject.groupId === group.id) as subject}
                        <button
                            on:click={() => goto(`/app/mark-books/${$page.params.bookId}/groups/${group.id}/subjects/${subject.id}`)}
                            class="flex justify-between"
                        >
                            {subject.title}
                            {#if subject.averageScore}
                                ({subject.averageScore})
                            {/if}
                            <IconChevronRight class="size-5" />
                        </button>
                    {/each}
                </ul>
            </div>
        {/each}
    </ul>
</div>