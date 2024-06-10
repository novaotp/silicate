<script lang="ts">
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import { getUser } from "$stores/user";
</script>

<svelte:head>
    <title>Dashboard - {PUBLIC_APP_NAME}</title>
    <meta
        name="description"
        content="Gagne du temps et reste informé grâce à notre tableau de bord intuitif qui te donne un aperçu rapide de tes tâches, projets et échéances.
        Inscris-toi et améliore ta productivité dès aujourd'hui !"
    />
</svelte:head>

{#await getUser()}
    <p>Chargement...</p>
{:then user}
    {#if !user}
        <p>Something went wrong.</p>
    {:else}
        <main class="px-5 flex flex-col gap-5">
            <h1 class="text-2xl font-semibold">Content de te revoir, {user.firstName} !</h1>
        </main>
    {/if}
{/await}
