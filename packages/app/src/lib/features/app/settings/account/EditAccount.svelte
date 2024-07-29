<script lang="ts">
    import { getContext } from 'svelte';
    import { fly } from 'svelte/transition';
	import { getPreference } from '$utils/capacitor-preferences';
    import { addToast } from '$stores/toast';
	import { updateAccount } from './requests';
	import { Button, Input, Label, TextArea } from '$ui/forms';
    import PasswordChanger from './PasswordChanger.svelte';
    import type { Writable } from 'svelte/store';
	import type { User } from '$common/models/user';
	import type { ApiResponse } from '$common/types/api-response';

    export let showSaveChanges: boolean;

    const user = getContext<Writable<User>>('user');
    let replicaUser = { ...$user };

    $: showSaveChanges =
        $user.firstName !== replicaUser.firstName ||
        $user.lastName !== replicaUser.lastName ||
        $user.email !== replicaUser.email ||
        $user.bio !== replicaUser.bio;

    const editAccount = async () => {
        const token = await getPreference<{ jwt: string, expires: string }>('token', { parse: true });

        // Nothing has changed
        if (!showSaveChanges) return;

        let response: ApiResponse;
        try {
            response = await updateAccount(token.jwt, {
                firstName: replicaUser.firstName,
                lastName: replicaUser.lastName,
                email: replicaUser.email,
                bio: replicaUser.bio
            });
        } catch (error) {
            console.error(error);
			return addToast({ type: "error", message: "Une erreur est survenue." });
        }

        if (!response.success) {
            return addToast({ type: 'error', message: response.message });
        }

        addToast({ type: 'success', message: response.message });
        $user = { ...$user, ...replicaUser };
    };
</script>

<form on:submit|preventDefault={editAccount} class="relative w-full flex flex-col gap-5 px-[2px]">
    <div class="relative w-full flex flex-col gap-5 md:flex-row">
        <div class="relative w-full flex flex-col gap-[10px]">
            <Label for="firstName">Prénom</Label>
            <Input
                name="firstName"
                value={replicaUser.firstName}
                on:input={(event) => (replicaUser.firstName = event.currentTarget.value)}
                class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm"
            />
        </div>
        <div class="relative w-full flex flex-col gap-[10px]">
            <Label for="lastName">Nom</Label>
            <Input
                name="lastName"
                value={replicaUser.lastName}
                on:input={(event) => (replicaUser.lastName = event.currentTarget.value)}
                class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm"
            />
        </div>
    </div>
    <div class="relative w-full flex flex-col gap-5 md:flex-row">
        <div class="relative w-full flex flex-col gap-[10px]">
            <Label for="email">Email</Label>
            <Input
                name="email"
                value={replicaUser.email}
                on:input={(event) => (replicaUser.email = event.currentTarget.value)}
                class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm"
            />
        </div>
        <PasswordChanger />
    </div>
    <div class="relative w-full flex flex-col gap-[10px]">
        <Label for="bio">Biographie</Label>
        <TextArea
            name="bio"
            value={replicaUser.bio}
            on:input={(event) => (replicaUser.bio = event.currentTarget.value)}
            class="relative w-full bg-neutral-100 dark:text-neutral-50 dark:bg-neutral-800 rounded-lg p-5 h-[150px] text-sm resize-none"
        ></TextArea>
    </div>
    {#if showSaveChanges}
        <div class="fixed bottom-5 left-5 px-5 py-[10px] w-[calc(100%-40px)] bg-white dark:bg-neutral-900 rounded-lg gap-[10px] flex justify-center items-center" transition:fly={{ y: 50 }}>
            <Button.Normal variant="secondary" class="flex-grow" on:click={() => (replicaUser = { ...$user })}>
                Annuler
            </Button.Normal>
            <Button.Normal type="submit" class="flex-grow">Enregistrer</Button.Normal>
        </div>
    {/if}
</form>
