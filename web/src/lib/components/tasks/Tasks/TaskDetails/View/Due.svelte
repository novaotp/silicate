<script lang="ts">
    import { IconCalendarClock } from '@tabler/icons-svelte';

    export let value: string | null;
</script>

{#if value}
    {@const date = new Date(value).toLocaleDateString('fr-CH', { day: '2-digit', month: 'long', year: 'numeric' })}
    {@const time = new Date(value).toLocaleTimeString('fr-CH', { hour: '2-digit', minute: '2-digit' }).split(':').join('h')}
    <div class="relative w-full flex justify-between">
        <div class="relative flex items-center gap-4 text-gray-500">
            <IconCalendarClock />
            <span>Échéance</span>
        </div>
        <time>
            {date}, {time}
        </time>
    </div>
{/if}
