<script lang="ts">
	import { goto } from '$app/navigation';
	import IconHeartBroken from '@tabler/icons-svelte/icons/heart-broken';
	import { getPreference } from '$utils/capacitor-preferences';
	import { addToast } from '$stores/toast';
	import { deleteAccount } from '../account/requests';
	import { Button, Label } from '$ui/forms';
	import { Overlay } from '$ui/layout';
	import { Confirm } from '$ui/modals';
	import type { ApiResponse } from '$common/types/api-response';

	let showDeleteAccount = false;

	const destroyAccount = async () => {
		const token = await getPreference<{ jwt: string; expires: string }>('token', { parse: true });

		let response: ApiResponse;
		try {
			response = await deleteAccount(token.jwt);
		} catch (error) {
			console.error(error);
			return addToast({ type: 'error', message: 'Une erreur est survenue.' });
		}

		if (!response.success) {
			return addToast({ type: 'error', message: response.message });
		}

		addToast({ type: 'success', message: 'Compte supprimé avec succès.' });
		goto('/logout');
	};
</script>

<div class="relative w-full flex justify-between items-center gap-[10px]">
	<Label for="destroy">Supprimer mon compte.</Label>
	<Button.Danger on:click={() => (showDeleteAccount = true)}>Supprimer</Button.Danger>
</div>

{#if showDeleteAccount}
	<Overlay on:click={() => (showDeleteAccount = false)} class="flex justify-center items-center">
		<Confirm.Root
			class="relative w-full sm:max-w-[480px] flex flex-col gap-5 justify-center items-center"
		>
			<Confirm.Title>
				<IconHeartBroken class="size-10 dark:text-neutral-50" />
				<span class="text-xl font-semibold text-center dark:text-neutral-50">
                    Supprimer mon compte
                </span>
			</Confirm.Title>
			<Confirm.Description>
				Je comprends que cette action est irréversible et que je ne pourrais pas revenir sur ma
				décision.
			</Confirm.Description>
			<Confirm.Actions>
				<Confirm.No>
					<Button.Danger
						on:click={() => (showDeleteAccount = false)}
						variant="secondary"
						class="w-full h-full"
					>
						Annuler
					</Button.Danger>
				</Confirm.No>
				<Confirm.Yes>
					<Button.Danger on:click={destroyAccount} class="w-full h-full">
						Supprimer mon compte
					</Button.Danger>
				</Confirm.Yes>
			</Confirm.Actions>
		</Confirm.Root>
	</Overlay>
{/if}
