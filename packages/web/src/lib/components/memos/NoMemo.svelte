<script lang="ts">
    import { enhance } from "$app/forms";
    import { getContext } from "svelte";
    import { changeSearchParams, type MemoPageContext } from "./utils";
    import { addToast } from "$lib/stores/toast";
    import type { SubmitFunction } from "../../../routes/app/memos/$types";
    import { Button } from "$lib/ui";

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

<div class="relative w-full max-w-[800px] sm:mx-auto h-full flex flex-col min-[900px]:flex-row-reverse justify-center items-start sm:items-center gap-5">
    <img src="/illustrations/no-memos.png" alt="Illustration : Ajouter un mémo" class="w-3/5 xsm:w-1/2 sm:2/5 self-center" />
    <div class="relative mx-auto flex flex-col justify-center items-start xsm:items-center gap-5">
        <h2 class="text-2xl">Créer un mémo</h2>
        <p class="text-neutral-500 max-w-[350px] xsm:text-center">
            Rédige tes pensées dans un mémo pour ne rien oublier et rester organisé.
        </p>
        <form
            method="post"
            action="?/create"
            use:enhance={createEnhance}
        >
            <Button.Normal type="submit" class="rounded-lg">
                Créer un mémo
            </Button.Normal>
        </form>
    </div>
</div>
