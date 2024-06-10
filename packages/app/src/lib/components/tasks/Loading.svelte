<script lang="ts">
    import { Separator, Skeleton } from "$lib/ui";
</script>

<div class="relative w-full flex flex-col items-start gap-5">
    <Skeleton class="w-20 h-8" />
    <Skeleton class="w-full h-10" />
    <div class="relative w-full flex gap-2">
        <Skeleton class="w-20 h-10" />
        <Skeleton class="w-20 h-10" />
    </div>
    <div class="w-full flex flex-col">
        <Skeleton class="w-20 h-8" />
        {#each { length: 3 } as _, i}
            <div class="w-full h-20 py-5 flex gap-[30px]">
                <Skeleton class="h-full aspect-square" />
                <div class="flex-grow flex flex-col justify-between items-start">
                    <Skeleton class="w-40 h-5" />
                    <Skeleton class="w-20 h-4" />
                </div>
                <Skeleton class="h-full aspect-square rounded-[50%]" />
            </div>
            {#if i !== 2}
                <Separator />
            {/if}
        {/each}
    </div>
    <div class="w-full flex flex-col">
        <Skeleton class="w-20 h-8" />
        {#each { length: 2 } as _, i}
            <div class="w-full h-20 py-5 flex gap-[30px]">
                <Skeleton class="h-full aspect-square" />
                <div class="flex-grow flex flex-col justify-between items-start">
                    <Skeleton class="w-40 h-5" />
                    <Skeleton class="w-20 h-4" />
                </div>
                <Skeleton class="h-full aspect-square rounded-[50%]" />
            </div>
            {#if i !== 1}
                <Separator />
            {/if}
        {/each}
    </div>
</div>
