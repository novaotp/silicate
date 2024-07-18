<script lang="ts">
    import { addToast } from "$lib/stores/toast";
    import { createEventDispatcher, getContext } from "svelte";
    import { Button, Card, FullScreen, Input, Label, TextArea } from "$lib/ui";
    import { enhance } from "$app/forms";
    import type { Writable } from "svelte/store";
    import type { Book, GradingSystem } from "$libs/models/Mark";
    import type { SubmitFunction } from "@sveltejs/kit";
    import { confirmCardClasses } from "$lib/ui/Confirm";
    import { goto } from "$app/navigation";

    const books = getContext<Writable<Book[]>>('books');

    const dispatch = createEventDispatcher<{ close: null }>();

    let title: string = "";
    let description: string = "";
    // Not supporting letters for now
    let gradingSystem: GradingSystem = "numbers";

    const closeModal = () => {
        title = "";
        description = "";
        dispatch("close")
    }

    const createEnhance: SubmitFunction = () => {
        return ({ result }) => {
            if (result.type === "failure") {
                return addToast({ type: "error", message: result.data!.message })
            } else if (result.type === "success" && "id" in result.data!) {
                addToast({ type: 'success', message: 'Carnet ajouté avec succès.' });

                if (result.data.books) {
                    $books = result.data.books;
                }

                closeModal();
            }
        }
    }
</script>

<FullScreen.Backdrop class="flex-center" on:click={closeModal}>
    <Card class={confirmCardClasses}>
        <form
            method="post"
            action="?/createBook"
            use:enhance={createEnhance}
            class="flex flex-col gap-5"
        >
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="title">Titre</Label>
                <Input name="title" bind:value={title} placeholder="Le titre du carnet..." />
            </div>
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="description">Description</Label>
                <TextArea name="description" bind:value={description} placeholder="La description du carnet..." />
            </div>
            <!-- Not supporting letters for now -->
            <input type="hidden" name="gradingSystem" value={gradingSystem} />
            <relative class="w-full flex justify-end items-center gap-5">
                <Button.Normal variant="secondary" on:click={closeModal}>
                    Annuler
                </Button.Normal>
                <Button.Normal type="submit">
                    Créer
                </Button.Normal>
            </relative>
        </form>
    </Card>
</FullScreen.Backdrop>
