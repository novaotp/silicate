<script lang="ts">
    import { getContext } from 'svelte';
    import { PUBLIC_APP_NAME } from '$env/static/public';
    import type { Writable } from 'svelte/store';
	import type { User } from '$common/models/User';

    const user = getContext<Writable<User>>('user');
</script>

<svelte:head>
    <title>Dashboard - {PUBLIC_APP_NAME}</title>
    <meta
        name="description"
        content="Gagne du temps et reste informé grâce à notre tableau de bord intuitif qui te donne un aperçu rapide de tes tâches, projets et échéances.
        Inscris-toi et améliore ta productivité dès aujourd'hui !"
    />
</svelte:head>

<main class="relative w-full h-full px-5 flex flex-col gap-5">
    <h1 class="text-2xl font-semibold dark:text-neutral-50">Content de te revoir, {$user.firstName} !</h1>
</main>
