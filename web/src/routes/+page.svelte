<svelte:head>
    <title>Home - Silicate</title>
</svelte:head>

<main class="relative flex h-full w-full flex-col justify-center bg-white p-8 gap-5">
    <h1 class="text-5xl font-extrabold text-primary-600">Silicate</h1>
    <h2 class="text-xl font-semibold text-primary-900">L'appli pour gérer ta vie scolaire facilement</h2>
    <p class="text-justify text-neutral-500">
        Tu es étudiant et submergé par les devoirs, les cours et les dates limites ? Pas de soucis ! Avec Silicate, organise-toi en un clin d'œil et
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
</main>
