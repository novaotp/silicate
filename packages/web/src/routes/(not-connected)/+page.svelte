<script lang="ts">
    import { PUBLIC_APP_NAME } from "$env/static/public";
</script>

<svelte:head>
    <title>Home - {PUBLIC_APP_NAME}</title>
    <meta
        name="description"
        content="Organise-toi efficacement, lutte contre la procrastination et atteins tes objectifs grâce à nos outils et fonctionnalités performants.
        Inscris-toi dès aujourd'hui et décolle vers la réussite !"
    />
</svelte:head>

<div class="bg-image fixed left-0 top-0 h-full w-full"></div>
<main class="relative flex h-full w-full flex-col md:flex-row mx-auto justify-center">
    <section class="relative flex-1 flex flex-col justify-center gap-5">
        <h1 class="text-5xl font-extrabold text-primary-600">{PUBLIC_APP_NAME}</h1>
        <h2 class="text-xl font-semibold text-primary-900">L'appli pour gérer ta vie scolaire facilement</h2>
        <p class="text-justify text-neutral-500">
            Tu es étudiant et submergé par les devoirs, les cours et les dates limites ? Pas de soucis ! Avec {PUBLIC_APP_NAME}, organise-toi en un clin d'œil et
            dis adieu au stress. C'est comme avoir un assistant perso pour ton école, mais en mieux !
        </p>
        <div class="relative flex flex-col gap-3 mt-8">
            <a class="relative w-full rounded-lg p-3 text-center bg-primary-600 text-primary-50" href="/auth/register"> Inscris-toi </a>
            <span
                class="relative text-center text-neutral-200
                    before:absolute before:left-0 before:top-1/2 before:h-[1px] before:w-2/5 before:bg-neutral-200 before:content-['']
                    after:absolute after:right-0 after:top-1/2 after:h-[1px] after:w-2/5 after:bg-neutral-200 after:content-['']"
            >
                ou
            </span>
            <a class="relative w-full rounded-lg bg-bg-color p-3 text-center bg-primary-50 text-primary-600 border border-primary-600" href="/auth/login">
                Se connecter
            </a>
        </div>
    </section>
    <section class="hidden md:flex relative flex-1 flex-col justify-center gap-5">
        <!-- Put an image of the app. -->
    </section>
</main>

<style lang="postcss">
    .bg-image {
        background-image: url("/bg.jpg");
        filter: blur(4px);
        z-index: -1;
    }
</style>
