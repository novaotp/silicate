<script lang="ts">
    import { MemoRequests } from "$lib/requests/memos";
    import { addToast } from "$lib/stores/toast";
    import { getContext } from "svelte";
    import { changeSearchParams, type MemoPageContext } from "./utils";
    import { page } from "$app/stores";
    import { Button } from "$lib/ui";
    import { IconPlus } from "@tabler/icons-svelte";

    $: category = $page.url.searchParams.get('category') ?? '';
    $: search = $page.url.searchParams.get('search') ?? '';

    const { memos } = getContext<MemoPageContext>('page');
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

<Button.Normal on:click={addMemo} class="fixed bottom-5 right-5 p-0 rounded-lg w-[50px] aspect-square flex justify-center items-center">
    <IconPlus />
</Button.Normal>
