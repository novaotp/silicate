<script lang="ts">
    import { enhance } from "$app/forms";
    import { addToast } from "$lib/stores/toast";
    import { Button, Confirm, FullScreen } from "$lib/ui";
    import type { Subject } from "$libs/models/Mark";
    import IconTrash from "@tabler/icons-svelte/icons/trash";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import type { SubmitFunction } from "../../../../../routes/app/mark-books/$types";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    const subject = getContext<Writable<Subject>>("subject");

    let showConfirmSubjectDeletion: boolean = false;

    $: bookId = $page.params.bookId;

    const deleteEnhance: SubmitFunction = () => {
        return ({ result }) => {
            if (result.type === "failure") {
                return addToast({ type: "error", message: result.data!.message });
            } else if (result.type === "success") {
                addToast({ type: "success", message: "Branche supprimée avec succès." });

                showConfirmSubjectDeletion = false;
                goto(`/app/mark-books/${bookId}`);
            }
        }
    }
</script>

<!--
@component
Includes a button with icon and the confirmation dialog to delete a subject.
-->

<Button.Danger on:click={() => (showConfirmSubjectDeletion = true)} variant="tertiary" class="p-0">
    <IconTrash />
</Button.Danger>

{#if showConfirmSubjectDeletion}
    <FullScreen.Backdrop class="flex-center">
        <Confirm.Root class="w-full">
            <Confirm.Title>Supprimer "{$subject?.title}"</Confirm.Title>
            <Confirm.Description>
                Ceci supprimera la branche et tous ses examens.
                Je comprends que cette action est irréversible.
            </Confirm.Description>
            <Confirm.Actions>
                <Confirm.No>
                    <Button.Danger on:click={() => (showConfirmSubjectDeletion = false)} variant="secondary" class="w-full h-full">
                        Annuler
                    </Button.Danger>
                </Confirm.No>
                <Confirm.Yes>
                    <form method="post" action="?/destroySubject" use:enhance={deleteEnhance} class="w-full h-full">
                        <Button.Danger type="submit" class="w-full h-full">
                            Supprimer
                        </Button.Danger>
                    </form>
                </Confirm.Yes>
            </Confirm.Actions>
        </Confirm.Root>
    </FullScreen.Backdrop>
{/if}
