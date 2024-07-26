<script lang="ts">
	import { goto } from "$app/navigation";
	import { Label, Button } from "$ui/forms";
	import DeleteAccount from "./DeleteAccount.svelte";
	import ThemeHandler from "./ThemeHandler.svelte";
</script>

<section class="relative w-full h-full flex flex-col px-5 pt-[60px] md:pt-0 gap-5">
    <h2 class="dark:text-neutral-50">Avancé</h2>
    <ThemeHandler />
    <div class="relative w-full flex justify-between items-center gap-[10px]">
        <Label for="disconnect">Me déconnecter sur cet appareil.</Label>
        <Button.Danger class="rounded-lg" on:click={() => goto('/logout')}>
            Déconnexion
        </Button.Danger>
    </div>
    <DeleteAccount />
</section>
