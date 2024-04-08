<script lang="ts">
    import FullScreen from '$lib/components/shared/FullScreen.svelte';
    import { IconCircleXFilled, IconPointFilled, IconTag } from '@tabler/icons-svelte';
    import { createEventDispatcher, getContext } from 'svelte';
    import { fly } from 'svelte/transition';
    import { fetchCategories, fetchTasks, type PageContext } from '../../utils';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import { addToast } from '$lib/stores/toast';
    import { page } from '$app/stores';
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import * as Button from '$lib/components/shared/Button';

    export let id: number;
    export let value: string;
    export let show: boolean;

    let tempValue: string = value;
    let timer: NodeJS.Timeout;

    const { tasks, categories } = getContext<PageContext>('page');
    const jwt = getContext<string>('jwt');

    $: filteredCategories = $categories.filter((c) => c.includes(tempValue));
    $: categorySearchParam = $page.url.searchParams.get('category') ?? '';
    $: search = $page.url.searchParams.get('search') ?? '';
    $: archivedSearchParam = $page.url.searchParams.get('tab') === 'archives';

    const editCategory = async () => {
        let category: string | null = tempValue;

        if (category.trimEnd() === '') {
            category = null;
        }

        const response = await fetch(`${PUBLIC_BACKEND_URL}/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ category }),
            headers: {
                accept: 'application/json',
                authorization: jwt,
                'content-type': 'application/json'
            }
        });

        const { success, message }: ApiResponse = await response.json();

        if (!success) {
            addToast({ type: 'error', message });
            return;
        }

        const updatedTasks = await fetchTasks(jwt, categorySearchParam, search, archivedSearchParam);

        if (!updatedTasks) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTasks;

        const updatedCategories = await fetchCategories(jwt, archivedSearchParam);

        if (!updatedCategories) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les catégories.' });
            return;
        }

        $categories = updatedCategories;

        /* @ts-ignore */
        value = category;

        if (category === null) {
            addToast({ type: 'success', message: 'Catégorie supprimée.' });
        }
    };

    const onCategoryChange = (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
        clearTimeout(timer);
        tempValue = event.currentTarget.value;

        if (tempValue !== '') {
            timer = setTimeout(() => {
                editCategory();
            }, 500);
        }
    };
</script>

<div class="relative w-full flex justify-between">
    <div class="relative flex items-center gap-4 text-neutral-500">
        <IconTag />
        <span>Catégorie</span>
    </div>
    <Button.Warning.Primary on:click={() => (show = true)} size="small">
        {value}
    </Button.Warning.Primary>
</div>
{#if show}
    <FullScreen
        class="flex justify-center items-center px-5"
        on:click={() => {
            if (tempValue === '') {
                addToast({ type: 'error', message: 'Entrez une catégorie ou supprimer la.' });
                return;
            }
            show = false;
        }}
    >
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div
            class="relative w-full flex flex-col justify-center items-center bg-white rounded-lg p-5 text-sm gap-5"
            on:click|stopPropagation
            transition:fly={{ y: 100 }}
        >
            <div class="flex flex-col w-full relative justify-start items-start gap-2">
                <label for="category" class="text-neutral-500">Catégorie</label>
                <div class="relative w-full h-[50px] flex justify-between rounded-smd text-neutral-700 bg-neutral-100">
                    <input
                        name="category"
                        value={tempValue}
                        maxlength="17"
                        on:input={onCategoryChange}
                        on:click|stopPropagation
                        class="relative w-full h-[50px] px-5 rounded-l-smd bg-transparent"
                    />
                    <button on:click={() => (tempValue = '')} class="relative h-full aspect-square flex justify-center items-center rounded-r-smd">
                        <IconCircleXFilled />
                    </button>
                </div>
                {#if tempValue === ''}
                    <span class="text-accent-danger-500 text-xs"> Entrez une valeur ou supprimez la. </span>
                {/if}
            </div>
            <div class="relative w-full flex flex-wrap justify-start gap-5">
                {#each filteredCategories as category}
                    <button
                        on:click|stopPropagation={() => (tempValue = category)}
                        class="relative px-4 rounded-smd py-2 text-sm flex justify-start items-center border border-primary-600 bg-primary-50 text-primary-600"
                    >
                        {category}
                    </button>
                {:else}
                    <span>Aucune suggestion disponible.</span>
                {/each}
                <Button.Danger.Primary
                    on:click={async () => {
                        tempValue = '';
                        show = false;
                        await editCategory();
                    }}
                >
                    Supprimer
                </Button.Danger.Primary>
            </div>
        </div>
    </FullScreen>
{/if}
