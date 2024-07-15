<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import type { PageServerData } from './$types';
    import IconChevronLeft from '@tabler/icons-svelte/IconChevronLeft.svelte';

    export let data: PageServerData;

    $: bookId = $page.params.bookId!;
</script>

{#await data.exams}
    <p>Chargement des examens...</p>
{:then exams}
    {#if data.subject && exams}
        <div class="relative w-full flex justify-between text-xl">
            <div class="flex gap-5">
                <button on:click={() => goto(`/app/mark-books/${bookId}`)}>
                    <IconChevronLeft />
                </button>
                <h1>{data.subject.title}</h1>
            </div>
            <span>{data.subject.averageScore}</span>
        </div>
        <p class="text-neutral-500">{data.subject.description}</p>
        {#each exams as exam}
            <button
                on:click={() => goto(`${$page.url.pathname}/${exam.id}`)}
                class="relative w-full p-5 rounded-lg bg-neutral-50 flex justify-center items-center gap-5"
            >
                <div class="relative flex-grow flex flex-col justify-between items-start gap-[10px]">
                    <h2>{exam.title} ({exam.weight}x)</h2>
                    <p class="text-neutral-500 text-sm text-start">{exam.comment}</p>
                </div>
                <div class="relative my-auto size-10 rounded-full bg-primary-600 text-white grid place-items-center">
                    {exam.score}
                </div>
            </button>
        {/each}
    {:else}
        <p class="dark:text-neutral-50">Impossible de charger les carnets de notes.</p>
    {/if}
{:catch err}
    <p class="dark:text-neutral-50">Une erreur est survenue.</p>
    <p class="dark:text-neutral-50">{err}</p>
{/await}
