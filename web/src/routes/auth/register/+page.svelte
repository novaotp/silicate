<script lang="ts">
    import type { ActionData } from './$types';
	import AlternativeLink from '$lib/auth/AlternativeLink.svelte';
	import Input from '$lib/auth/Input.svelte';
	import Switcher from '$lib/auth/Switcher.svelte';
	
	export let form: ActionData;

	let firstName: string = form?.firstName ?? "";
	let lastName: string = form?.lastName ?? "";
	let email: string = form?.email ?? "";
	let password: string = '';
	let confirmPassword: string = '';
</script>

<svelte:head>
	<title>Inscription - Silicate</title>
</svelte:head>

<form method="POST" class="relative mb-5 flex w-[70%] flex-col overflow-x-hidden">
	<Switcher>
		<svelte:fragment slot="names">
			<Input
				label="Prénom"
				placeholder="Entre ton prénom ici..."
				type="text"
				name="firstName"
				bind:value={firstName}
			/>
			<Input
				label="Nom de famille"
				placeholder="Entre ton nom de famille ici..."
				type="text"
				name="lastName"
				bind:value={lastName}
			/>
		</svelte:fragment>
		<svelte:fragment slot="credentials">
			<Input
				label="Email"
				placeholder="Entre ton email ici..."
				type="email"
				name="email"
				bind:value={email}
			/>
			<Input
				label="Mot de passe"
				placeholder="Entre ton mot de passe ici..."
				type="password"
				name="password"
				bind:value={password}
			/>
			<Input
				label="Confirmer le mot de passe"
				placeholder="Entre ton mot de passe ici..."
				type="password"
				name="confirmPassword"
				bind:value={confirmPassword}
			/>
		</svelte:fragment>
	</Switcher>
</form>
<AlternativeLink text="T'as déjà un compte ?" href="/auth/login" label="Connecte-toi" />
