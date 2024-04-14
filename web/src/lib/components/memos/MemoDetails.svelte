<script lang="ts">
    import { page } from '$app/stores';
    import { FullScreen } from '$lib/ui';
    import { IconChevronLeft } from '@tabler/icons-svelte';
    import { changeSearchParams } from './utils';
    import type { Memo } from '$libs/models/Memo';
    import { MemoRequests } from '$lib/requests/memos';
    import { getContext } from 'svelte';
    import Inner from './Inner.MemoDetails.svelte';

    $: viewedMemoId = $page.url.searchParams.get('id');

    const jwt = getContext<string>('jwt');
    const requests = new MemoRequests(jwt);
</script>

{#if viewedMemoId}
    <FullScreen.Modal>
        <header class="fixed flex justify-between items-center w-full h-[60px] px-5 z-[100] bg-white">
            <button class="rounded-full" on:click={() => changeSearchParams('id', null)}>
                <IconChevronLeft />
            </button>
        </header>
        {#await requests.getMemo(viewedMemoId)}
            <p>Chargement du mémo...</p>
        {:then result}
            <div class="relative w-full h-full flex flex-col justify-start items-start p-5 pt-[60px] gap-5">
                {#if !result.success}
                    <p>Impossible de charger le mémo.</p>
                {:else}
                    <Inner memo={result.data} />
                {/if}
            </div>
        {:catch}
            <p>Une erreur est survenue.</p>
        {/await}
    </FullScreen.Modal>
{/if}
