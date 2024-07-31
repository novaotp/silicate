<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { Preferences } from '@capacitor/preferences';
	import { addToast } from '$stores/toast';
	import { PUBLIC_APP_NAME } from '$env/static/public';
	import { Button } from '$ui/forms/button';
	import { Input, Label } from '$ui/forms';
	import { login, type LoginResponse } from '$features/auth/login';
	import AlternativeLink from '$features/auth/common/AlternativeLink.svelte';

	let email: string = '';
	let password: string = '';

	$: errorMessage = $page.url.searchParams.get('message');

	const onFormSubmit = async (): Promise<void> => {
		if (!email || !password) {
			password = '';
			return addToast({ type: 'error', message: 'Complétez tous les champs.' });
		}

		let response: LoginResponse;
		try {
			response = await login(email, password);
		} catch (error) {
			// Something went wrong...
			password = '';
			console.error(`Something went wrong whilst login a user : ${(error as Error).message}`);
			return addToast({ type: 'error', message: 'Une erreur est survenue.' });
		}

		// Invalid credentials
		if (!response.success) {
			password = '';
			return addToast({ type: 'error', message: 'Données erronées.' });
		}

		addToast({ type: 'success', message: 'Connexion réussie.' });
		return goto('/');
	};
</script>

<svelte:head>
	<title>Connexion - {PUBLIC_APP_NAME}</title>
	<meta
		name="description"
		content="Reprends exactement là où tu en étais.
        Visualise tes progrès, tes notes et accédez à tes outils favoris.
        Connecte-toi dès maintenant !"
	/>
</svelte:head>

{#if errorMessage}
	<div
		role="banner"
		class="relative rounded-lg mb-5 w-full max-w-[500px] bg-accent-danger-500 text-neutral-50 justify-center items-center px-5 py-2"
	>
		{errorMessage}
	</div>
{/if}

<form
	on:submit|preventDefault={onFormSubmit}
	class="relative mb-5 flex w-full max-w-[500px] flex-col justify-center items-center overflow-x-hidden gap-10"
>
	<div class="relative w-full flex flex-col gap-5 px-0.5">
		<div class="flex flex-col gap-[10px]">
			<Label for="email">Email</Label>
			<Input
				placeholder="Entre ton email ici..."
				type="email"
				name="email"
				bind:value={email}
				autocomplete="off"
				required={true}
			/>
		</div>
		<div class="flex flex-col gap-[10px]">
			<Label for="email">Mot de passe</Label>
			<Input
				placeholder="Entre ton mot de passe ici..."
				type="password"
				name="password"
				bind:value={password}
				autocomplete="off"
				required={true}
			/>
		</div>
	</div>
	<Button.Normal type="submit">Connexion</Button.Normal>
</form>
<AlternativeLink text="T'as pas encore de compte ?" href="/register" label="Crées-en un" />
