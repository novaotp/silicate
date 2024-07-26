<script lang="ts">
    import AvatarHandler from './AvatarHandler.svelte';
    import EditAccount from './EditAccount.svelte';

    let showSaveChanges = false;
</script>

<div class="relative w-full {showSaveChanges ? "h-[calc(100%-120px)]" : "h-full"} overflow-auto flex flex-col justify-start items-start gap-5 px-5 pt-[60px] md:pt-0 md:pb-5">
    <h2 class="dark:text-neutral-50">Mon profil</h2>
    <AvatarHandler />
    <EditAccount bind:showSaveChanges />
</div>
