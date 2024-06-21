<script lang="ts">
    import { deserialize, enhance } from '$app/forms';
    import { page } from '$app/stores';
    import Avatar from '$components/shared/Avatar.svelte';
    import { addToast } from '$lib/stores/toast';
    import { FullScreen, Card, Button } from '$lib/ui';
    import Slider from '$lib/ui/Slider.svelte';
    import type { User } from '$libs/models/User';
    import type { ActionResult, SubmitFunction } from '@sveltejs/kit';
    import { getContext } from 'svelte';
    import Cropper from 'svelte-easy-crop';
    import type { Writable } from 'svelte/store';

    const user = getContext<Writable<User>>('user');

    let avatarFileInputNode: HTMLInputElement;
    let avatarFile: File | null = null;
    let cropArea: { x: number; y: number; width: number; height: number };
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
</script>

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
