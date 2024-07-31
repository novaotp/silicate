<script lang="ts">
	import { addToast } from '$stores/toast';
	import IconLock from '@tabler/icons-svelte/icons/lock';
	import { getJWTFromCookies } from '$utils/jwt';
	import { Button, Input, Label } from '$ui/forms';
	import { Overlay } from '$ui/layout';
	import { Confirm } from '$ui/modals';
	import { updatePassword } from './requests';
	import type { EventHandler } from 'svelte/elements';
	import type { ApiResponse } from '$common/types/api-response';

	let showPasswordChanger: boolean = false;

	const editPassword: EventHandler<SubmitEvent, HTMLFormElement> = async (event) => {
		const token = getJWTFromCookies();
        const formData = new FormData(event.currentTarget);

        const oldPassword = formData.get('oldPassword')?.toString();
        const newPassword = formData.get('newPassword')?.toString();
        const confirmNewPassword = formData.get('confirmNewPassword')?.toString();

        if (!oldPassword || !newPassword || !confirmNewPassword) {
            return addToast({ type: 'error', message: 'Tous les champs doivent être remplis...' });
        }

		if (newPassword !== confirmNewPassword) {
			return addToast({ type: 'error', message: "Les nouveaux de mots de passe ne correspondent pas." });
		}

		let response: ApiResponse;
		try {
			response = await updatePassword(token!, oldPassword, newPassword);
		} catch (error) {
			console.error(error);
			return addToast({ type: 'error', message: 'Une erreur est survenue.' });
		}

		if (!response.success) {
			return addToast({ type: 'error', message: response.message });
		}

		addToast({ type: 'success', message: response.message });
		showPasswordChanger = false;
	};
</script>

<div class="relative w-full flex flex-col gap-[10px]">
	<Label for="password">Mot de passe</Label>
	<Button.Normal class="h-full rounded-lg" on:click={() => (showPasswordChanger = true)}>
		Modifier mon mot de passe
	</Button.Normal>
</div>

{#if showPasswordChanger}
	<Overlay z={2} on:click={() => (showPasswordChanger = false)} class="flex justify-center items-center">
        <Confirm.Root class="fixed w-full flex flex-col gap-5 justify-center items-center p-6">
            <Confirm.Title>
                <IconLock class="size-10 dark:text-neutral-50" />
                <span class="text-xl font-semibold text-center dark:text-neutral-50">
                    Modifier mon mot de passe.
                </span>
            </Confirm.Title>
            <Confirm.Description>Entre ton mot de passe actuel et le nouveau.</Confirm.Description>
            <Confirm.Actions>
                <form
                    on:submit|preventDefault={editPassword}
                    class="relative w-full flex flex-col gap-5"
                >
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
                        <Button.Normal
                            variant="secondary"
                            class="rounded-lg"
                            on:click={() => (showPasswordChanger = false)}
                        >
                            Annuler
                        </Button.Normal>
                        <Button.Normal type="submit" class="rounded-lg">Confirmer</Button.Normal>
                    </div>
                </form>
            </Confirm.Actions>
        </Confirm.Root>
    </Overlay>
{/if}
