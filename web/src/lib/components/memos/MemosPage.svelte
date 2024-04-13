<script lang="ts">
    import type { Memo } from '$libs/models/Memo';
    import { getContext, setContext } from 'svelte';
    import Categories from './Categories.svelte';
    import MemoList from './MemoList.svelte';
    import Search from './Search.svelte';
    import { writable } from 'svelte/store';
    import { changeSearchParams, type MemoPageContext } from './utils';
    import { Button } from '$lib/ui';
    import { IconPlus } from '@tabler/icons-svelte';
    import { MemoRequests } from '$lib/requests/memos';
    import { addToast } from '$lib/stores/toast';
    import { page } from '$app/stores';
    import MemoDetails from './MemoDetails.svelte';

    export let memosData: Memo[];
    export let categoriesData: string[];

    $: category = $page.url.searchParams.get('category') ?? '';
    $: search = $page.url.searchParams.get('search') ?? '';

    const { memos, categories } = setContext<MemoPageContext>('page', {
        memos: writable(memosData),
        categories: writable(categoriesData)
    });
    const jwt = getContext<string>('jwt');

    const requests = new MemoRequests(jwt);

    const addMemo = async () => {
        const result = await requests.createMemo();

        if (!result.success) {
            addToast({ type: 'error', message: result.message });
            return;
        } else {
            addToast({ type: 'success', message: 'Mémo ajouté avec succès.' });
        }

        const res = await requests.getMemos(category, search);

        if (!res.success) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les mémos.' });
            return;
        }

        $memos = res.data;

        changeSearchParams('id', result.data);
    };
</script>

<header class="relative w-full flex justify-start items-center">
    <h1 class="text-xl text-primary-950">Mémos</h1>
</header>
<Search />
<Categories />
<MemoList />
<Button.Normal on:click={addMemo} class="fixed bottom-5 right-5 p-0 rounded-lg w-[50px] aspect-square flex justify-center items-center">
    <IconPlus />
</Button.Normal>
<MemoDetails />
