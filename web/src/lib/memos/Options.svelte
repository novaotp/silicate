<script lang="ts">
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";
    import { IconSearch } from "@tabler/icons-svelte";

    export let search: string;
    export let order: string;

    const onOrderChange = async () => {
        const searchParams = $page.url.searchParams;
        order === "date-desc" || order === "" ? searchParams.delete("order") : searchParams.set("order", order);
        await goto(`/app/memos?${searchParams}`);
    }
</script>

<sidebar class="relative flex w-full lg:h-full lg:w-[400px] lg:flex flex-col md:flex-row lg:flex-col justify-start gap-10">
    <h2 class="text-2xl">Filtres</h2>
    <div class="flex flex-col gap-2">
        <label for="search">Recherche</label>
        <div class="relative h-[50px] w-full flex justify-between items-center rounded-lg border border-gray-400">
            <input
                class="relative h-full w-[calc(100%-50px)] rounded-l-lg px-4 text-[14px]"
                name="search"
                placeholder="Cherche un mémo..."
                bind:value={search}
            />
            <a
                href="/app/memos?search={search}"
                class="after:top-2/5 relative flex aspect-square h-full items-center
                justify-center after:absolute after:left-0 after:h-3/5
                after:w-[1px] after:bg-gray-400 after:content-['']"
            >
                <IconSearch />
            </a>
        </div>
    </div>
    <div class="flex flex-col gap-2">
        <label for="search">Ordre</label>
        <select bind:value={order} on:change={onOrderChange}>
            <option value="">Date (descendant)</option>
            <option value="date-asc">Date (ascendant)</option>
        </select>
    </div>
</sidebar>
