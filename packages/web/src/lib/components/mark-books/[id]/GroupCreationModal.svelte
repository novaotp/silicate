<script lang="ts">
    import { addToast } from "$lib/stores/toast";
    import { createEventDispatcher, getContext } from "svelte";
    import { Button, Card, FullScreen, Input, Label, TextArea } from "$lib/ui";
    import { enhance } from "$app/forms";
    import type { Writable } from "svelte/store";
    import type { Group } from "$libs/models/Mark";
    import type { SubmitFunction } from "@sveltejs/kit";

    const groups = getContext<Writable<Group[]>>('groups');

    const dispatch = createEventDispatcher<{ close: null }>();

    let title: string = "";
    let description: string = "";
    let weight: number = 1;

    const closeModal = () => {
        title = "";
        description = "";
        weight = 1;
        dispatch("close")
    }

    const createEnhance: SubmitFunction = () => {
        return ({ result }) => {
            if (result.type === "failure") {
                return addToast({ type: "error", message: result.data!.message })
            } else if (result.type === "success") {
                addToast({ type: 'success', message: 'Groupe ajouté avec succès.' });

                if (!result.data?.group) {
                    throw new Error("Expected to receive the newly created book after creating it.")
                }

                $groups = [...$groups, result.data.group]

                closeModal();
            }
        }
    }
</script>

<FullScreen.Backdrop class="flex-center p-5" on:click={closeModal}>
    <Card class="w-full">
        <form
            method="post"
            action="?/createGroup"
            use:enhance={createEnhance}
            class="flex flex-col gap-5"
        >
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="title">Titre</Label>
                <Input name="title" bind:value={title} placeholder="Le titre du carnet..." />
                {#if !title}
                    <p class="text-accent-danger-500">Titre obligatoire.</p>
                {/if}
            </div>
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="description">Description</Label>
                <TextArea name="description" bind:value={description} placeholder="La description du carnet..." />
            </div>
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="weight">Pondération</Label>
                <Input name="weight" bind:value={weight} placeholder="La pondération du groupe..." />
                {#if !weight}
                    <p class="text-accent-danger-500">Pondération obligatoire.</p>
                {/if}
            </div>
            <div class="w-full flex justify-end items-center gap-5">
                <Button.Normal variant="secondary" on:click={closeModal}>
                    Annuler
                </Button.Normal>
                <Button.Normal type="submit" disabled={!title || !weight}>
                    Créer
                </Button.Normal>
            </div>
        </form>
    </Card>
</FullScreen.Backdrop>
