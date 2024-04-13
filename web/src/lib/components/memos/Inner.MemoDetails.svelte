<script lang="ts">
    import { MemoRequests } from "$lib/requests/memos";
    import { addToast } from "$lib/stores/toast";
    import type { Memo } from "$libs/models/Memo";
    import { getContext } from "svelte";
    import type { MemoPageContext } from "./utils";

    export let memo: Memo;
    let replica = { ...memo };

    const { memos } = getContext<MemoPageContext>('page');
    const jwt = getContext<string>('jwt');
    const requests = new MemoRequests(jwt);

    const edit = async (event: Event & { currentTarget: EventTarget & HTMLInputElement }) => {
        replica.title = event.currentTarget.value;

        const result = await requests.updateMemo(memo.id, {
            title: replica.title,
            content: replica.content,
            category: replica.category
        });

        if (!result.success) {
            addToast({ type: 'error', message: "Impossible de mettre à jour le mémo." });
            return;
        }

        memo = replica;
        $memos = $memos.map(m => m.id !== memo.id ? m : replica);
    }
</script>

<input
    value={replica.title}
    on:input={edit}
    class="relative w-full flex justify-between items-center bg-transparent text-2xl font-medium"
/>
