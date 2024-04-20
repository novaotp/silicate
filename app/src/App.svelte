<script lang="ts">
    import Router, { push, querystring } from 'svelte-spa-router';
    import { routes } from './router';
    import ToastContainer from '$lib/components/Toast/Container.svelte';
    import Cookies from "js-cookie";
    import type { ApiResponse } from '$libs/types/ApiResponse';
    import { env } from './lib/utils/env';
    import { onMount } from 'svelte';

    console.log($querystring);

    onMount(async () => {
        if (!Cookies.get("id")) {
            return;
        }
        
        const response = await fetch(`${env.VITE_API_URL}/auth/validate`, {
			method: "POST",
			body: JSON.stringify({
                jwt: Cookies.get("id")
            }),
			headers: {
				"content-type": "application/json"
			}
		});
		const { success }: ApiResponse = await response.json();

		if (!success) {
			Cookies.remove("id");
			return;
		}

        push("/app");
    })
</script>

<Router {routes} />
<ToastContainer />
