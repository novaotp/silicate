<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import type { Exam } from "$libs/models/Mark";

    export let examsData: Exam[];
</script>

{#each examsData as exam}
    <button
        on:click={() => goto(`${$page.url.pathname}/${exam.id}`)}
        class="relative w-full p-5 rounded-lg bg-neutral-50 flex justify-center items-center gap-5"
    >
        <div class="relative flex-grow flex flex-col justify-between items-start gap-[10px]">
            <h2>{exam.title} ({exam.weight}x)</h2>
            <p class="text-neutral-500 text-sm text-start">{exam.comment}</p>
        </div>
        <div class="relative my-auto size-10 rounded-full bg-primary-600 text-white grid place-items-center">
            {exam.score}
        </div>
    </button>
{/each}
