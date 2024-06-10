<script lang="ts">
    import { MemoRequests } from '$lib/requests/memos';
    import { addToast } from '$lib/stores/toast';
    import type { Memo } from '$libs/models/Memo';
    import { getContext } from 'svelte';
    import { changeSearchParams, type MemoPageContext } from './utils';
    import Editor from './Editor/Editor.svelte';
    import { Button, Card, FullScreen } from '$lib/ui';
    import { IconCircleXFilled, IconTag, IconTrash } from '@tabler/icons-svelte';
    import { fly } from 'svelte/transition';
    import { page } from '$app/stores';

    export let showSettings: boolean;
    export let memo: Memo;
    let replica = { ...memo };

    const { memos, categories } = getContext<MemoPageContext>('page');
    const jwt = getContext<string>('jwt');
    const requests = new MemoRequests(jwt);

    let timer: NodeJS.Timeout;
    let showCategoryChanger: boolean = false;

    $: filteredCategories = $categories.filter((c) => c.includes(replica.category ?? ""));
    $: categorySearchParam = $page.url.searchParams.get('category') ?? '';
    $: searchSearchParam = $page.url.searchParams.get('search') ?? '';

    const edit = async (key: 'title' | 'content' | 'category', newValue: string | null) => {
        /* @ts-ignore */
        replica[key] = newValue;

        const result = await requests.updateMemo(memo.id, {
            title: replica.title,
            content: replica.content,
            category: replica.category
        });

        if (!result.success) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour le mémo.' });
            return;
        }

        memo = replica;

        const fetchResult = await requests.getMemos(categorySearchParam, searchSearchParam);

        if (!fetchResult.success) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les mémos.' });
            return;
        }

        $memos = fetchResult.data;

        if (key === "category") {
            const tempCategories = await requests.getCategories();

            if (!tempCategories) {
                addToast({ type: 'error', message: 'Impossible de mettre à jour les catégories.' });
                return;
            }

            $categories = tempCategories;
        }
    };

    const destroy = async () => {
        const { success, message } = await requests.deleteMemo(replica.id);

        if (!success) {
            addToast({ type: 'error', message });
            return;
        } else {
            addToast({ type: 'success', message: 'Tâche supprimée avec succès.' });
        }

        changeSearchParams('id', null);
        $memos = $memos.filter((m) => m.id !== replica.id);
    };
</script>

<input
    value={replica.title}
    on:input={async (event) => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            await edit('title', event.currentTarget.value);
        }, 750);
    }}
    class="relative w-full flex justify-between items-center bg-transparent text-2xl font-medium h-10"
/>
<Editor
    content={replica.content}
    on:edit={async (event) => {
        clearTimeout(timer);
        timer = setTimeout(async () => {
            await edit('content', event.detail);
        }, 750);
    }}
/>
{#if showSettings}
    <FullScreen.Backdrop on:click={() => (showSettings = false)} class="flex justify-center items-end z-[999]">
        <div role="dialog" class="fixed w-full flex flex-col shadow-2xl bg-white" transition:fly={{ y: 50 }}>
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
                            await edit('category', 'Ma catégorie');
                        }, 750);
                    }}
                    class="relative w-full px-5 h-14 flex justify-start items-center gap-10"
                >
                    <IconTag />
                    <span>Ajouter une catégorie</span>
                </button>
            {/if}
            <Button.Danger variant="secondary" on:click={destroy} class="px-5 h-14 border-0 rounded-none flex justify-start items-center gap-10">
                <IconTrash />
                <span>Supprimer</span>
            </Button.Danger>
        </div>
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
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <Card class="w-full flex flex-col justify-center items-center text-sm gap-5">
            <div class="flex flex-col w-full relative justify-start items-start gap-2">
                <label for="category" class="text-neutral-500">Catégorie</label>
                <div class="relative w-full h-[50px] flex justify-between rounded text-neutral-700 bg-neutral-100">
                    <input
                        name="category"
                        value={replica.category}
                        maxlength="17"
                        on:input={(event) => {
                            replica.category = event.currentTarget.value;

                            if (replica.category !== "") {
                                clearTimeout(timer);
                                timer = setTimeout(async () => {
                                    await edit('category', replica.category);
                                }, 750);
                            }
                        }}
                        on:click|stopPropagation
                        class="relative w-full h-[50px] px-5 rounded-l bg-transparent"
                    />
                    <button on:click={() => (replica.category = '')} class="relative h-full aspect-square flex justify-center items-center rounded-r">
                        <IconCircleXFilled />
                    </button>
                </div>
                {#if replica.category === ''}
                    <span class="text-accent-danger-500 text-xs">Entrez une valeur ou supprimez la.</span>
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
                            await edit('category', replica.category);
                        }, 750);
                    }}
                >
                    Supprimer
                </Button.Danger>
            </div>
        </Card>
    </FullScreen.Backdrop>
{/if}
