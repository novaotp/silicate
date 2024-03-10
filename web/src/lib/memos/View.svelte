<script lang="ts">
    import type { Memo } from '$libs/models/Memo';

    export let search: string;
    export let order: string;
    export let memos: Memo[] | undefined;

    const toTwoDigits = (number: number): string => {
        return number.toString().padStart(2, '0');
    };

    const formattedDate = (date: string | Date): string => {
        if (typeof date === 'string') {
            date = new Date(date);
        }

        const today = new Date();
        const hours = toTwoDigits(date.getHours());
        const minutes = toTwoDigits(date.getMinutes());

        if (
            date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate()
        ) {
            return `Aujourd'hui à ${hours}:${minutes}`;
        }

        const year = date.getFullYear();
        const month = toTwoDigits(date.getMonth() + 1);
        const day = toTwoDigits(date.getDate());

        return `${day}.${month}.${year} à ${hours}:${minutes}`;
    };
</script>

{#if !memos}
    <p>Une erreur est survenue.</p>
{:else}
    <ul
        class="relative mt-5 flex max-h-[calc(100%-50px)] md:h-full w-full flex-col"
    >
        {#each memos.sort((a, b) => {
            if (order === 'date-asc') {
                return new Date(a.lastChange).getTime() - new Date(b.lastChange).getTime();
            } else {
                return new Date(b.lastChange).getTime() - new Date(a.lastChange).getTime();
            }
        }) as memo}
            <li
                class="relative mb-3 min-h-[80px] w-full rounded-xl last-of-type:mb-0"
            >
                <a
                    href={`/app/memos/${memo.id}`}
                    class="relative flex h-full w-full flex-col bg-blue-200 p-3"
                >
                    <div class="relative flex w-full justify-between">
                        <p>{memo.title}</p>
                        <p>{formattedDate(memo.lastChange)}</p>
                    </div>
                    <p
                        class="relative mt-2 overflow-hidden text-ellipsis whitespace-nowrap bg-gray-500 text-xs"
                    >
                        {memo.content}
                    </p>
                </a>
            </li>
        {:else}
            {#if search === ''}
                <p>Tu n'as pas encore créé de mémos.</p>
            {:else}
                <p>Aucun résultat trouvé pour la recherche.</p>
            {/if}
        {/each}
    </ul>
{/if}
