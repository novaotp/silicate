<script lang="ts">
    import { enhance } from "$app/forms";
    import { addToast } from "$lib/stores/toast";
    import { Button, Confirm, FullScreen } from "$lib/ui";
    import type { Book } from "$libs/models/Mark";
    import IconTrash from "@tabler/icons-svelte/IconTrash.svelte";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import type { SubmitFunction } from "../../../../routes/app/mark-books/$types";
    import { changeSearchParams } from "$utils/change-search-params";

    const currentBook = getContext<Writable<Book | undefined>>("currentBook");
    const books = getContext<Writable<Book[]>>("books");

    let formNode: HTMLFormElement;
    let showConfirmBookDeletion: boolean = false;

    const deleteEnhance: SubmitFunction = ({ formData }) => {
        formData.set("id", $currentBook!.id.toString());

        return ({ result }) => {
            if (result.type === "failure") {
                return addToast({ type: "error", message: result.data!.message });
            } else if (result.type === "success") {
                addToast({ type: "success", message: "Carnet supprimé avec succès." });

                $books = $books.filter(b => b.id !== $currentBook!.id);

                showConfirmBookDeletion = false;
                changeSearchParams("bookId", null);
            }
        }
    }
</script>

<Button.Danger on:click={() => (showConfirmBookDeletion = true)} variant="tertiary" class="p-0">
    <IconTrash />
</Button.Danger>

{#if showConfirmBookDeletion}
    <FullScreen.Backdrop class="flex-center">
        <Confirm
            confirmType="danger"
            noText="Annuler"
            yesText="Supprimer"
            on:no={() => (showConfirmBookDeletion = false)}
            on:yes={() => formNode.requestSubmit()}
            class="w-full"
        >
            <h2 slot="title">Supprimer "{$currentBook?.title}"</h2>
            <p slot="content">
                Ceci supprimera le carnet et toutes les données liées.
                Je comprends que cette action est irréversible.
            </p>
        </Confirm>
        <form method="post" action="?/destroyBook" use:enhance={deleteEnhance} bind:this={formNode}></form>
    </FullScreen.Backdrop>
{/if}
