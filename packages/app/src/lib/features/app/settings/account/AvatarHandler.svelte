<script lang="ts">
    import { getContext } from 'svelte';
    import Cropper from 'svelte-easy-crop';
	import { getPreference } from '$utils/capacitor-preferences';
    import { addToast } from '$stores/toast';
	import { Avatar } from '$ui/display';
	import { Card, Overlay } from '$ui/layout';
	import { Button, Slider } from '$ui/forms';
	import { deleteAvatar, updateAvatar } from './requests';
    import type { Writable } from 'svelte/store';
	import type { User } from '$common/models/user';
	import type { ApiResponse, ApiResponseWithData } from '$common/types/api-response';
	import type { CropArea } from './types';

    const user = getContext<Writable<User>>('user');

    let avatarFileInputNode: HTMLInputElement;
    let avatarFile: File | null = null;
    let cropArea: CropArea;
    let zoom = 1;

    const toBase64 = (file: File) => {
        return new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
        });
    };

    const editAvatar = async () => {
        const token = await getPreference<{ jwt: string, expires: string }>('token', { parse: true });

        if (!avatarFile) {
            return addToast({ type: "error", message: "Sélectionnez une image..." });
        }

        let response: ApiResponseWithData<string>;
        try {
            response = await updateAvatar(token.jwt, avatarFile, cropArea);
        } catch (error) {
            console.error(error);
			return addToast({ type: "error", message: "Une erreur est survenue." });
        }

        if (!response.success) {
            return addToast({ type: 'error', message: response.message });
        }

        addToast({ type: 'success', message: response.message });
        $user.avatar = response.data;
        avatarFile = null;
    };

    const destroyAvatar = async () => {
        const token = await getPreference<{ jwt: string, expires: string }>('token', { parse: true });

        if ($user.avatar === null) {
            return addToast({ type: "error", message: "Impossible de supprimer un avatar qui n'existe pas..." });
        }

        let response: ApiResponse;
        try {
            response = await deleteAvatar(token.jwt);
        } catch (error) {
            console.error(error);
			return addToast({ type: "error", message: "Une erreur est survenue." });
        }

        if (!response.success) {
            return addToast({ type: 'error', message: response.message });
        }

        addToast({ type: 'success', message: response.message });
        $user.avatar = null;
    };
</script>

<div class="relative w-full flex justify-center items-center gap-10">
    <Avatar user={$user} class="w-[100px] h-[100px]" textSize={28} />
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
            <Overlay on:click={() => (avatarFile = null)} class="flex justify-center items-center">
                <Card class="relative w-full mx-5 sm:max-w-[560px] flex flex-col gap-10 p-5 sm:p-10">
                    <div class="relative w-full sm:max-w-[480px] h-[300px] mx-auto">
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
                    <div class="relative w-full flex flex-col sm:flex-row justify-between">
                        <Button.Normal
                            variant="tertiary"
                            on:click={() => {
                                zoom = 1;
                                editAvatar();
                            }}
                        >
                            Passer
                        </Button.Normal>
                        <div class="flex justify-end gap-5">
                            <Button.Normal variant="secondary" on:click={() => (avatarFile = null)}>Annuler</Button.Normal>
                            <Button.Normal on:click={editAvatar}>Appliquer</Button.Normal>
                        </div>
                    </div>
                </Card>
            </Overlay>
        {/await}
    {/if}
    {#if $user.avatar}
        <div class="flex flex-col gap-[10px]">
            <Button.Normal on:click={() => avatarFileInputNode.click()}>
                Modifier mon avatar
            </Button.Normal>
            <Button.Danger on:click={destroyAvatar} variant="secondary">
                Supprimer mon avatar
            </Button.Danger>
        </div>
    {:else}
        <Button.Normal variant="secondary" on:click={() => avatarFileInputNode.click()}>Ajouter un avatar</Button.Normal>
    {/if}
</div>
