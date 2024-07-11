<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import { addToast } from '$lib/stores/toast';
    import { Button, FullScreen, Card, Label } from '$lib/ui';
    import type { User } from '$libs/models/User';
    import type { SubmitFunction } from '@sveltejs/kit';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import IconHeartBroken from "@tabler/icons-svelte/IconHeartBroken.svelte"

    const user = getContext<Writable<User>>('user');

    let showDeleteAccount = false;

    const destroyAccountEnhance: SubmitFunction = () => {
        return ({ result }) => {
            if (result.type === 'failure') {
                return addToast({ type: 'error', message: result.data!.message });
            } else if (result.type === 'success') {
                goto('/logout');
            }
        };
    };
</script>

<div class="relative w-full flex justify-between items-center gap-[10px]">
    <Label for="destroy">Supprimer mon compte.</Label>
    <Button.Danger class="rounded-lg" on:click={() => (showDeleteAccount = true)}>Supprimer</Button.Danger>
    {#if showDeleteAccount}
        <FullScreen.Backdrop on:click={() => (showDeleteAccount = false)} class="flex justify-center items-center">
            <Card class="relative w-full mx-5 md:max-w-[480px] flex flex-col gap-5 justify-center items-center p-10">
                <h2 class="flex items-center gap-5">
                    <IconHeartBroken class="size-10 dark:text-neutral-50" />
                    <span class="text-xl font-semibold text-center dark:text-neutral-50">Supprimer mon compte</span>
                </h2>
                <p class="text-center dark:text-neutral-50">Je comprends que cette action est irréversible et que je ne pourrais pas revenir sur ma décision.</p>
                <form
                    method="post"
                    action="?/destroyAccount"
                    use:enhance={destroyAccountEnhance}
                    class="relative w-full flex flex-col justify-end gap-5"
                >
                    <input type="hidden" name="id" value={$user.id} />
                    <div class="relative w-full flex justify-end items-center gap-5">
                        <Button.Danger variant="secondary" on:click={() => (showDeleteAccount = false)}>Annuler</Button.Danger>
                        <Button.Danger type="submit">Supprimer mon compte</Button.Danger>
                    </div>
                </form>
            </Card>
        </FullScreen.Backdrop>
    {/if}
</div>
