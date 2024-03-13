<script lang="ts">
    import Content from '$/src/lib/memos/Editor/Content.svelte';
    import { IconArrowNarrowLeft } from '@tabler/icons-svelte';
    import type { Memo } from '$libs/models/Memo';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';

    export let memo: Memo;

    let isPreview: boolean = false;
    let timer: NodeJS.Timeout;
    let save: boolean = false;

    const activateSave = () => (save = true);

    $: {
        if (save) {
            clearTimeout(timer);

            timer = setTimeout(async () => {
                await fetch(`${PUBLIC_BACKEND_URL}/memos/${memo.id}`, {
                    method: "PUT",
                    body: JSON.stringify({ ...memo }),
                    headers: {
                        "content-type": "application/json"
                    }
                });
            }, 1000);

            save = false;
        };
    };
</script>

<main class="relative flex-col flex h-full flex-grow p-5">
    <header
        class="relative w-full h-[60px] flex justify-between items-center"
    >
        <a href="/app/memos">
            <IconArrowNarrowLeft />
        </a>
        <button on:click={() => (isPreview = !isPreview)}>
            {isPreview ? 'Show editor' : 'Show preview'}
        </button>
    </header>
    <input bind:value={memo.title} on:keyup={activateSave} />
    <Content
        bind:content={memo.content}
        {isPreview}
        on:edit={activateSave}
    />
</main>
