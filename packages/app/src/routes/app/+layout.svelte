<script lang="ts">
    import Navigation from "$lib/components/Navbar/Navigation.svelte";
    import { addToast } from '$lib/stores/toast';
    import { onMount } from 'svelte';
    import { page } from "$app/stores"
    import { kv } from "$lib/utils/kv";
    import { goto } from "$app/navigation";

    onMount(async () => {
        if ($page.url.pathname.startsWith("/app") && !(await kv.get("id"))) {
            addToast({ type: "info", message: "Connectez-vous pour utiliser l'application." });
            goto("/login");
        }
    });
</script>

<div class="relative h-full w-full flex flex-col md:flex-row">
    <Navigation />
    <div class="relative w-full h-[calc(100%-60px)] md:h-full flex flex-col">
        <slot />
    </div>
</div>
