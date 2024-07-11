<script lang="ts">
    import type { ActionData, SubmitFunction } from './$types';
    import AlternativeLink from '$lib/components/auth/AlternativeLink.svelte';
    import { addToast } from '$lib/stores/toast';
    import { applyAction, enhance } from '$app/forms';
    import { PUBLIC_APP_NAME } from '$env/static/public';
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    import { Button, Input, Label } from '$lib/ui';

    export let form: ActionData;

    let email: string = form?.email ?? '';
    let password: string = '';

    $: errorMessage = $page.url.searchParams.get("message");

    const loginEnhance: SubmitFunction = () => {
        return async ({ result }) => {
            await applyAction(result);
            if (result.type === "failure") {
                addToast({ type: 'error', message: result.data!.message });
                password = '';
            } else if (result.type === "redirect") {
                addToast({ type: 'success', message: "Connexion réussie." });
                goto(result.location);
            }
        };
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

{#if errorMessage}
    <div role="banner" class="relative rounded-lg mb-5 w-full max-w-[500px] bg-accent-danger-500 text-neutral-50 justify-center items-center px-5 py-2">
        {errorMessage}
    </div>
{/if}
<form
    method="POST"
    class="relative mb-5 flex w-full max-w-[500px] flex-col justify-center items-center overflow-x-hidden gap-10"
    use:enhance={loginEnhance}
>
    <div class="relative w-full flex flex-col gap-5 px-0.5">
        <div class="flex flex-col gap-[10px]">
            <Label for="email">Email</Label>
            <Input placeholder="Entre ton email ici..." type="email" name="email" bind:value={email} autocomplete="off" required={true} />
        </div>
        <div class="flex flex-col gap-[10px]">
            <Label for="email">Mot de passe</Label>
            <Input placeholder="Entre ton mot de passe ici..." type="password" name="password" bind:value={password} autocomplete="off" required={true} />
        </div>
    </div>
    <Button.Normal type="submit">Connexion</Button.Normal>
</form>
<AlternativeLink text="T'as pas encore de compte ?" href="/register" label="Crées-en un" />
