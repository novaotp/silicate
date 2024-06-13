<script lang="ts">
    import type { ActionData, SubmitFunction } from './$types';
    import AlternativeLink from '$lib/components/auth/AlternativeLink.svelte';
    import Input from '$lib/components/auth/Input.svelte';
    import Submit from '$lib/components/auth/Submit.svelte';
    import { addToast } from '$lib/stores/toast';
    import { applyAction, enhance } from '$app/forms';
    import { PUBLIC_APP_NAME } from '$env/static/public';
    import { goto } from '$app/navigation';

    export let form: ActionData;

    let email: string = form?.email ?? '';
    let password: string = '';

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

<form
    method="POST"
    class="relative mb-5 flex w-[70%] max-w-[500px] flex-col justify-center items-center overflow-x-hidden gap-10 px-[2px]"
    use:enhance={loginEnhance}
>
    <div class="flex flex-col gap-5">
        <Input label="Email" placeholder="Entre ton email ici..." type="email" name="email" bind:value={email} />
        <Input label="Mot de passe" placeholder="Entre ton mot de passe ici..." type="password" name="password" bind:value={password} />
    </div>
    <Submit label="Connexion" />
</form>
<AlternativeLink text="T'as pas encore de compte ?" href="/auth/register" label="Crées-en un" />
