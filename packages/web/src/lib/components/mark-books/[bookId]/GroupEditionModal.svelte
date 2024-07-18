<script lang="ts">
    import { addToast } from "$lib/stores/toast";
    import { createEventDispatcher, getContext } from "svelte";
    import { Button, Card, FullScreen, Input, Label, TextArea } from "$lib/ui";
    import { enhance } from "$app/forms";
    import type { Writable } from "svelte/store";
    import type { Book, Group } from "$libs/models/Mark";
    import type { SubmitFunction } from "@sveltejs/kit";
    import { confirmCardClasses } from "$lib/ui/Confirm";
    import IconX from "@tabler/icons-svelte/icons/x";
    import IconTrash from "@tabler/icons-svelte/icons/trash";

    export let groupId: number;

    const book = getContext<Writable<Book>>('book');
    const groups = getContext<Writable<Group[]>>('groups');

    const dispatch = createEventDispatcher<{ close: null }>();
    let group = $groups.find(g => g.id === groupId)!;

    let title: string = group.title;
    let description: string = group.description;
    let weight: number = group.weight ?? 0;

    const closeModal = () => {
        dispatch("close")
    }

    const editEnhance: SubmitFunction = ({ formData }) => {
        formData.set("id", groupId.toString());

        return ({ result }) => {
            if (result.type === "failure") {
                return addToast({ type: "error", message: result.data!.message })
            } else if (result.type === "success") {
                addToast({ type: 'success', message: 'Groupe modifié avec succès.' });

                $groups = $groups.map(g => g.id === groupId ? { ...g, title, description, weight } : g);

                closeModal();
            }
        }
    }

    const deleteEnhance: SubmitFunction = ({ formData }) => {
        formData.set("id", groupId.toString());

        return ({ result }) => {
            if (result.type === "failure") {
                return addToast({ type: "error", message: result.data!.message })
            } else if (result.type === "success") {
                addToast({ type: 'success', message: 'Groupe supprimé avec succès.' });

                $groups = $groups.map(g => g.id === groupId ? { ...g, title, description, weight } : g);

                if (result.data?.book) {
                    $book = result.data.book
                }

                closeModal();

                // Wait for the FullScreen.Backdrop animation to finish
                setTimeout(() => {
                    $groups = $groups.filter((g) => g.id !== groupId);
                }, 400);
            }
        }
    }
</script>

<FullScreen.Backdrop class="flex-center" on:click={closeModal}>
    <Card class={confirmCardClasses}>
        <div class="relative w-full h-10 flex justify-between">
            <button on:click={closeModal}>
                <IconX />
            </button>
            <form method="post" action="?/destroyGroup" use:enhance={deleteEnhance}>
                <Button.Danger type="submit" variant="tertiary" class="px-0">
                    <IconTrash />
                </Button.Danger>
            </form>
        </div>
        <form
            method="post"
            action="?/editGroup"
            use:enhance={editEnhance}
            class="flex flex-col gap-5"
        >
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="title">Titre</Label>
                <Input name="title" bind:value={title} placeholder="Le titre du groupe..." />
                {#if title === ""}
                    <p class="text-accent-danger-500 text-sm">Titre obligatoire.</p>
                {/if}
            </div>
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="description">Description</Label>
                <TextArea name="description" bind:value={description} placeholder="La description du groupe..." />
            </div>
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="weight">Pondération</Label>
                <Input type="number" step={0.1} name="weight" bind:value={weight} placeholder="La pondération du groupe..." />
                {#if !weight}
                    <p class="text-accent-danger-500 text-sm">Pondération obligatoire.</p>
                {/if}
            </div>
            <div class="w-full flex justify-end items-center gap-5">
                <Button.Normal variant="secondary" on:click={closeModal}>
                    Annuler
                </Button.Normal>
                <Button.Normal type="submit" disabled={!title || !weight}>
                    Modifier
                </Button.Normal>
            </div>
        </form>
    </Card>
</FullScreen.Backdrop>
