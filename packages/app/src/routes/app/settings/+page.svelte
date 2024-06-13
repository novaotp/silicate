<script lang="ts">
    import { goto } from '$app/navigation';
    import { PUBLIC_APP_NAME } from '$env/static/public';
    import { Button } from '$lib/ui';
    import { kv } from '$lib/utils/kv';

    async function disconnect() {
        await kv.delete("id");
        goto('/login');
    }
</script>

<svelte:head>
    <title>Paramètres - {PUBLIC_APP_NAME}</title>
    <meta
        name="description"
        content="Prends le contrôle de ton expérience et configure tes paramètres pour une utilisation optimale.
        Inscris-toi et gère ta vie étudiante comme un pro !"
    />
</svelte:head>

<main class="relative w-full h-full flex flex-col justify-center items-center">
    <Button.Danger variant="primary" on:click={disconnect}>Déconnexion</Button.Danger>
</main>
