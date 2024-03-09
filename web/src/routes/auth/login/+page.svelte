<script lang="ts">
    import { onMount } from 'svelte';
    import type { ActionData } from './$types';
    import AlternativeLink from '$lib/auth/AlternativeLink.svelte';
    import Input from '$lib/auth/Input.svelte';
    import Submit from '$lib/auth/Submit.svelte';
	import { addToast } from '../../../stores/toast';

    export let form: ActionData;

    onMount(async () => {
        if (form?.missing) {
            addToast({ type: 'error', message: 'Fill all the inputs.' });
        }

        if (form?.incorrect) {
            addToast({ type: 'error', message: 'The password is incorrect.' });
        }
    });

    let email: string = form?.email ?? '';
    let password: string = '';
</script>

<svelte:head>
    <title>Connexion - Silicate</title>
</svelte:head>

<form
    method="POST"
    class="relative mb-5 flex w-[70%] flex-col overflow-x-hidden gap-10 px-[2px]"
>
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
<AlternativeLink
    text="T'as pas encore de compte ?"
    href="/auth/register"
    label="Crées-en un"
/>
