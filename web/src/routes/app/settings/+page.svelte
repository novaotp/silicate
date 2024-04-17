<script lang="ts">
    import { goto } from '$app/navigation';
    import { Button } from '$lib/ui';
</script>

<svelte:head>
    <title>Paramètres - Silicate</title>
    <meta
        name="description"
        content="Prends le contrôle de ton expérience et configure tes paramètres pour une utilisation optimale.
        Inscris-toi et gère ta vie étudiante comme un pro !"
    />
</svelte:head>

<main class="relative w-full h-full flex flex-col justify-center items-center">
    <Button.Danger variant="primary" on:click={async () => await goto('/auth/logout')}>Déconnexion</Button.Danger>
</main>
