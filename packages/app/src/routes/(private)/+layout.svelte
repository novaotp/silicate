<script lang="ts">
	import { setContext } from 'svelte';
	import { writable } from 'svelte/store';
	import { Navigation } from '$features/app/navigation';
	import type { LayoutData } from './$types';
	import type { User } from '$common/models/user';

    export let data: LayoutData;

    setContext("user", writable<User>(data.user));
</script>

<div class="relative h-full w-full flex flex-col md:flex-row dark:bg-neutral-950">
    <Navigation />
    <slot />
</div>
