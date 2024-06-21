<script lang="ts">
    import { enhance } from '$app/forms';
    import { addToast } from '$lib/stores/toast';
    import { Button, FullScreen, Card } from '$lib/ui';
    import type { SubmitFunction } from '../../../../routes/app/settings/$types';

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
    <label for="password" class="text-neutral-500 text-sm">Mot de passe</label>
    <Button.Normal class="h-full" on:click={() => (showPasswordChanger = true)}>Modifier mon mot de passe</Button.Normal>
    {#if showPasswordChanger}
        <FullScreen.Backdrop on:click={() => (showPasswordChanger = false)} class="flex justify-center items-center">
            <Card class="relative w-[480px] flex flex-col gap-5 justify-center items-center p-10">
                <h2 class="text-xl font-semibold">Modifier mon mot de passe.</h2>
                <p class="text-center">Entre ton mot de passe actuel et le nouveau.</p>
                <form method="post" action="?/editPassword" class="relative w-full flex flex-col gap-5" use:enhance={editPasswordEnhance}>
                    <div class="relative w-full flex flex-col gap-[10px]">
                        <label for="oldPassword" class="text-neutral-950 text-sm">Mot de passe actuel</label>
                        <input
                            name="oldPassword"
                            type="password"
                            class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm"
                            placeholder="Mon mot de passe actuel..."
                        />
                    </div>
                    <div class="relative w-full flex flex-col gap-[10px]">
                        <label for="newPassword" class="text-neutral-950 text-sm">Nouveau mot de passe</label>
                        <input
                            name="newPassword"
                            type="password"
                            class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm"
                            placeholder="Mon nouveau de passe actuel..."
                        />
                    </div>
                    <div class="relative w-full flex flex-col gap-[10px]">
                        <label for="confirmNewPassword" class="text-neutral-950 text-sm">Confirmer le nouveau mot de passe</label>
                        <input
                            name="confirmNewPassword"
                            type="password"
                            class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm"
                            placeholder="Je confirme mon nouveau de passe actuel..."
                        />
                    </div>
                    <div class="relative w-full flex justify-end items-center gap-5">
                        <Button.Normal variant="secondary">Annuler</Button.Normal>
                        <Button.Normal>Confirmer</Button.Normal>
                    </div>
                </form>
            </Card>
        </FullScreen.Backdrop>
    {/if}
</div>
