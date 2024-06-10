<script lang="ts">
    import { enhance } from '$app/forms';
    import { IconPlus, IconSearch } from '@tabler/icons-svelte';
    import HeaderMinWidth1024 from './Header.mw1024.svelte';

    export let search: string;
</script>

<header class="relative w-full flex lg:hidden justify-center items-start xsm:justify-between xsm:items-center flex-col gap-8 sm:gap-4 xsm:flex-row">
    <h1 class="text-xl sm:mr-auto">Mémos</h1>
    <div class="relative h-[50px] w-full xsm:max-w-[300px] flex justify-between items-center rounded-lg border border-gray-400">
        <input
            class="relative h-full w-[calc(100%-50px)] rounded-l-lg px-4 text-sm"
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
    <form method="post" class="relative h-full aspect-square hidden sm:flex" use:enhance>
        <button
            class="relative gap-3 flex h-full aspect-square items-center justify-center rounded-lg bg-blue-500 drop-shadow-[0_0px_8px_rgba(0,0,0,0.4)] text-white"
            type="submit"
        >
            <IconPlus class="text-xl" />
        </button>
    </form>
</header>
<HeaderMinWidth1024 {search} />
