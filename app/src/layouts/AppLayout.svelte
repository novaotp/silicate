<script lang="ts">
    import Navigation from "$lib/components/Navbar/Navigation.svelte";
    import { location, push } from 'svelte-spa-router';
    import Cookies from 'js-cookie';
    import { addToast } from '$lib/stores/toast';
    import { onMount } from 'svelte';

    onMount(() => {
        if ($location.startsWith("/app") && !Cookies.get('id')) {
            addToast({ type: "info", message: "Connectez-vous pour utiliser l'application." });
            push("/auth/login");
        }
    });
</script>

<div class="relative h-full w-full flex flex-col md:flex-row">
    <Navigation />
    <div class="relative w-full h-[calc(100%-60px)] md:h-full flex flex-col">
        <slot />
    </div>
</div>
