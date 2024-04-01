<script lang="ts">
    import { goto } from '$app/navigation';
    import { page } from '$app/stores';
    
    export let value: string;

    $: undecodedCurrentCategory = $page.url.searchParams.get('category');
    $: currentCategory = undecodedCurrentCategory !== null ? decodeURI(undecodedCurrentCategory) : '';

    const handleCategory = async () => {
        const searchParams = new URLSearchParams($page.url.searchParams);

        if (value === '') {
            searchParams.delete('category');
        } else {
            searchParams.set('category', encodeURI(value));
        }

        await goto(`/app/tasks?${searchParams}`, { invalidateAll: true });
    };
</script>

<button
    class="relative px-4 py-2 rounded-lg text-sm {currentCategory === value ? 'bg-black text-white' : 'bg-gray-300 text-gray-600'}"
    on:click={async () => await handleCategory()}
>
    <slot />
</button>
