<script lang="ts">
	import { Skeleton } from "$ui/feedback";
	import { Masonry } from "$ui/layout";
	import { Search } from "./components";

    let dummyMemoHeights = [110, 160, 90, 100, 130];
</script>

<header class="relative w-full flex flex-col md:flex-row gap-5 justify-start md:justify-between items-center">
    <h1 class="relative self-start h-full flex items-center text-xl text-primary-950 dark:text-neutral-50">Mémos</h1>
    <div class="relative h-full w-full md:w-auto flex gap-5 items-center">
        <Search />
    </div>
</header>
<div role="list" class="relative min-h-8 w-full flex flex-nowrap items-center gap-2">
    <Skeleton class="w-20 h-full" />
    <Skeleton class="w-20 h-full" />
</div>
<Masonry items={dummyMemoHeights} stretchFirst>
    {#each dummyMemoHeights as height}
        <Skeleton class="w-full" style="height: {height}px" />
    {/each}
</Masonry>
