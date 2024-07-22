<script lang="ts">
    import { enhance } from '$app/forms';
    import { addToast } from '$lib/stores/toast';
    import { Button, FullScreen, Card, Label, Input, Confirm } from '$lib/ui';
    import type { SubmitFunction } from '../../../../routes/app/settings/$types';
    import IconLock from '@tabler/icons-svelte/icons/lock';

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
    <Button.Normal class="h-full rounded-lg" on:click={() => (showPasswordChanger = true)}>Modifier mon mot de passe</Button.Normal>
    {#if showPasswordChanger}
        <FullScreen.Backdrop on:click={() => (showPasswordChanger = false)} class="flex justify-center items-center">
            <Confirm.Root class="relative w-full flex flex-col gap-5 justify-center items-center p-6">
                <Confirm.Title>
                    <IconLock class="size-10 dark:text-neutral-50" />
                    <span class="text-xl font-semibold text-center dark:text-neutral-50">Modifier mon mot de passe.</span>
                </Confirm.Title>
                <Confirm.Description>Entre ton mot de passe actuel et le nouveau.</Confirm.Description>
                <Confirm.Actions>
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
                            <Button.Normal variant="secondary" class="rounded-lg" on:click={() => (showPasswordChanger = false)}>
                                Annuler
                            </Button.Normal>
                            <Button.Normal type="submit" class="rounded-lg">Confirmer</Button.Normal>
                        </div>
                    </form>
                </Confirm.Actions>
            </Confirm.Root>
        </FullScreen.Backdrop>
    {/if}
</div>
