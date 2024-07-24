<script lang="ts">
    import { page } from "$app/stores";
    import { createEventDispatcher, type ComponentType } from "svelte";
    import Separator from "../../Separator.svelte";

    export let tabs: { slug: string, label: string, component: ComponentType }[];

    const dispatch = createEventDispatcher<{ change: string }>();

    $: currentTab = $page.url.searchParams.get("tab") ?? "my-profile";
    $: componentForLabel = tabs.find(tab => tab.slug === currentTab)!.component;
</script>

<div class="relative w-full h-full flex justify-center items-start gap-20">
    <div class="relative h-full flex flex-col gap-5">
        {#each tabs as { label, slug }}
            <button
                on:click={() => dispatch("change", slug)}
                class="relative py-2 px-5 rounded-full {slug === currentTab ? "bg-primary-200 text-primary-700" : "text-neutral-500"}"
            >
                {label}
            </button>
        {/each}
    </div>
    <Separator axis="y" />
    <div class="relative h-full flex-1 max-w-[680px]">
        <svelte:component this={componentForLabel} />
    </div>
</div>
