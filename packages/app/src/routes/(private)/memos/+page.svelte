<script lang="ts">
	import { page } from '$app/stores';
    import { PUBLIC_APP_NAME } from '$env/static/public';
	import { ContextProvider, fetchCategories, fetchMemos, Loading, MainView } from '$features/app/memos';
	import { getPreference } from '$utils/capacitor-preferences';

    $: search = $page.url.searchParams.get('search') ?? "";
    $: category = $page.url.searchParams.get('category') ?? "";

    const getMemos = async (search: string, category: string) => {
        const token = await getPreference<{ jwt: string, expires: Date }>('token', { parse: true });
        return await fetchMemos(token.jwt, search, category);
    }

    const getCategories = async (search: string) => {
        const token = await getPreference<{ jwt: string, expires: Date }>('token', { parse: true });
        return await fetchCategories(token.jwt, search);
    }
</script>

<svelte:head>
    <title>Mes mémos - {PUBLIC_APP_NAME}</title>
    <meta
        name="description"
        content="N'oublie rien. Crée et gère des mémos en ligne pour un esprit clair et organisé.
        Inscris-toi et gère ta vie étudiante comme un pro !"
    />
</svelte:head>

<main class="relative w-full h-full flex flex-col justify-start gap-5 overflow-auto p-5 pt-0 md:pt-5">
    {#await Promise.all([getMemos(search, category), getCategories(search)])}
        <Loading />
    {:then [memosResponse, categoriesResponse]}
        {#if memosResponse.success && categoriesResponse.success}
            <ContextProvider memos={memosResponse.data} categories={categoriesResponse.data}>
                <MainView />
            </ContextProvider>
        {:else}
            <p class="dark:text-neutral-50">Impossible de charger les mémos.</p>
            <p>Erreur sur les mémos : {memosResponse.message}</p>
            <p>Erreur sur les mémos : {categoriesResponse.message}</p>
        {/if}
    {:catch}
        <p class="dark:text-neutral-50">Une erreur est survenue lors du chargement. Réessayez plus tard.</p>
    {/await}
</main>
