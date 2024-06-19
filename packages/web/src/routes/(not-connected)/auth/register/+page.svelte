<script lang="ts">
    import type { ActionData, SubmitFunction } from './$types';
    import AlternativeLink from '$lib/components/auth/AlternativeLink.svelte';
    import Input from '$lib/components/auth/Input.svelte';
    import Switcher from '$lib/components/auth/Switcher.svelte';
    import Submit from '$lib/components/auth/Submit.svelte';
    import { PUBLIC_APP_NAME } from '$env/static/public';
    import { applyAction, enhance } from '$app/forms';
    import { addToast } from '$lib/stores/toast';
    import { goto } from '$app/navigation';

    export let form: ActionData;

    let firstName: string = form?.firstName ?? '';
    let lastName: string = form?.lastName ?? '';
    let email: string = form?.email ?? '';
    let password: string = '';
    let confirmPassword: string = '';

    const registerEnhance: SubmitFunction = () => {
        return async ({ result }) => {
            await applyAction(result);
            if (result.type === "failure") {
                addToast({ type: 'error', message: result.data!.message });
                password = '';
                confirmPassword = '';
            } else if (result.type === "redirect") {
                goto(result.location);
            }
        };
    }
</script>

<svelte:head>
    <title>Inscription - {PUBLIC_APP_NAME}</title>
    <meta
        name="description"
        content="Prends le contrôle de ton organisation, débloque ton plein potentiel et fonce vers la réussite ! 
        Inscris-toi et découvre un monde de possibilités !"
    />
</svelte:head>

<form method="POST" class="relative mb-5 flex w-full flex-col overflow-x-hidden xl:hidden" use:enhance={registerEnhance}>
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
<form method="POST" class="relative mb-5 w-[70%] flex-col justify-center items-center overflow-x-hidden hidden xl:flex" use:enhance={registerEnhance}>
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
<AlternativeLink text="T'as déjà un compte ?" href="/auth/login" label="Connecte-toi" />
