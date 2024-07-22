<script lang="ts">
    import { addToast } from "$lib/stores/toast";
    import { FullScreen, Card, Label, TextArea, Button, Input } from "$lib/ui";
    import { createEventDispatcher, getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import type { Book } from "$libs/models/Mark";
    import type { SubmitFunction } from "../../../../../routes/app/mark-books/[bookId]/$types";
    import { enhance } from "$app/forms";
    import { confirmCardClasses } from "$lib/ui/Confirm";

    const book = getContext<Writable<Book>>("book");
    let tempBookData = { ...$book };

    const dispatch = createEventDispatcher<{ close: null }>();

    const editEnhance: SubmitFunction = ({ formData }) => {
        formData.set("gradingSystem", tempBookData.gradingSystem);

        return ({ result }) => {
            if (result.type === "failure") {
                return addToast({ type: "error", message: result.data!.message });
            } else if (result.type === "success") {
                addToast({ type: "success", message: result.data!.message });
                dispatch("close");

                $book.title = tempBookData.title;
                $book.description = tempBookData.description;
                $book.gradingSystem = tempBookData.gradingSystem;
            }
        }
    }
</script>

<!--
@component
The overlay to edit a mark-book's metadata.
-->

<FullScreen.Backdrop class="flex justify-center items-center" on:click={() => dispatch("close")}>
    <Card class={confirmCardClasses}>
        <form method="post" action="?/editBook" use:enhance={editEnhance} class="flex flex-col gap-5 items-end">
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
                <Button.Normal type="submit" disabled={tempBookData.title === ""}>
                    Modifier
                </Button.Normal>
            </div>
        </form>
    </Card>
</FullScreen.Backdrop>
