<script lang="ts">
    import { enhance } from '$app/forms';
    import { goto } from '$app/navigation';
    import { addToast } from '$lib/stores/toast';
    import { Button, FullScreen, Card } from '$lib/ui';
    import type { User } from '$libs/models/User';
    import type { SubmitFunction } from '@sveltejs/kit';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';

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
    <label for="disconnect" class="text-neutral-500 text-sm">Supprimer mon compte.</label>
    <Button.Danger size="medium" on:click={() => (showDeleteAccount = true)}>Supprimer</Button.Danger>
    {#if showDeleteAccount}
        <FullScreen.Backdrop on:click={() => (showDeleteAccount = false)} class="flex justify-center items-center">
            <Card class="relative w-[480px] flex flex-col gap-5 justify-center items-center p-10">
                <h2 class="text-xl font-semibold">Supprimer mon compte</h2>
                <p class="text-center">Je comprends que cette action est irréversible et que je ne pourrais pas revenir sur ma décision.</p>
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
