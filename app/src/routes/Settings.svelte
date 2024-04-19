<script lang="ts">
    import AppLayout from "$/layouts/AppLayout.svelte";
    import { env } from '$/utils/env';
    import { Button } from '$lib/ui';
    import { push } from 'svelte-spa-router';
    import Cookies from "js-cookie";

    function disconnect() {
        Cookies.remove("id");
        push('/auth/login');
    }
</script>

<svelte:head>
    <title>Paramètres - {env.VITE_APP_NAME}</title>
    <meta
        name="description"
        content="Prends le contrôle de ton expérience et configure tes paramètres pour une utilisation optimale.
        Inscris-toi et gère ta vie étudiante comme un pro !"
    />
</svelte:head>

<AppLayout>
    <main class="relative w-full h-full flex flex-col justify-center items-center">
        <Button.Danger variant="primary" on:click={disconnect}>Déconnexion</Button.Danger>
    </main>
</AppLayout>
