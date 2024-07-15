<script lang="ts">
    import IconChevronLeft from "@tabler/icons-svelte/IconChevronLeft.svelte";
    import { goto } from "$app/navigation";
    import BookDeletion from "./BookDeletion.svelte";
</script>

<div class="relative w-full flex justify-between">
    <button on:click={() => goto("/app/mark-books")} class="flex gap-5">
        <IconChevronLeft />
        <span>Retour</span>
    </button>
    <BookDeletion />
</div>
