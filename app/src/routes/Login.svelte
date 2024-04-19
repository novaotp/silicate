<script lang="ts">
    import { AlternativeLink, Input, Submit } from '$lib/features/auth/components';
    import { addToast } from '$lib/stores/toast';
    import { env } from '$/lib/utils/env';
    import type { LoginResponse } from '$libs/types/AuthResponse';
    import AuthLayout from '$/layouts/AuthLayout.svelte';
    import Cookies from 'js-cookie';
    import { push } from 'svelte-spa-router';
    import { onMount } from 'svelte';
    import type { ApiResponse } from '$libs/types/ApiResponse';

    let email: string = '';
    let password: string = '';

    onMount(async () => {
        if (!Cookies.get("id")) {
            return;
        }
        
        const response = await fetch(`${env.VITE_API_URL}/auth/validate`, {
			method: "POST",
			body: JSON.stringify({
                jwt: Cookies.get("id")
            }),
			headers: {
				"content-type": "application/json"
			}
		});
		const { success }: ApiResponse = await response.json();

		if (!success) {
			Cookies.remove("id");
			return;
		}

        push("/app");
    })

    async function login(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
        event.preventDefault();

        if (!email || !password) {
            password = '';
            addToast({ type: 'error', message: 'Remplissez tous les champs.' });
            return;
        }

        try {
            const response = await fetch(`${env.VITE_API_URL}/auth/login`, {
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

            Cookies.set('id', result.jwt, { expires: new Date(result.expires) });
        } catch (err) {
            console.error(`Something went wrong whilst login a user : ${(err as Error).message}`);
            password = '';
            addToast({ type: 'error', message: 'Une erreur est survenue.' });
            return;
        }

        addToast({ type: 'success', message: 'Logged in successfully.' });
        push('/app');
    }
</script>

<svelte:head>
    <title>Connexion - {env.VITE_APP_NAME}</title>
    <meta
        name="description"
        content="Reprends exactement là où tu en étais.
        Visualise tes progrès, tes notes et accédez à tes outils favoris.
        Connecte-toi dès maintenant !"
    />
</svelte:head>

<AuthLayout>
    <form class="relative mb-5 flex w-[70%] max-w-[500px] flex-col justify-center items-center overflow-x-hidden gap-10 px-[2px]" on:submit={login}>
        <div class="flex flex-col gap-5">
            <Input label="Email" placeholder="Entre ton email ici..." type="email" name="email" bind:value={email} />
            <Input label="Mot de passe" placeholder="Entre ton mot de passe ici..." type="password" name="password" bind:value={password} />
        </div>
        <Submit label="Connexion" />
    </form>
    <AlternativeLink text="T'as pas encore de compte ?" href="/#/auth/register" label="Crées-en un" />
</AuthLayout>
