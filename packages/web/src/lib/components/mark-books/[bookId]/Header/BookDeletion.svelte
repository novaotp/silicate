<script lang="ts">
    import { enhance } from "$app/forms";
    import { addToast } from "$lib/stores/toast";
    import { Button, Confirm, FullScreen } from "$lib/ui";
    import type { Book } from "$libs/models/Mark";
    import IconTrash from "@tabler/icons-svelte/icons/trash";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import type { SubmitFunction } from "../../../../../routes/app/mark-books/$types";
    import { goto } from "$app/navigation";

    const book = getContext<Writable<Book>>("book");

    let showConfirmBookDeletion: boolean = false;

    const deleteEnhance: SubmitFunction = ({ formData }) => {
        formData.set("id", $book!.id.toString());

        return ({ result }) => {
            if (result.type === "failure") {
                return addToast({ type: "error", message: result.data!.message });
            } else if (result.type === "success") {
                addToast({ type: "success", message: "Carnet supprimé avec succès." });

                showConfirmBookDeletion = false;
                goto("/app/mark-books");
            }
        }
    }
</script>

<!--
@component
Includes a button with icon and the confirmation dialog to delete a mark-book.
-->

<Button.Danger on:click={() => (showConfirmBookDeletion = true)} variant="tertiary" class="p-0">
    <IconTrash />
</Button.Danger>

{#if showConfirmBookDeletion}
    <FullScreen.Backdrop class="flex-center">
        <Confirm.Root class="w-full">
            <Confirm.Title>Supprimer "{$book?.title}"</Confirm.Title>
            <Confirm.Description>
                Ceci supprimera le carnet et toutes les données liées.
                Je comprends que cette action est irréversible.
            </Confirm.Description>
            <Confirm.Actions>
                <Confirm.No>
                    <Button.Danger on:click={() => (showConfirmBookDeletion = false)} variant="secondary" class="w-full h-full">
                        Annuler
                    </Button.Danger>
                </Confirm.No>
                <Confirm.Yes>
                    <form method="post" action="?/destroyBook" use:enhance={deleteEnhance} class="w-full h-full">
                        <Button.Danger type="submit" class="w-full h-full">
                            Supprimer
                        </Button.Danger>
                    </form>
                </Confirm.Yes>
            </Confirm.Actions>
        </Confirm.Root>
    </FullScreen.Backdrop>
{/if}
