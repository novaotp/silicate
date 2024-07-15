<script lang="ts">
    import type { Book, Group, Subject } from "$libs/models/Mark";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    export let book: Book;
    export let groups: Group[];
    export let subjects: Subject[];

    setContext("book", writable(book));
    setContext("groups", writable(groups));
    setContext("subjects", writable(subjects));
</script>

<!--
@component
Provides the different contexts for a mark-book page's data.

The data available are :
* The book's data (key: book)
* The groups data (key: groups)
* The subjects data (key: subjects)
-->

<slot />
