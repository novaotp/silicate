<script lang="ts">
    import { goto } from "$app/navigation";
    import type { Subject } from "$libs/models/Mark";
    import { getContext } from "svelte";
    import type { Writable } from "svelte/store";
    import IconChevronLeft from "@tabler/icons-svelte/icons/chevron-left";
    import { page } from "$app/stores";

    const subject = getContext<Writable<Subject>>("subject");
</script>

<div class="relative w-full flex justify-between">
    <div class="flex gap-5">
        <button on:click={() => goto(`/app/mark-books/${$page.params.bookId}`)}>
            <IconChevronLeft />
        </button>
        <h1>{$subject.title}</h1>
    </div>
    {#if $subject.averageScore !== null}
        <span>{$subject.averageScore}</span>
    {/if}
</div>
