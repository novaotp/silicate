<script lang="ts">
    import { goto } from '$app/navigation';
    import { Button } from '$lib/ui';
    import DeleteAccount from './DeleteAccount.svelte';
    import AvatarHandler from './AvatarHandler.svelte';
    import EditAccount from './EditAccount.svelte';
</script>

<section class="relative w-full h-full flex flex-col gap-5">
    <h2>Mon profil</h2>
    <AvatarHandler />
    <EditAccount />
    <h3>Avancé</h3>
    <div class="relative w-full flex justify-between items-center gap-[10px]">
        <label for="disconnect" class="text-neutral-500 text-sm">Me déconnecter sur cet appareil.</label>
        <Button.Danger size="medium" on:click={() => goto('/logout')}>Déconnexion</Button.Danger>
    </div>
    <DeleteAccount />
</section>
