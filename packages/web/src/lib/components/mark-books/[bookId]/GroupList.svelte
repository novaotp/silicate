<script lang="ts">
    import { goto } from '$app/navigation';
    import type { Book, Group, Subject } from '$libs/models/Mark';
    import IconChevronRight from '@tabler/icons-svelte/IconChevronRight.svelte';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';

    const book = getContext<Writable<Book>>('book');
    const groups = getContext<Writable<Group[]>>('groups');
    const subjects = getContext<Writable<Subject[]>>('subjects');

    $: groupedSubjects = $groups.map((group) => {
        return {
            ...group,
            subjects: $subjects.filter((subject) => subject.groupId === group.id)
        };
    });
</script>

<!--
@component
Displays the groups and the subjects.
-->

{#each groupedSubjects as { subjects, ...group }}
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
            {#each subjects as subject}
                <button
                    on:click={() => goto(`/app/mark-books/${$book.id}/groups/${group.id}/subjects/${subject.id}`)}
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

<style lang="postcss">
    .group-description::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 2px;
        @apply bg-neutral-300;
    }
</style>
