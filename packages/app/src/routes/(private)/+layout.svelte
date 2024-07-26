<script lang="ts">
	import { PUBLIC_BACKEND_URL } from '$env/static/public';
	import { Navigation } from '$features/app/navigation';
	import { getPreference } from '$utils/capacitor-preferences';
	import ContextProvider from './ContextProvider.svelte';
	import type { User } from '$common/models/user';
	import type { ApiResponseWithData } from '$common/types/api-response';

    const getUser = async () => {
        const token = await getPreference<{ jwt: string, expires: Date }>('token', { parse: true });
        console.log(token)

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
            <div class="relative h-full w-full flex flex-col md:flex-row dark:bg-neutral-950">
                <Navigation />
                <slot />
            </div>
        </ContextProvider>
    {:else}
        <p>Something went wrong !</p>
    {/if}
{:catch error}
    <p>Something went wrong ! Error : {error}</p>
{/await}
