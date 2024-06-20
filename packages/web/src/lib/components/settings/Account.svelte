<script lang="ts">
    import { goto } from "$app/navigation";
    import { Button } from "$lib/ui";
    import { getContext } from "svelte";
    import type { User } from "$libs/models/User";
    import type { Writable } from "svelte/store";
    import Avatar from "../shared/Avatar.svelte";
    import type { ChangeEventHandler } from "svelte/elements";
    import { page } from "$app/stores";
    import type { ActionResult } from "@sveltejs/kit";
    import { deserialize, enhance } from "$app/forms";
    import { addToast } from "$lib/stores/toast";
    import type { SubmitFunction } from "../../../routes/app/settings/$types";

    let avatarFileInputNode: HTMLInputElement;
    const user = getContext<Writable<User>>("user");

    const editAvatar: ChangeEventHandler<HTMLInputElement> = async (event) => {
        const data = new FormData();
        const file = event.currentTarget.files?.item(0);

        if (!file) return;

        // Cannot send file directly, only via FormData.
        data.append('avatar', file);

        // Manually calling the action since it doesn't make sense to include a form.
        const response = await fetch(`${$page.url.pathname}?/editAvatar`, {
            method: 'POST',
            body: data
        });
        const result: ActionResult<{ message: string, avatar: string }, { message: string }> = deserialize(await response.text());

        if (result.type === "failure") {
            return addToast({ type: "error", message: result.data!.message });
        } else if (result.type === "success") {
            addToast({ type: "success", message: result.data!.message });
            $user.avatar = result.data!.avatar;
        }
    }

    const deleteAvatarEnhance: SubmitFunction = () => {
        return ({ result }) => {
            if (result.type === "failure") {
                return addToast({ type: "error", message: result.data!.message });
            } else if (result.type === "success") {
                addToast({ type: "success", message: result.data!.message });
                $user.avatar = null;
            }
        }
    }
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
            on:change={editAvatar}
            class="hidden"
        />
        {#if $user.avatar}
            <div class="flex flex-col gap-[10px]">
                <Button.Normal variant="primary" on:click={() => avatarFileInputNode.click()}>
                    Modifier mon avatar
                </Button.Normal>
                <form method="post" action="?/deleteAvatar" use:enhance={deleteAvatarEnhance}>
                    <Button.Danger variant="secondary">
                        Supprimer mon avatar
                    </Button.Danger>
                </form>
            </div>
        {:else}
            <Button.Normal variant="secondary" on:click={() => avatarFileInputNode.click()}>
                Ajouter un avatar
            </Button.Normal>
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
            <input name="password" class="relative w-full bg-neutral-100 rounded-lg px-5 h-[50px] text-sm" />
        </div>
    </div>
    <div class="relative w-full flex flex-col gap-[10px]">
        <label for="bio" class="text-neutral-500 text-sm">Biographie</label>
        <textarea name="bio" class="relative w-full bg-neutral-100 rounded-lg px-5 h-[150px] text-sm resize-none"></textarea>
    </div>
    <h3>Avancé</h3>
    <div class="relative w-full flex justify-between items-center gap-[10px]">
        <label for="disconnect" class="text-neutral-500 text-sm">Me déconnecter sur cet appareil.</label>
        <Button.Danger
            size="medium"
            on:click={() => goto('/auth/logout')}
        >
            Déconnexion
        </Button.Danger>
    </div>
</section>
