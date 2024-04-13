<script lang="ts">
    import { goto } from "$app/navigation";
    import { Button } from "$lib/ui";
</script>

<svelte:head>
    <title>Paramètres - Silicate</title>
</svelte:head>

<main class="relative w-full h-full flex flex-col justify-center items-center">
    <Button.Danger variant="primary" on:click={() => goto("/auth/logout")}>
        Déconnexion
    </Button.Danger>
</main>
