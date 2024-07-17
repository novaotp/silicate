<script lang="ts">
    import type { Exam, Group, Subject } from "$libs/models/Mark";
    import { setContext } from "svelte";
    import { writable } from "svelte/store";

    export let groups: Group[];
    export let subject: Subject;
    export let exams: Exam[];

    setContext("groups", writable(groups));
    setContext("subject", writable(subject));
    setContext("exams", writable(exams));
</script>

<!--
@component
Provides the subject's data context.

The data available is :
* The groups data (key: groups)
* The subject's data (key: subject)
* The exams data (key: exams)
-->

<slot />
