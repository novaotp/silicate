<script lang="ts">
    import type { Book, Group, Subject } from "$libs/models/Mark";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    export let books: Book[];

    setContext("books", writable(books));
</script>

<!--
@component
Provides the mark-books' data context.

The data available is :
* The books data (key: books)
-->

<slot />
