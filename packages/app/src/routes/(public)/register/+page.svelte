<script lang="ts">
    import { goto } from '$app/navigation';
    import { PUBLIC_APP_NAME } from '$env/static/public';
    import { addToast } from '$stores/toast';
	import { Button } from '$ui/button';
    import { Input, Label } from '$ui/forms';
    import { AlternativeLink, Switcher } from '$features/auth/common';
	import { register, type RegisterResponse } from '$features/auth/register';

    let firstName: string = '';
    let lastName: string = '';
    let email: string = '';
    let password: string = '';
    let confirmPassword: string = '';

    const resetPasswords = () => {
        password = "";
        confirmPassword = "";
    }

    const onFormSubmit = async (): Promise<void> => {
		if (!firstName || !lastName || !email || !password || !confirmPassword) {
			resetPasswords();
			return addToast({ type: 'error', message: "Complétez tous les champs." });
		}

        if (password !== confirmPassword) {
            resetPasswords();
			return addToast({ type: 'error', message: "Les mots de passe ne correspondent pas." });
		}

		let response: RegisterResponse;
		try {
			response = await register(firstName, lastName, email, password);
		} catch (error) {
			// Something went wrong...
			resetPasswords();
            console.error(`Something went wrong whilst registering a new user : ${(error as Error).message}`)
			return addToast({ type: 'error', message: 'Une erreur est survenue.' });
		}

		// Something went wrong server-side...
        // Look into server's logs
		if (!response.success) {
			resetPasswords();
			return addToast({ type: 'error', message: "Compte créé avec succès." });
		}

		addToast({ type: 'success', message: 'Connexion réussie.' });
		return goto('/login');
	};
</script>

<svelte:head>
    <title>Inscription - {PUBLIC_APP_NAME}</title>
    <meta
        name="description"
        content="Prends le contrôle de ton organisation, débloque ton plein potentiel et fonce vers la réussite ! 
        Inscris-toi et découvre un monde de possibilités !"
    />
</svelte:head>

<form on:submit|preventDefault={onFormSubmit} class="relative mb-5 flex w-full flex-col overflow-x-hidden xl:hidden">
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

<form on:submit={onFormSubmit} class="relative mb-5 w-[70%] flex-col justify-center items-center gap-5 px-0.5 overflow-x-hidden hidden xl:flex">
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
