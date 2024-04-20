<script lang="ts">
    import { push, querystring } from 'svelte-spa-router';
    import AddTask from './AddTask.svelte';
    import { getCategories, getTasks } from '$/lib/requests/tasks';
    import { addToast } from '$/lib/stores/toast';
    import { getContext } from 'svelte';
    import type { PageContext } from './utils';

    const { tasks, categories } = getContext<PageContext>("page");

    $: urlSearchParams = new URLSearchParams($querystring);
    $: category = urlSearchParams.get('category') ?? '';
    $: search = urlSearchParams.get('search') ?? '';
    $: currentTab = urlSearchParams.get('tab') ?? '';

    async function goto(tab: "" | "archives") {
        currentTab = tab;

        const updatedTaskResults = await getTasks(category, search, currentTab === "archives");

        if (!updatedTaskResults.success) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les tâches.' });
            return;
        }

        $tasks = updatedTaskResults.data;

        const updatedCategoryResults = await getCategories(currentTab === "archives");

        if (!updatedCategoryResults.success) {
            addToast({ type: 'error', message: 'Impossible de mettre à jour les catégories.' });
            return;
        }

        $categories = updatedCategoryResults.data;

        console.log(currentTab)
    }
</script>

<menu class="fixed bottom-0 left-0 w-full h-[60px] py-[10px] flex justify-evenly items-center bg-white z-[70] shadow-[0_-4px_4px_rgba(0,0,0,0.1)]">
    <button class="border-b-2 {currentTab === '' ? 'border-primary-600' : 'border-transparent text-neutral-600'}" on:click={async () => await goto("")}>
        Tâches
    </button>
    <AddTask />
    <button
        class="border-b-2 {currentTab === 'archives' ? 'border-primary-600' : 'border-transparent text-neutral-600'}"
        on:click={async () => await goto('archives')}
    >
        Archives
    </button>
</menu>
