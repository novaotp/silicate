<script lang="ts">
    import { goto } from "$app/navigation";
    import * as Button from "$lib/components/shared/Button"
</script>

<main class="relative w-full h-full flex flex-col justify-center items-center">
    <Button.Danger.Primary on:click={() => goto("/auth/logout")}>
        Déconnexion
    </Button.Danger.Primary>
</main>
