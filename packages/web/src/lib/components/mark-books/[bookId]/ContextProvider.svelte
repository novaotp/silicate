<script lang="ts">
    import type { Book, Group, Subject } from "$libs/models/Mark";
    import { setContext } from "svelte";

    export let book: Book;
    export let groups: Group[];
    export let subjects: Subject[];

    setContext("book", book);
    setContext("groups", groups);
    setContext("subjects", subjects);
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
