<script lang="ts">
	import { onMount } from 'svelte';
	import type { ActionData, PageData } from './$types';
	import { goto } from '$app/navigation';
	import AlternativeLink from '$lib/auth/AlternativeLink.svelte';
	import Input from '$lib/auth/Input.svelte';
	import Submit from '$lib/auth/Submit.svelte';

	export let data: PageData;
	export let form: ActionData;

	onMount(() => {
		document.title = 'Connexion - Silicate';

		if (data.user) {
			const shouldRedirect = window.confirm(
				`Un compte utilisant l'email ${data.user.email} est déjà connecté. Souhaitez-vous utiliser ce compte ?`
			);

			if (shouldRedirect) {
				goto('/app');
			}
		}
	});

	if (form?.missing) {
		alert('Fill all the inputs.');
	}

	if (form?.incorrect) {
		alert('The password is incorrect.');
	}

	let email: string = form?.email ?? '';
	let password: string = '';
</script>

<form method="POST" class="relative mb-5 flex w-[70%] flex-col overflow-x-hidden gap-10 px-[2px]">
	<div>
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
	</div>
	<Submit label="Connexion" />
</form>
<AlternativeLink text="T'as pas encore de compte ?" href="/auth/register" label="Crées-en un" />
