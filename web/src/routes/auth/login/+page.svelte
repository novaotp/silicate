<script lang="ts">
    import type { ActionData } from './$types';
    import AlternativeLink from '$lib/components/auth/AlternativeLink.svelte';
    import Input from '$lib/components/auth/Input.svelte';
    import Submit from '$lib/components/auth/Submit.svelte';
    import { addToast } from '$lib/stores/toast';
    import { applyAction, enhance } from '$app/forms';
    import { page } from '$app/stores';

    export let form: ActionData;

    let message: string | null = null;

    let email: string = form?.email ?? '';
    let password: string = '';
</script>

<svelte:head>
    <title>Connexion - Silicate</title>
</svelte:head>

<form
    method="POST"
    class="relative mb-5 flex w-[70%] max-w-[500px] flex-col justify-center items-center overflow-x-hidden gap-10 px-[2px]"
    use:enhance={() => {
        return async ({ result, update }) => {
            await applyAction(result);
            await update();
            if (result.type === "failure" && $page.form && $page.form.message) {
                addToast({ type: 'error', message: $page.form.message });
            }
            password = '';
        };
    }}
>
    <div class="flex flex-col gap-5">
        <Input label="Email" placeholder="Entre ton email ici..." type="email" name="email" bind:value={email} />
        <Input label="Mot de passe" placeholder="Entre ton mot de passe ici..." type="password" name="password" bind:value={password} />
    </div>
    <Submit label="Connexion" />
</form>
<AlternativeLink text="T'as pas encore de compte ?" href="/auth/register" label="Crées-en un" />
