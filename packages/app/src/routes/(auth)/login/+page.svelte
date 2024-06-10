<script lang="ts">
    import { AlternativeLink, Input, Submit } from '$components/auth/components';
    import { addToast } from '$lib/stores/toast';
    import type { LoginResponse } from '$shared/types/AuthResponse';
    import { onMount } from 'svelte';
    import type { ApiResponse } from '$shared/types/ApiResponse';
    import { PUBLIC_API_URL, PUBLIC_APP_NAME } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { kv } from '$lib/utils/kv';

    let email: string = 'test@silicate.com';
    let password: string = 'silicate';

    onMount(async () => {
        const userId = await kv.get("userId");
        if (!userId) {
            return;
        }
        
        const response = await fetch(`${PUBLIC_API_URL}/api/v1/auth/validate`, {
			method: "POST",
			body: JSON.stringify({
                jwt: userId
            }),
			headers: {
				"content-type": "application/json"
			}
		});
		const { success }: ApiResponse = await response.json();

		if (!success) {
			await kv.delete("userId");
			return;
		}

        goto("/app");
    })

    async function login(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
        event.preventDefault();

        if (!email || !password) {
            password = '';
            addToast({ type: 'error', message: 'Remplissez tous les champs.' });
            return;
        }

        try {
            const response = await fetch(`${PUBLIC_API_URL}/api/v1/auth/login`, {
                method: 'POST',
                body: JSON.stringify({
                    email,
                    password
                }),
                headers: {
                    'accept': 'application/json',
                    'content-type': 'application/json'
                }
            });
            const result: LoginResponse = await response.json();

            if (!result.success) {
                password = '';
                addToast({ type: 'error', message: 'Données erronées.' });
                return;
            }

            await kv.set('id', result.jwt);
            await kv.save();

            addToast({ type: 'success', message: 'Logged in successfully.' });
            goto('/app');
        } catch (err) {
            console.error(`Something went wrong whilst login a user : ${(err as Error).message}`);
            password = '';
            addToast({ type: 'error', message: 'Une erreur est survenue.' });
            return;
        }
    }
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

<form class="relative mb-5 flex w-[70%] max-w-[500px] flex-col justify-center items-center overflow-x-hidden gap-10 px-[2px]" on:submit={login}>
    <div class="flex flex-col gap-5">
        <Input label="Email" placeholder="Entre ton email ici..." type="email" name="email" bind:value={email} />
        <Input label="Mot de passe" placeholder="Entre ton mot de passe ici..." type="password" name="password" bind:value={password} />
    </div>
    <Submit label="Connexion" />
</form>
<AlternativeLink text="T'as pas encore de compte ?" href="/#/auth/register" label="Crées-en un" />
