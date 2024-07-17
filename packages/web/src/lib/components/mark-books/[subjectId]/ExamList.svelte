<script lang="ts">
    import type { Exam } from '$libs/models/Mark';
    import { getContext } from 'svelte';
    import type { Writable } from 'svelte/store';
    import ExamEditionModal from './ExamEditionModal.svelte';

    const exams = getContext<Writable<Exam[]>>('exams');

    let examEditionModalId: number | null;

    /** @see https://github.com/sveltejs/language-tools/issues/1026#issuecomment-1002839154 */
    const notypecheck = (x:any) => x;
</script>

<!--
@component
Displays the exams.
-->

{#each $exams as exam}
    <button
        on:click={() => (examEditionModalId = exam.id)}
        class="relative w-full p-5 rounded-lg bg-neutral-50 flex justify-center items-center gap-5"
    >
        <div
            class="relative flex-grow flex flex-col justify-between items-start gap-[10px]"
        >
            <h2>{exam.title} ({exam.weight}x)</h2>
            <p class="text-neutral-500 text-sm text-start">
                {exam.comment}
            </p>
        </div>
        <div
            class="relative my-auto size-10 rounded-full bg-primary-600 text-white grid place-items-center"
        >
            {exam.score}
        </div>
    </button>
{/each}

<!-- Ensure it exists. -->
{#if $exams.find(e => e.id === examEditionModalId)}
    <ExamEditionModal examId={notypecheck(examEditionModalId)} on:close={() => (examEditionModalId = null)} />
{/if}
