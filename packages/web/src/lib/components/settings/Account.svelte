<script lang="ts">
    import { goto } from '$app/navigation';
    import { Button, Card, FullScreen } from '$lib/ui';
    import { getContext } from 'svelte';
    import type { User } from '$libs/models/User';
    import type { Writable } from 'svelte/store';
    import Avatar from '../shared/Avatar.svelte';
    import type { ChangeEventHandler } from 'svelte/elements';
    import { page } from '$app/stores';
    import type { ActionResult } from '@sveltejs/kit';
    import { deserialize, enhance } from '$app/forms';
    import { addToast } from '$lib/stores/toast';
    import type { SubmitFunction } from '../../../routes/app/settings/$types';
    import Cropper from 'svelte-easy-crop';
    import Slider from '$lib/ui/Slider.svelte';

    let avatarFileInputNode: HTMLInputElement;
    let avatarFile: File | null = null;
    let showPasswordChanger: boolean = false;
    const user = getContext<Writable<User>>('user');
    let zoom = 1;
    let cropArea: { x: number, y: number, width: number, height: number };

    const toBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        });
    }

    const editAvatar = async () => {
        const data = new FormData();
        const file = avatarFile;

        if (!file) return;

        // Cannot send file directly, only via FormData.
        data.append('avatar', file);
        data.append('cropArea', JSON.stringify(cropArea));

        // Manually calling the action since it doesn't make sense to include a form.
        const response = await fetch(`${$page.url.pathname}?/editAvatar`, {
            method: 'POST',
            body: data
        });
        const result: ActionResult<{ message: string; avatar: string }, { message: string }> = deserialize(await response.text());

        if (result.type === 'failure') {
            return addToast({ type: 'error', message: result.data!.message });
        } else if (result.type === 'success') {
            addToast({ type: 'success', message: result.data!.message });
            $user.avatar = result.data!.avatar;
            avatarFile = null;
        }
    };

    const deleteAvatarEnhance: SubmitFunction = () => {
        return ({ result }) => {
            if (result.type === 'failure') {
                return addToast({ type: 'error', message: result.data!.message });
            } else if (result.type === 'success') {
                addToast({ type: 'success', message: result.data!.message });
                $user.avatar = null;
            }
        };
    };

    const editPasswordEnhance: SubmitFunction = () => {
        return ({ result }) => {
            if (result.type === 'failure') {
                return addToast({ type: 'error', message: result.data!.message });
            } else if (result.type === 'success') {
                addToast({ type: 'success', message: result.data!.message });
                showPasswordChanger = false;
            }
        };
    };
</script>

<section class="relative w-full flex flex-col gap-5">
    <h2>Mon profil</h2>
    <div class="relative w-full flex justify-center items-center gap-10">
        <Avatar class="w-[100px] h-[100px]" />
        <input
            bind:this={avatarFileInputNode}
            type="file"
            name="avatar"
            accept="image/*"
            on:change={(event) => (avatarFile = event.currentTarget.files?.item(0) ?? null)}
            class="hidden"
        />
        {#if avatarFile}
            {#await toBase64(avatarFile) then image}
                <FullScreen.Backdrop on:click={() => (avatarFile = null)} class="flex justify-center items-center">
                    <Card class="relative w-[560px] flex flex-col gap-10 p-10">
                        <div class="relative w-[480px] h-[300px] mx-auto">
                            <Cropper
                                {image}
                                crop={{ x: 0, y: 0 }}
                                bind:zoom
                                zoomSpeed={0.5}
                                aspect={1}
                                cropShape="round"
                                cropSize={{ width: 300, height: 300 }}
                                on:cropcomplete={(event) => (cropArea = event.detail.pixels)}
                            />
                        </div>
                        <Slider bind:value={zoom} min={1} max={3} step={0.1} class="w-[300px] mx-auto" />
                        <div class="relative w-full flex justify-between">
                            <Button.Normal variant="tertiary" on:click={() => { zoom = 1; editAvatar() }}>
                                Passer
                            </Button.Normal>
                            <div class="flex justify-end gap-5">
                                <Button.Normal variant="secondary" on:click={() => (avatarFile = null)}>
                                    Annuler
                                </Button.Normal>
                                <Button.Normal on:click={editAvatar}>
                                    Appliquer
                                </Button.Normal>
                            </div>
                        </div>
                    </Card>
                </FullScreen.Backdrop>
            {/await}
        {/if}
        {#if $user.avatar}
            <div class="flex flex-col gap-[10px]">
                <Button.Normal variant="primary" on:click={() => avatarFileInputNode.click()}>Modifier mon avatar</Button.Normal>
                <form method="post" action="?/deleteAvatar" use:enhance={deleteAvatarEnhance}>
                    <Button.Danger variant="secondary">Supprimer mon avatar</Button.Danger>
                </form>
            </div>
        {:else}
            <Button.Normal variant="secondary" on:click={() => avatarFileInputNode.click()}>Ajouter un avatar</Button.Normal>
        {/if}
    </div>
    <div class="relative w-full flex flex-col gap-5 md:flex-row">
        <div class="relative w-full flex flex-col gap-[10px]">
            <label for="firstName" class="text-neutral-500 text-sm">Prénom</label>
            <input name="firstName" value={$user.firstName} class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm" />
        </div>
        <div class="relative w-full flex flex-col gap-[10px]">
            <label for="lastName" class="text-neutral-500 text-sm">Nom</label>
            <input name="lastName" value={$user.lastName} class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm" />
        </div>
    </div>
    <div class="relative w-full flex flex-col gap-5 md:flex-row">
        <div class="relative w-full flex flex-col gap-[10px]">
            <label for="email" class="text-neutral-500 text-sm">Email</label>
            <input name="email" value={$user.email} class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm" />
        </div>
        <div class="relative w-full flex flex-col gap-[10px]">
            <label for="password" class="text-neutral-500 text-sm">Mot de passe</label>
            <Button.Normal class="h-full" on:click={() => (showPasswordChanger = true)}>Modifier mon mot de passe</Button.Normal>
            {#if showPasswordChanger}
                <FullScreen.Backdrop on:click={() => (showPasswordChanger = false)} class="flex justify-center items-center">
                    <Card class="relative w-[480px] flex flex-col gap-5 justify-center items-center p-10">
                        <h2 class="text-xl font-semibold">Modifier mon mot de passe.</h2>
                        <p class="text-center">Entre ton mot de passe actuel et le nouveau.</p>
                        <form method="post" action="?/editPassword" class="relative w-full flex flex-col gap-5" use:enhance={editPasswordEnhance}>
                            <div class="relative w-full flex flex-col gap-[10px]">
                                <label for="oldPassword" class="text-neutral-950 text-sm">Mot de passe actuel</label>
                                <input
                                    name="oldPassword"
                                    type="password"
                                    class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm"
                                    placeholder="Mon mot de passe actuel..."
                                />
                            </div>
                            <div class="relative w-full flex flex-col gap-[10px]">
                                <label for="newPassword" class="text-neutral-950 text-sm">Nouveau mot de passe</label>
                                <input
                                    name="newPassword"
                                    type="password"
                                    class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm"
                                    placeholder="Mon nouveau de passe actuel..."
                                />
                            </div>
                            <div class="relative w-full flex flex-col gap-[10px]">
                                <label for="confirmNewPassword" class="text-neutral-950 text-sm">Confirmer le nouveau mot de passe</label>
                                <input
                                    name="confirmNewPassword"
                                    type="password"
                                    class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm"
                                    placeholder="Je confirme mon nouveau de passe actuel..."
                                />
                            </div>
                            <div class="relative w-full flex justify-end items-center gap-5">
                                <Button.Normal variant="secondary">Annuler</Button.Normal>
                                <Button.Normal>Confirmer</Button.Normal>
                            </div>
                        </form>
                    </Card>
                </FullScreen.Backdrop>
            {/if}
        </div>
    </div>
    <div class="relative w-full flex flex-col gap-[10px]">
        <label for="bio" class="text-neutral-500 text-sm">Biographie</label>
        <textarea name="bio" class="relative w-full bg-neutral-100 rounded-lg px-5 h-[150px] text-sm resize-none"></textarea>
    </div>
    <h3>Avancé</h3>
    <div class="relative w-full flex justify-between items-center gap-[10px]">
        <label for="disconnect" class="text-neutral-500 text-sm">Me déconnecter sur cet appareil.</label>
        <Button.Danger size="medium" on:click={() => goto('/logout')}>Déconnexion</Button.Danger>
    </div>
</section>
