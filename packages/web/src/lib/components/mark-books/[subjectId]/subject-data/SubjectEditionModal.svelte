<script lang="ts">
    import { addToast } from "$lib/stores/toast";
    import { createEventDispatcher, getContext } from "svelte";
    import { Button, Card, FullScreen, Input, Label, TextArea } from "$lib/ui";
    import { enhance } from "$app/forms";
    import type { Writable } from "svelte/store";
    import type { Group, Subject } from "$libs/models/Mark";
    import type { SubmitFunction } from "@sveltejs/kit";
    import { confirmCardClasses } from "$lib/ui/Confirm";
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    const groups = getContext<Writable<Group[]>>('groups');
    const subject = getContext<Writable<Subject>>('subject');

    const dispatch = createEventDispatcher<{ close: null }>();

    let groupId: number = $subject.groupId;
    let title: string = $subject.title;
    let description: string = $subject.description;

    $: bookIdParam = $page.params.bookId!;
    $: groupIdParam = $page.params.groupId!;
    $: subjectIdParam = $page.params.subjectId!;

    const closeModal = () => {
        dispatch("close")
    }

    const editEnhance: SubmitFunction = () => {
        return ({ result }) => {
            if (result.type === "failure") {
                return addToast({ type: "error", message: result.data!.message })
            } else if (result.type === "success") {
                addToast({ type: 'success', message: 'Branche ajoutée avec succès.' });

                if (Number(groupIdParam) !== groupId) {
                    return goto(`/app/mark-books/${bookIdParam}/groups/${groupId}/subjects/${subjectIdParam}`);
                }

                $subject.title = title;
                $subject.description = description;
                $subject.groupId = groupId;
                closeModal();
            }
        }
    }
</script>

<FullScreen.Backdrop class="flex-center" on:click={closeModal}>
    <Card class={confirmCardClasses}>
        <form
            method="post"
            action="?/editSubject"
            use:enhance={editEnhance}
            class="flex flex-col gap-5"
        >
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="title">Groupe</Label>
                <select name="groupId" value={groupId} on:change={(event) => (groupId = Number(event.currentTarget.value))} class="px-5 py-[10px] rounded-lg text-sm">
                    {#each $groups as group}
                        <option value={group.id}>{group.title}</option>
                    {/each}
                </select>
                {#if !groupId}
                    <p class="text-accent-danger-500 text-sm">Groupe obligatoire.</p>
                {/if}
            </div>
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="title">Titre</Label>
                <Input name="title" bind:value={title} placeholder="Le titre de la branche..." />
                {#if title === ""}
                    <p class="text-accent-danger-500 text-sm">Titre obligatoire.</p>
                {/if}
            </div>
            <div class="relative w-full flex flex-col gap-[10px]">
                <Label for="description">Description</Label>
                <TextArea name="description" bind:value={description} placeholder="La description de la branche..." />
            </div>
            <div class="w-full flex justify-end items-center gap-5">
                <Button.Normal variant="secondary" on:click={closeModal}>
                    Annuler
                </Button.Normal>
                <Button.Normal type="submit" disabled={title === "" || !groupId}>
                    Modifier
                </Button.Normal>
            </div>
        </form>
    </Card>
</FullScreen.Backdrop>
