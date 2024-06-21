<script lang="ts">
    import IconPlus from '@tabler/icons-svelte/IconPlus.svelte';
    import { getContext } from 'svelte';
    import { addToast } from '$lib/stores/toast';
    import { changeSearchParams, type PageContext } from './utils';
    import { Button } from '$lib/ui';
    import { enhance } from '$app/forms';
    import type { SubmitFunction } from '../../../routes/app/tasks/$types';

    const { tasks } = getContext<PageContext>('page');

    const createTaskEnhance: SubmitFunction = async () => {
        return ({ result }) => {
            if (result.type === "failure") {
                return addToast({ type: "error", message: result.data!.message })
            } else if (result.type === "success") {
                addToast({ type: 'success', message: 'Mémo ajouté avec succès.' });

                if ("tasks" in result.data! && result.data.tasks) {
                    $tasks = result.data.tasks;
                }

                // @ts-ignore
                return changeSearchParams('id', result.data!.id);
            }
        }
    };
</script>

<form method="post" action="?/create" use:enhance={createTaskEnhance} class="relative bottom-[30px] md:bottom-auto h-[60px] w-[60px] md:h-full md:aspect-auto rounded-full md:rounded md:w-auto flex justify-center items-center z-30">
    <Button.Normal type="submit" class="relative rounded-full md:rounded w-full h-full flex justify-center items-center gap-5">
        <IconPlus class="min-w-5 min-h-5" />
        <span class="hidden md:block whitespace-nowrap">Ajouter une tâche</span>
    </Button.Normal>
</form>
