<script lang="ts">
    import { page } from '$app/stores';
    import { Card, FullScreen } from '$lib/ui';
    import IconChevronLeft from '@tabler/icons-svelte/IconChevronLeft.svelte';
    import IconDotsVertical from '@tabler/icons-svelte/IconDotsVertical.svelte';
    import { changeSearchParams } from './utils';
    import { getContext } from 'svelte';
    import Inner from './Inner.MemoDetails.svelte';
    import { PUBLIC_BACKEND_URL } from '$env/static/public';
    import DesktopInner from './DesktopInner.MemoDetails.svelte';

    $: viewedMemoId = $page.url.searchParams.get('id');

    const jwt = getContext<string>('jwt');
    let showSettings: boolean = false;
    
    const getMemo = async (id: string) => {
        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/memos/${id}`, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                authorization: jwt
            }
        });

        return await response.json();
    };
</script>

{#if viewedMemoId}
    <div class="block md:hidden">
        <FullScreen.Modal>
            <header class="fixed flex justify-between items-center w-full h-[60px] px-5 z-[100] bg-white">
                <button class="rounded-full" on:click={() => changeSearchParams('id', null)}>
                    <IconChevronLeft />
                </button>
                <button class="py-2" on:click={() => (showSettings = !showSettings)}>
                    <IconDotsVertical />
                </button>
            </header>
            {#await getMemo(viewedMemoId)}
                <p>Chargement du mémo...</p>
            {:then result}
                <div class="relative w-full h-full flex flex-col justify-start items-start p-5 pt-[60px] gap-5">
                    {#if !result.success}
                        <p>Impossible de charger le mémo.</p>
                    {:else}
                        <Inner memo={result.data} bind:showSettings />
                    {/if}
                </div>
            {:catch}
                <p>Une erreur est survenue.</p>
            {/await}
        </FullScreen.Modal>
    </div>
    <div class="hidden md:block">
        <FullScreen.Backdrop on:click={() => changeSearchParams('id', null)} class="flex justify-center items-center">
            <Card class="w-[760px] max-h-[760px]">
                {#await getMemo(viewedMemoId)}
                    <p>Chargement du mémo...</p>
                {:then result}
                    <div class="relative w-full h-full flex flex-col justify-start px-5 pb-5 items-start gap-5">
                        {#if !result.success}
                            <p>Impossible de charger le mémo.</p>
                        {:else}
                            <DesktopInner memo={result.data} />
                        {/if}
                    </div>
                {:catch}
                    <p>Une erreur est survenue.</p>
                {/await}
            </Card>
        </FullScreen.Backdrop>
    </div>
{/if}
