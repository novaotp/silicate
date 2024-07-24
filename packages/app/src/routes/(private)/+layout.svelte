<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { Preferences } from '@capacitor/preferences';
	import ContextProvider from './ContextProvider.svelte';
	import type { User } from '$common/models/User';
	import type { ApiResponseWithData } from '$common/types/api-response';
	import { Navigation } from '$features/app/navigation';

    const getUser = async () => {
        const tokenPreference = await Preferences.get({ key: "token" });
        const token: { jwt: string, expires: Date } = JSON.parse(tokenPreference.value!);

        const response = await fetch(`${PUBLIC_BACKEND_URL}/api/v1/me`, {
            method: "GET",
            headers: {
                "authorization": `Bearer ${token.jwt}`
            }
        });

        const result: ApiResponseWithData<User> = await response.json();

        return result.success ? result.data : undefined;
    }
</script>

{#await getUser() then user}
    {#if user}
        <ContextProvider {user}>
            <Navigation />
            <slot />
        </ContextProvider>
    {:else}
        <p>Something went wrong !</p>
    {/if}
{:catch error}
    <p>Something went wrong ! Error : {error}</p>
{/await}
