<script lang="ts">
    import { goto } from "$app/navigation";
    import PomodoroTimer from "$components/tools/pomodoro-timer/PomodoroTimer.svelte";
    import IconChevronLeft from "@tabler/icons-svelte/icons/chevron-left";
</script>

<div class="relative w-full h-full flex flex-col gap-5 p-5 pt-0">
    <button on:click={() => goto("/app/tools")} class="flex gap-5">
        <IconChevronLeft />
        <span>Retour</span>
    </button>
   <PomodoroTimer />
</div>
