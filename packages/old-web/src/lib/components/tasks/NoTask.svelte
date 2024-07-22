<script lang="ts">
    import { enhance } from "$app/forms";
    import { getContext } from "svelte";
    import { changeSearchParams, type PageContext } from "./utils";
    import { addToast } from "$lib/stores/toast";
    import type { SubmitFunction } from "../../../routes/app/tasks/$types";
    import { Button } from "$lib/ui";

    const { tasks } = getContext<PageContext>('page');

    const createTaskEnhance: SubmitFunction = async () => {
        return ({ result }) => {
            if (result.type === "failure") {
                return addToast({ type: "error", message: result.data!.message })
            } else if (result.type === "success" && "id" in result.data!) {
                addToast({ type: 'success', message: 'Tâche ajoutée avec succès.' });

                if ("tasks" in result.data! && result.data.tasks) {
                    $tasks = result.data.tasks;
                }

                return changeSearchParams('id', result.data!.id);
            }
        }
    };
</script>

<div class="relative w-full max-w-[800px] sm:mx-auto h-full flex flex-col min-[900px]:flex-row-reverse justify-center items-start sm:items-center px-5 gap-5">
    <img src="/illustrations/no-tasks.svg" alt="Illustration : Ajouter une tâche" class="w-3/5 xsm:w-1/2 sm:2/5 self-center" />
    <div class="relative mx-auto flex flex-col justify-center items-start xsm:items-center gap-5">
        <h2 class="text-2xl">Créer une tâche</h2>
        <p class="text-neutral-500 max-w-[380px] xsm:text-center">
            Organise tes activités et atteins tes objectifs en créant des tâches claires et précises.
        </p>
        <form
            method="post"
            action="?/create"
            use:enhance={createTaskEnhance}
        >
            <Button.Normal type="submit" class="rounded-lg">
                Créer une tâche
            </Button.Normal>
        </form>
    </div>
</div>
