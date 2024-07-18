<script lang="ts">
    import { addToast } from '$lib/stores/toast';
    import type { Memo } from '$libs/models/Memo';
    import { getContext } from 'svelte';
    import { changeSearchParams, type MemoPageContext } from './utils';
    import Editor from './Editor/Editor.svelte';
    import { Button, Card, Confirm, FullScreen } from '$lib/ui';
    import IconCircleXFilled from '@tabler/icons-svelte/icons/circle-x-filled';
    import IconTag from '@tabler/icons-svelte/icons/tag';
    import IconTrash from '@tabler/icons-svelte/icons/trash';
    import { fly } from 'svelte/transition';
    import { page } from '$app/stores';
    import type { SubmitFunction } from '../../../routes/app/memos/$types';
    import { deserialize, enhance } from '$app/forms';

    export let showSettings: boolean;
    export let memo: Memo;
    let replica = { ...memo };

    const { memos, categories } = getContext<MemoPageContext>('page');

    let timer: NodeJS.Timeout;
    let showCategoryChanger: boolean = false;
    let showDeleteConfirmation: boolean = false;

    $: filteredCategories = $categories.filter((c) => c.includes(replica.category ?? ''));

    const edit = async () => {
        const formData = new FormData();
        formData.set('id', replica.id.toString());
        formData.set('title', replica.title);
        formData.set('content', replica.content);
        formData.set('pinned', String(replica.pinned));
        if (replica.category) {
            formData.set('category', replica.category);
        }

        const response = await fetch(`${$page.url.pathname}?/edit`, {
            method: 'POST',
            body: formData
        });

        const result = deserialize<{ memos: Memo[]; categories: string[] }, { message: string }>(await response.text());

        if (result.type === 'failure') {
            return addToast({ type: 'error', message: result.data!.message });
        } else if (result.type === 'success') {
            $memos = result.data!.memos;
            $categories = result.data!.categories;
        }

        memo = { ...replica };
    };

    const destroyEnhance: SubmitFunction = ({ formData }) => {
        formData.set('id', replica.id.toString());
        return ({ result }) => {
            if (result.type === 'failure') {
                return addToast({ type: 'error', message: result.data!.message });
            } else if (result.type === 'success') {
                addToast({ type: 'success', message: 'Supprimé avec succès.' });
                changeSearchParams('id', null);
                $memos = $memos.filter((m) => m.id !== replica.id);
            }
        };
    };
</script>

<input
    value={replica.title}
    on:input={(event) => {
        clearTimeout(timer);
        replica.title = event.currentTarget.value;
        timer = setTimeout(async () => {
            await edit();
        }, 750);
    }}
    class="relative w-full flex justify-between items-center bg-transparent text-2xl font-medium h-10 dark:text-neutral-50"
/>
<Editor
    content={replica.content}
    on:edit={(event) => {
        clearTimeout(timer);
        replica.content = event.detail;
        timer = setTimeout(async () => {
            await edit();
        }, 750);
    }}
/>
{#if showSettings}
    <FullScreen.Backdrop on:click={() => (showSettings = false)} class="flex justify-center items-end z-[999]">
        <div role="dialog" class="fixed w-full flex flex-col shadow-2xl bg-white dark:bg-neutral-700 dark:text-neutral-50" transition:fly={{ y: 50 }}>
            {#if replica.category !== null}
                <button
                    on:click={async () => {
                        showSettings = false;
                        showCategoryChanger = true;
                    }}
                    class="relative w-full px-5 h-14 flex justify-start items-center gap-10"
                >
                    <IconTag />
                    <span class="line-clamp-1">{replica.category}</span>
                </button>
            {:else}
                <button
                    on:click={async () => {
                        replica.category = 'Ma catégorie';
                        showSettings = false;
                        showCategoryChanger = true;
                        clearTimeout(timer);
                        timer = setTimeout(async () => {
                            await edit();
                        }, 750);
                    }}
                    class="relative w-full px-5 h-14 flex justify-start items-center gap-10"
                >
                    <IconTag />
                    <span>Ajouter une catégorie</span>
                </button>
            {/if}
            <Button.Danger
                on:click={() => {
                    showSettings = false;
                    showDeleteConfirmation = true;
                }}
                class="w-full px-5 h-14 border-0 rounded-none flex justify-start items-center gap-10"
            >
                <IconTrash />
                <span>Supprimer</span>
            </Button.Danger>
        </div>
    </FullScreen.Backdrop>
{/if}
{#if showDeleteConfirmation}
    <FullScreen.Backdrop on:click={() => (showDeleteConfirmation = false)} class="flex justify-center items-center">
        <Confirm.Root class="relative w-full sm:max-w-[480px] flex flex-col gap-5 justify-center items-center">
            <Confirm.Title>Supprimer "{replica.title}"</Confirm.Title>
            <Confirm.Description>
                Je comprends que cette action est irréversible et que je ne pourrais pas revenir sur ma décision.
            </Confirm.Description>
            <Confirm.Actions>
                <Confirm.No>
                    <Button.Danger variant="secondary" on:click={() => (showDeleteConfirmation = false)} class="w-full h-full">Annuler</Button.Danger>
                </Confirm.No>
                <Confirm.Yes>
                    <form method="post" action="?/destroy" use:enhance={destroyEnhance} class="relative w-full">
                        <Button.Danger
                            type="submit"
                            variant="primary"
                            class="w-full h-full"
                        >
                            Supprimer
                        </Button.Danger>
                    </form>
                </Confirm.Yes>
            </Confirm.Actions>
        </Confirm.Root>
    </FullScreen.Backdrop>
{/if}
{#if showCategoryChanger}
    <FullScreen.Backdrop
        class="flex justify-center items-center px-5"
        on:click={() => {
            if (replica.category === '') {
                addToast({ type: 'error', message: 'Entrez une catégorie ou supprimer la.' });
                return;
            }
            showCategoryChanger = false;
        }}
    >
        <Card class="w-full flex flex-col justify-center items-center text-sm gap-5">
            <div class="flex flex-col w-full relative justify-start items-start gap-2">
                <label for="category" class="text-neutral-500">Catégorie</label>
                <div
                    class="relative w-full h-[50px] flex justify-between rounded text-neutral-700 bg-neutral-100 dark:text-neutral-50 dark:bg-neutral-700"
                >
                    <input
                        name="category"
                        value={replica.category}
                        maxlength="17"
                        on:input={(event) => {
                            replica.category = event.currentTarget.value;

                            if (replica.category !== '') {
                                clearTimeout(timer);
                                timer = setTimeout(async () => {
                                    await edit();
                                }, 750);
                            }
                        }}
                        on:click|stopPropagation
                        class="relative w-full h-[50px] px-5 rounded-l bg-transparent"
                    />
                    <button on:click={() => (replica.category = '')} class="relative h-full aspect-square flex justify-center items-center rounded-r">
                        <IconCircleXFilled class="dark:text-neutral-50" />
                    </button>
                </div>
                {#if replica.category === ''}
                    <span class="text-accent-danger-500 dark:text-accent-danger-400 text-xs">Entrez une valeur ou supprimez la.</span>
                {/if}
            </div>
            <div class="relative w-full flex flex-wrap justify-start gap-5">
                {#each filteredCategories as category}
                    <Button.Normal variant="secondary" on:click={() => (replica.category = category)} class="flex justify-start items-center">
                        {category}
                    </Button.Normal>
                {:else}
                    <span>Aucune suggestion disponible.</span>
                {/each}
                <Button.Danger
                    variant="primary"
                    on:click={async () => {
                        replica.category = null;
                        showCategoryChanger = false;
                        clearTimeout(timer);
                        timer = setTimeout(async () => {
                            await edit();
                        }, 750);
                    }}
                >
                    Supprimer
                </Button.Danger>
            </div>
        </Card>
    </FullScreen.Backdrop>
{/if}
