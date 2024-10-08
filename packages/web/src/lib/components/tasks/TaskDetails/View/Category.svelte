<script lang="ts">
    import IconCircleXFilled from '@tabler/icons-svelte/icons/circle-x-filled';
    import IconTag from '@tabler/icons-svelte/icons/tag';
    import { getContext } from 'svelte';
    import { fetchCategories, fetchTasks, type PageContext } from '../../utils';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import { addToast } from '$lib/stores/toast';
    import { page } from '$app/stores';
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import { Button, Card, FullScreen, Input, Label } from '$lib/ui';

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

        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/tasks/${id}`, {
            method: 'PATCH',
            body: JSON.stringify({ category }),
            headers: {
                accept: 'application/json',
                authorization: `Bearer ${jwt}`,
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
    <div class="relative flex items-center gap-4 text-neutral-500 dark:text-neutral-300">
        <IconTag />
        <span>Catégorie</span>
    </div>
    <Button.Warning on:click={() => (show = true)} variant="primary" size="small">
        {value}
    </Button.Warning>
</div>
{#if show}
    <FullScreen.Backdrop
        class="flex justify-center items-center px-5"
        on:click={() => {
            if (tempValue === '') {
                addToast({ type: 'error', message: 'Entrez une catégorie ou supprimer la.' });
                return;
            }
            show = false;
        }}
    >
        <Card class="md:w-[400px] w-full flex flex-col justify-center items-center text-sm gap-5">
            <div class="flex flex-col w-full relative justify-start items-start gap-2">
                <Label for="category">Catégorie</Label>
                <div class="relative w-full h-[50px] flex justify-between rounded-lg">
                    <Input
                        name="category"
                        value={tempValue}
                        maxlength={17}
                        on:input={onCategoryChange}
                        on:click
                        class="relative w-full h-[50px] px-5 rounded-r-none bg-transparent"
                    />
                    <button on:click={() => (tempValue = '')} class="relative h-full dark:bg-neutral-800 aspect-square flex justify-center items-center rounded-r-lg">
                        <IconCircleXFilled class="dark:text-neutral-300" />
                    </button>
                </div>
                {#if tempValue === ''}
                    <span class="text-accent-danger-500 dark:text-accent-danger-400 text-xs">Entrez une valeur ou supprimez la.</span>
                {/if}
            </div>
            <div class="relative w-full flex flex-wrap justify-start gap-5">
                {#each filteredCategories as category}
                    <Button.Normal variant="secondary" on:click={() => (tempValue = category)} class="flex justify-start items-center">
                        {category}
                    </Button.Normal>
                {:else}
                    <span>Aucune suggestion disponible.</span>
                {/each}
                <Button.Danger
                    variant="primary"
                    on:click={async () => {
                        tempValue = '';
                        show = false;
                        setTimeout(async () => await editCategory(), 400);
                    }}
                >
                    Supprimer
                </Button.Danger>
            </div>
        </Card>
    </FullScreen.Backdrop>
{/if}
