<script lang="ts">
    import AuthLayout from '../layouts/AuthLayout.svelte';
    import { AlternativeLink, Input, Submit, Switcher } from '$lib/features/auth/components';
    import { env } from '../utils/env';
    import { addToast } from '$lib/stores/toast';
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import { push } from 'svelte-spa-router';

    let firstName: string = '';
    let lastName: string = '';
    let email: string = '';
    let password: string = '';
    let confirmPassword: string = '';

    function resetPasswords() {
        password = '';
        confirmPassword = '';
    }

    async function register(event: SubmitEvent & { currentTarget: EventTarget & HTMLFormElement }) {
        event.preventDefault();

        if (!firstName || !lastName || !email || !password || !confirmPassword) {
            resetPasswords();
            addToast({ type: 'error', message: 'Veuillez entrer tous les champs.' });
            return;
        }

        if (password !== confirmPassword) {
            resetPasswords();
            addToast({ type: 'error', message: 'Les mots de passe de correspondent pas.' });
            return;
        }

        try {
            const response = await fetch(`${env.VITE_API_URL}/auth/register`, {
                method: 'POST',
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                }),
                headers: {
                    accept: 'application/json',
                    'content-type': 'application/json'
                }
            });
            const result: ApiResponse = await response.json();

            if (!result.success) {
                resetPasswords();
                addToast({ type: 'error', message: 'Une erreur est survenue.' });
                return;
            }
        } catch (err) {
            console.error(`Something went wrong whilst registering a new user : ${(err as Error).message}`);
            resetPasswords();
            addToast({ type: 'error', message: 'Une erreur est survenue.' });
            return;
        }

        addToast({ type: 'success', message: 'Compte créé avec succès.' });
        push("/#/auth/login");
    }
</script>

<svelte:head>
    <title>Inscription - {env.VITE_APP_NAME}</title>
    <meta
        name="description"
        content="Prends le contrôle de ton organisation, débloque ton plein potentiel et fonce vers la réussite ! 
            Inscris-toi et découvre un monde de possibilités !"
    />
</svelte:head>

<AuthLayout>
    <form class="relative mb-5 flex w-[70%] flex-col overflow-x-hidden xl:hidden" on:submit={register}>
        <Switcher>
            <svelte:fragment slot="names">
                <Input label="Prénom" placeholder="Entre ton prénom ici..." type="text" name="firstName" bind:value={firstName} />
                <Input label="Nom de famille" placeholder="Entre ton nom de famille ici..." type="text" name="lastName" bind:value={lastName} />
            </svelte:fragment>
            <svelte:fragment slot="credentials">
                <Input label="Email" placeholder="Entre ton email ici..." type="email" name="email" bind:value={email} />
                <Input label="Mot de passe" placeholder="Entre ton mot de passe ici..." type="password" name="password" bind:value={password} />
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
    <form method="POST" class="relative mb-5 w-[70%] flex-col justify-center items-center overflow-x-hidden hidden xl:flex">
        <div class="relative flex flex-col gap-5">
            <Input label="Prénom" placeholder="Entre ton prénom ici..." type="text" name="firstName" bind:value={firstName} />
            <Input label="Nom de famille" placeholder="Entre ton nom de famille ici..." type="text" name="lastName" bind:value={lastName} />
        </div>
        <Input label="Email" placeholder="Entre ton email ici..." type="email" name="email" bind:value={email} />
        <div class="flex gap-5">
            <Input label="Mot de passe" placeholder="Entre ton mot de passe ici..." type="password" name="password" bind:value={password} />
            <Input
                label="Confirmer le mot de passe"
                placeholder="Entre ton mot de passe ici..."
                type="password"
                name="confirmPassword"
                bind:value={confirmPassword}
            />
        </div>
        <div class="mt-5">
            <Submit label="Créer mon compte" />
        </div>
    </form>
    <AlternativeLink text="T'as déjà un compte ?" href="/#/auth/login" label="Connecte-toi" />
</AuthLayout>
