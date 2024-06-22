<script lang="ts">
    import { addToast } from "$lib/stores/toast";
    import { getContext } from "svelte";
    import { changeSearchParams, type MemoPageContext } from "./utils";
    import { Button } from "$lib/ui";
    import IconPlus from "@tabler/icons-svelte/IconPlus.svelte";
    import { enhance } from "$app/forms";
    import type { SubmitFunction } from "../../../routes/app/memos/$types";

    const { memos } = getContext<MemoPageContext>('page');

    const createEnhance: SubmitFunction = () => {
        return ({ result }) => {
            if (result.type === "failure") {
                return addToast({ type: "error", message: result.data!.message })
            } else if (result.type === "success" && "id" in result.data!) {
                addToast({ type: 'success', message: 'Mémo ajouté avec succès.' });

                if ("memos" in result.data!) {
                    $memos = result.data.memos;
                }

                return changeSearchParams('id', result.data!.id);
            }
        }
    }
</script>

<form method="post" action="?/create" use:enhance={createEnhance} class="fixed md:relative bottom-5 right-5 md:bottom-auto md:right-auto p-0 rounded w-[50px] md:w-auto aspect-square md:aspect-auto md:h-full flex justify-center items-center z-30">
    <Button.Normal type="submit" class="relative rounded w-full h-full flex justify-center items-center gap-5">
        <IconPlus class="min-w-5 min-h-5" />
        <span class="hidden md:block whitespace-nowrap">Ajouter un mémo</span>
    </Button.Normal>
</form>
