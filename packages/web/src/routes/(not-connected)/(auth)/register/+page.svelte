<script lang="ts">
    import type { ActionData, SubmitFunction } from './$types';
    import AlternativeLink from '$lib/components/auth/AlternativeLink.svelte';
    import Switcher from '$lib/components/auth/Switcher.svelte';
    import { PUBLIC_APP_NAME } from '$env/static/public';
    import { enhance } from '$app/forms';
    import { addToast } from '$lib/stores/toast';
    import { goto } from '$app/navigation';
    import { Button, Input, Label } from '$lib/ui';

    export let form: ActionData;

    let firstName: string = form?.firstName ?? '';
    let lastName: string = form?.lastName ?? '';
    let email: string = form?.email ?? '';
    let password: string = '';
    let confirmPassword: string = '';

    const registerEnhance: SubmitFunction = () => {
        return async ({ result }) => {
            if (result.type === "failure") {
                addToast({ type: 'error', message: result.data!.message });
                password = '';
                confirmPassword = '';
            } else if (result.type === "redirect") {
                addToast({ type: 'success', message: "Compte créé avec succès." });
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
        <div class="flex flex-col gap-[10px]">
            <Label for="firstName">Prénom</Label>
            <Input placeholder="Entre ton prénom ici..." type="text" name="firstName" bind:value={firstName} autocomplete="off" required={true} />
        </div>
            <div class="flex flex-col gap-[10px]">
                <Label for="lastName">Nom de famille</Label>
                <Input placeholder="Entre ton nom de famille ici..." type="text" name="lastName" bind:value={lastName} autocomplete="off" required={true} />
            </div>
        </svelte:fragment>
        <svelte:fragment slot="credentials">
        <div class="flex flex-col gap-[10px]">
            <Label for="email">Email</Label>
            <Input placeholder="Entre ton email ici..." type="email" name="email" bind:value={email} autocomplete="off" required={true} />
        </div>
            <div class="flex flex-col gap-[10px]">
                <Label for="password">Mot de passe</Label>
                <Input placeholder="Entre ton mot de passe ici..." type="password" name="password" bind:value={password} autocomplete="off" required={true} />
            </div>
            <div class="flex flex-col gap-[10px]">
                <Label for="confirmPassword">Confirmer le mot de passe</Label>
                <Input
                    placeholder="Entre ton mot de passe ici..."
                    type="password"
                    name="confirmPassword"
                    bind:value={confirmPassword}
                    autocomplete="off"
                    required={true}
                />
            </div>
        </svelte:fragment>
    </Switcher>
</form>
<form method="POST" class="relative mb-5 w-[70%] flex-col justify-center items-center gap-5 px-0.5 overflow-x-hidden hidden xl:flex" use:enhance={registerEnhance}>
    <div class="relative w-full flex gap-5">
        <div class="w-full flex flex-col gap-[10px]">
            <Label for="firstName">Prénom</Label>
            <Input placeholder="Entre ton prénom ici..." type="text" name="firstName" bind:value={firstName} autocomplete="off" required={true} />
        </div>
            <div class="w-full flex flex-col gap-[10px]">
                <Label for="lastName">Nom de famille</Label>
                <Input placeholder="Entre ton nom de famille ici..." type="text" name="lastName" bind:value={lastName} autocomplete="off" required={true} />
            </div>
    </div>
    <div class="relative w-full flex flex-col gap-[10px]">
        <Label for="email">Email</Label>
        <Input placeholder="Entre ton email ici..." type="email" name="email" bind:value={email} autocomplete="off" required={true} />
    </div>
    <div class="relative w-full flex gap-5">
        <div class="w-full flex flex-col gap-[10px]">
            <Label for="password">Mot de passe</Label>
            <Input placeholder="Entre ton mot de passe ici..." type="password" name="password" bind:value={password} autocomplete="off" required={true} />
        </div>
        <div class="w-full flex flex-col gap-[10px]">
            <Label for="confirmPassword">Confirmer le mot de passe</Label>
            <Input
                placeholder="Entre ton mot de passe ici..."
                type="password"
                name="confirmPassword"
                bind:value={confirmPassword}
                autocomplete="off"
                required={true}
            />
        </div>
    </div>
    <div class="mt-5">
        <Button.Normal type="submit">
            Créer mon compte
        </Button.Normal>
    </div>
</form>
<AlternativeLink text="T'as déjà un compte ?" href="/login" label="Connecte-toi" />
