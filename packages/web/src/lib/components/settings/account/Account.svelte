<script lang="ts">
    import { goto } from '$app/navigation';
    import { Button, Label } from '$lib/ui';
    import DeleteAccount from './DeleteAccount.svelte';
    import AvatarHandler from './AvatarHandler.svelte';
    import EditAccount from './EditAccount.svelte';
    import ThemeHandler from './ThemeHandler.svelte';
</script>

<section class="relative w-full h-full flex flex-col gap-5">
    <h2 class="dark:text-neutral-50">Mon profil</h2>
    <AvatarHandler />
    <EditAccount />
    <h3 class="dark:text-neutral-50">Avancé</h3>
    <ThemeHandler />
    <div class="relative w-full flex justify-between items-center gap-[10px]">
        <Label for="disconnect">Me déconnecter sur cet appareil.</Label>
        <Button.Danger class="rounded-lg" on:click={() => goto('/logout')}>Déconnexion</Button.Danger>
    </div>
    <DeleteAccount />
</section>
