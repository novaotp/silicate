<script lang="ts">
    import { goto } from "$app/navigation";
    import { PUBLIC_APP_NAME } from "$env/static/public";
    import { Button } from "$lib/ui";
</script>

<svelte:head>
    <title>Home - {PUBLIC_APP_NAME}</title>
    <meta
        name="description"
        content="Organise-toi efficacement, lutte contre la procrastination et atteins tes objectifs grâce à nos outils et fonctionnalités performants.
        Inscris-toi dès aujourd'hui et décolle vers la réussite !"
    />
</svelte:head>

<main class="relative flex h-full w-full flex-col md:flex-row mx-auto justify-center">
    <section class="relative flex-1 flex flex-col justify-center gap-5">
        <h1 class="text-5xl font-extrabold text-primary-600">{PUBLIC_APP_NAME}</h1>
        <h2 class="text-xl font-semibold text-primary-900">L'appli pour gérer ta vie scolaire facilement</h2>
        <p class="text-justify text-neutral-500">
            Tu es étudiant et submergé par les devoirs, les cours et les dates limites ? Pas de soucis ! Avec {PUBLIC_APP_NAME}, organise-toi en un clin d'œil et
            dis adieu au stress. C'est comme avoir un assistant perso pour ton école, mais en mieux !
        </p>
        <div class="relative flex flex-col gap-3 mt-8">
            <Button.Normal on:click={() => goto("/register")}>
                Inscris-toi
            </Button.Normal>
            <span
                class="separator relative text-center text-neutral-200"
            >
                ou
            </span>
            <Button.Normal variant="secondary" on:click={() => goto("/login")}>
                Se connecter
            </Button.Normal>
        </div>
    </section>
    <section class="hidden md:flex relative flex-1 flex-col justify-center gap-5">
        <!-- Put an image of the app. -->
    </section>
</main>

<style lang="postcss">
    .separator::before {
        @apply bg-neutral-200;
        content: "";
        position: absolute;
        left: 0;
        top: 50%;
        height: 1px;
        width: 40%;
    }

    .separator::after {
        @apply bg-neutral-200;
        content: "";
        position: absolute;
        right: 0;
        top: 50%;
        height: 1px;
        width: 40%;
    }
</style>
