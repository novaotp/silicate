<script lang="ts">
    import type { Subject } from "$libs/models/Mark";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import SubjectEditionModal from "./SubjectEditionModal.svelte";

    const subject = getContext<Writable<Subject>>("subject");

    let showSubjectEditionModal: boolean = false;
</script>

<!--
@component
An overview of the subject's metadata. Opens a modal to edit it.
-->

<button
    on:click={() => (showSubjectEditionModal = true)}
    class="rounded-lg p-5 bg-primary-500 text-white flex flex-col gap-5"
>
    <div class="flex justify-between">
        <div class="flex gap-5">
            <h1>{$subject.title}</h1>
        </div>
        {#if $subject.averageScore}
            <span>{$subject.averageScore}</span>
        {/if}
    </div>
    {#if $subject.description}
        <p class="text-sm text-start">{$subject.description}</p>
    {/if}
</button>

{#if showSubjectEditionModal}
    <SubjectEditionModal on:close={() => (showSubjectEditionModal = false)} />
{/if}
