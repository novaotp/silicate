<script lang="ts">
    import type { User } from '$libs/models/User';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import PasswordChanger from './PasswordChanger.svelte';
    import type { SubmitFunction } from '../../../../routes/app/settings/$types';
    import { addToast } from '$lib/stores/toast';
    import { Button } from '$lib/ui';
    import { enhance } from '$app/forms';
    import { fly } from 'svelte/transition';

    const user = getContext<Writable<User>>('user');
    let replicaUser = { ...$user };

    let showSaveChanges = false;
    $: showSaveChanges =
        $user.firstName !== replicaUser.firstName ||
        $user.lastName !== replicaUser.lastName ||
        $user.email !== replicaUser.email ||
        $user.bio !== replicaUser.bio;

    const editAccountEnhance: SubmitFunction = () => {
        return ({ result }) => {
            if (result.type === 'failure') {
                return addToast({ type: 'error', message: result.data!.message });
            } else if (result.type === 'success') {
                addToast({ type: 'success', message: result.data!.message });
                $user = { ...$user, ...replicaUser };
            }
        };
    };
</script>

<form method="post" action="?/editAccount" use:enhance={editAccountEnhance} class="w-full flex flex-col gap-5">
    <div class="relative w-full flex flex-col gap-5 md:flex-row">
        <div class="relative w-full flex flex-col gap-[10px]">
            <label for="firstName" class="text-neutral-500 text-sm">Prénom</label>
            <input
                name="firstName"
                value={replicaUser.firstName}
                on:input={(event) => (replicaUser.firstName = event.currentTarget.value)}
                class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm"
            />
        </div>
        <div class="relative w-full flex flex-col gap-[10px]">
            <label for="lastName" class="text-neutral-500 text-sm">Nom</label>
            <input
                name="lastName"
                value={replicaUser.lastName}
                on:input={(event) => (replicaUser.lastName = event.currentTarget.value)}
                class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm"
            />
        </div>
    </div>
    <div class="relative w-full flex flex-col gap-5 md:flex-row">
        <div class="relative w-full flex flex-col gap-[10px]">
            <label for="email" class="text-neutral-500 text-sm">Email</label>
            <input
                name="email"
                value={replicaUser.email}
                on:input={(event) => (replicaUser.email = event.currentTarget.value)}
                class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm"
            />
        </div>
        <PasswordChanger />
    </div>
    <div class="relative w-full flex flex-col gap-[10px]">
        <label for="bio" class="text-neutral-500 text-sm">Biographie</label>
        <textarea
            name="bio"
            value={replicaUser.bio}
            on:input={(event) => (replicaUser.bio = event.currentTarget.value)}
            class="relative w-full bg-neutral-100 rounded-lg px-5 h-[150px] text-sm resize-none"
        ></textarea>
    </div>
    {#if showSaveChanges}
        <div class="absolute bottom-0 left-0 w-full h-[50px] flex justify-between items-center" transition:fly={{ y: 50 }}>
            <span>Enregistrer les modifications ?</span>
            <div class="relative flex justify-center items-center gap-5">
                <Button.Normal variant="secondary" on:click={() => (replicaUser = { ...$user })}>Annuler</Button.Normal>
                <Button.Normal type="submit">Enregistrer</Button.Normal>
            </div>
        </div>
    {/if}
</form>
