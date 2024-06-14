<script lang="ts">
    import { addToast } from '$lib/stores/toast';
    import { Button, Card, FullScreen } from '$lib/ui';
    import type { Memo } from '$libs/models/Memo';
    import IconCircleXFilled from '@tabler/icons-svelte/IconCircleXFilled.svelte';
    import IconTag from '@tabler/icons-svelte/IconTag.svelte';
    import { getContext } from 'svelte';
    import type { MemoPageContext } from './utils';
    import { page } from '$app/stores';
    import { deserialize } from '$app/forms';

    export let memo: Memo;
    let replica = { ...memo };

    const { memos, categories } = getContext<MemoPageContext>('page');
    let timer: NodeJS.Timeout;
    let showCategoryChanger: boolean = false;

    $: filteredCategories = $categories.filter((c) => c.includes(replica.category ?? ''));

    const edit = async () => {
        const formData = new FormData();
        formData.set('id', replica.id.toString());
        formData.set('title', replica.title);
        formData.set('content', replica.content);
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

        memo = replica;
    };
</script>

{#if replica.category}
    <button class="rounded-full" on:click={() => (showCategoryChanger = true)}>
        <IconTag />
    </button>
{:else}
    <button
        class="rounded-full"
        on:click={() => {
            replica.category = 'Ma catégorie';
            showCategoryChanger = true;
            clearTimeout(timer);
            timer = setTimeout(async () => {
                await edit();
            }, 750);
        }}
    >
        <IconTag />
    </button>
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
        <Card class="w-[400px] flex flex-col justify-center items-center text-sm gap-5">
            <div class="flex flex-col w-full relative justify-start items-start gap-2">
                <label for="category" class="text-neutral-500">Catégorie</label>
                <div class="relative w-full h-[50px] flex justify-between rounded text-neutral-700 bg-neutral-100">
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
