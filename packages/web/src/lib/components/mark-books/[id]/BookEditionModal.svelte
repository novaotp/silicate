<script lang="ts">
    import { enhance } from "$app/forms";
    import { addToast } from "$lib/stores/toast";
    import { FullScreen, Card, Label, TextArea, Button, Input } from "$lib/ui";
    import { createEventDispatcher, getContext } from "svelte";
    import type { SubmitFunction } from "../../../../routes/app/mark-books/$types";
    import type { Writable } from "svelte/store";
    import type { Book } from "$libs/models/Mark";
    import { PUBLIC_BACKEND_URL } from "$env/static/public";
    import type { ApiResponse } from "$libs/types/ApiResponse";

    const currentBook = getContext<Writable<Book | undefined>>("currentBook");
    const books = getContext<Writable<Book[]>>("books");
    const jwt = getContext<string>("jwt");
    let tempBookData = { ...$currentBook }

    const dispatch = createEventDispatcher<{ close: null }>();

    const editBook = async () => {
        if (!$currentBook) return;

        const oldData = { ...$currentBook };
        currentBook.set(oldData);

        try {
            if (!tempBookData.title) {
                return addToast({ type: "error", message: "Complétez tous les champs." });
            }

            const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/mark-books/${tempBookData.id}`, {
                method: "PUT",
                body: JSON.stringify({
                    title: tempBookData.title,
                    description: tempBookData.description,
                    gradingSystem: tempBookData.gradingSystem
                }),
                headers: {
                    "accept": "application/json",
                    "authorization": jwt,
                    "content-type": "application/json"
                }
            });

            const result: ApiResponse = await response.json();

            if (!result.success) {
                // Optimistic update failover
                $currentBook.title = oldData.title;
                $currentBook.description = oldData.description;
                $currentBook.gradingSystem = oldData.gradingSystem;

                return addToast({ type: "error", message: result.message });
            }

            dispatch("close");
            addToast({ type: "success", message: "Carnet modifié avec succès." });

            console.log($currentBook)
        } catch (err) {
            console.error(`Une erreur est survenue lors de l'édition d'un carnet de note : ${(err as Error).message}`);
            addToast({ type: "error", message: "Internal Server Error" });

            // Optimistic update failover
            $currentBook.title = oldData.title;
            $currentBook.description = oldData.description;
            $currentBook.gradingSystem = oldData.gradingSystem;
        }
    }
</script>

<FullScreen.Backdrop class="flex justify-center items-center" on:click={() => dispatch("close")}>
    <Card>
        <input type="hidden" name="gradingSystem" value="{tempBookData.gradingSystem}" />
        <div class="relative w-full flex flex-col gap-[10px]">
            <Label for="title">Titre</Label>
            <Input name="title" bind:value={tempBookData.title} placeholder="Le titre du carnet de note..." />
            {#if tempBookData.title === ""}
                <p class="text-accent-danger-500">Titre obligatoire.</p>
            {/if}
        </div>
        <div class="relative w-full flex flex-col gap-[10px]">
            <Label for="description">Description</Label>
            <TextArea name="description" bind:value={tempBookData.description} placeholder="La description du carnet de note..." />
        </div>
        <div class="relative w-full justify-end flex gap-5">
            <Button.Normal type="button" variant="secondary" on:click={() => dispatch("close")}>
                Annuler
            </Button.Normal>
            <Button.Normal variant="primary" disabled={tempBookData.title === ""} on:click={editBook}>
                Modifier
            </Button.Normal>
        </div>
    </Card>
</FullScreen.Backdrop>
