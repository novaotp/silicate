<script lang="ts">
    import { enhance } from '$app/forms';
    import { addToast } from '$lib/stores/toast';
    import { Button, FullScreen, Card, Label, Input } from '$lib/ui';
    import type { SubmitFunction } from '../../../../routes/app/settings/$types';
    import IconLock from "@tabler/icons-svelte/IconLock.svelte";

    let showPasswordChanger: boolean = false;

    const editPasswordEnhance: SubmitFunction = () => {
        return ({ result }) => {
            if (result.type === 'failure') {
                return addToast({ type: 'error', message: result.data!.message });
            } else if (result.type === 'success') {
                addToast({ type: 'success', message: result.data!.message });
                showPasswordChanger = false;
            }
        };
    };
</script>

<div class="relative w-full flex flex-col gap-[10px]">
    <Label for="password">Mot de passe</Label>
    <Button.Normal class="h-full rounded-lg" on:click={() => (showPasswordChanger = true)}>
        Modifier mon mot de passe
    </Button.Normal>
    {#if showPasswordChanger}
        <FullScreen.Backdrop on:click={() => (showPasswordChanger = false)} class="flex justify-center items-center">
            <Card class="relative w-full mx-5 sm:max-w-[480px] flex flex-col gap-5 justify-center items-center p-10">
                <h2 class="flex items-center gap-5">
                    <IconLock class="size-10 dark:text-neutral-50" />
                    <span class="text-xl font-semibold text-center dark:text-neutral-50">Modifier mon mot de passe.</span>
                </h2>
                <p class="text-center dark:text-neutral-50">Entre ton mot de passe actuel et le nouveau.</p>
                <form method="post" action="?/editPassword" class="relative w-full flex flex-col gap-5" use:enhance={editPasswordEnhance}>
                    <div class="relative w-full flex flex-col gap-[10px]">
                        <Label for="oldPassword">Mot de passe actuel</Label>
                        <Input
                            name="oldPassword"
                            type="password"
                            class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm"
                            placeholder="Mon mot de passe actuel..."
                        />
                    </div>
                    <div class="relative w-full flex flex-col gap-[10px]">
                        <Label for="newPassword">Nouveau mot de passe</Label>
                        <Input
                            name="newPassword"
                            type="password"
                            class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm"
                            placeholder="Mon nouveau de passe actuel..."
                        />
                    </div>
                    <div class="relative w-full flex flex-col gap-[10px]">
                        <Label for="confirmNewPassword">Confirmer le nouveau mot de passe</Label>
                        <Input
                            name="confirmNewPassword"
                            type="password"
                            class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm"
                            placeholder="Je confirme mon nouveau de passe actuel..."
                        />
                    </div>
                    <div class="relative w-full flex justify-end items-center gap-5">
                        <Button.Normal variant="secondary" class="rounded-lg">Annuler</Button.Normal>
                        <Button.Normal type="submit" class="rounded-lg">Confirmer</Button.Normal>
                    </div>
                </form>
            </Card>
        </FullScreen.Backdrop>
    {/if}
</div>
