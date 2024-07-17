<script lang="ts">
    import IconChevronLeft from "@tabler/icons-svelte/icons/chevron-left";
    import { goto } from "$app/navigation";
    import SubjectDeletion from "./SubjectDeletion.svelte";
    import { page } from "$app/stores";

    $: bookId = $page.params.bookId;
</script>

<div class="relative w-full flex justify-between">
    <button on:click={() => goto(`/app/mark-books/${bookId}`)} class="flex gap-5">
        <IconChevronLeft />
        <span>Retour</span>
    </button>
    <SubjectDeletion />
</div>
