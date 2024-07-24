<script lang="ts">
    import '../app.css';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { Preferences } from '@capacitor/preferences';
	import { ToastContainer } from '$features/toast-notifications';
	import { page } from '$app/stores';

    const PUBLIC_ROUTES = ["/login", "/register", "logout"];

    onMount(async () => {
        const tokenPreference = await Preferences.get({ key: "token" });
        
        if (PUBLIC_ROUTES.includes($page.url.pathname)) return;

        if (!tokenPreference.value) {
            goto("/login");
        }
    });
</script>

<ToastContainer />
<slot />
