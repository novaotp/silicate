<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import { addToast } from '$lib/stores/toast';
    import { Button, FullScreen, Label, Confirm } from '$lib/ui';
    import type { User } from '$libs/models/User';
    import type { SubmitFunction } from '@sveltejs/kit';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import IconHeartBroken from '@tabler/icons-svelte/IconHeartBroken.svelte';

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
            <Confirm.Root class="relative w-full sm:max-w-[480px] flex flex-col gap-5 justify-center items-center">
                <Confirm.Title>
                    <IconHeartBroken class="size-10 dark:text-neutral-50" />
                    <span class="text-xl font-semibold text-center dark:text-neutral-50">Supprimer mon compte</span>
                </Confirm.Title>
                <Confirm.Description>
                    Je comprends que cette action est irréversible et que je ne pourrais pas revenir sur ma décision.
                </Confirm.Description>
                <Confirm.Actions>
                    <Confirm.No>
                        <Button.Danger variant="secondary" on:click={() => (showDeleteAccount = false)} class="w-full h-full">Annuler</Button.Danger>
                    </Confirm.No>
                    <Confirm.Yes>
                        <form method="post" action="?/destroyAccount" use:enhance={destroyAccountEnhance} class="flex flex-col justify-end gap-5">
                            <input type="hidden" name="id" value={$user.id} />
                            <Button.Danger type="submit" class="w-full h-full">Supprimer mon compte</Button.Danger>
                        </form>
                    </Confirm.Yes>
                </Confirm.Actions>
            </Confirm.Root>
        </FullScreen.Backdrop>
    {/if}
</div>
