<div class="relative h-full w-full flex flex-col">
    <header class="relative w-full h-[30%] px-[10%] flex flex-col justify-center bg-stone-300">
        <h1 class="text-2xl">Bienvenue sur Silicate</h1>
        <a href='/' class="relative w-[200px] h-[100px]">
            <img
                src="/logos/SilicateLogo.png"
                alt='Silicate Logo'
                width={200}
                height={100}
            />
        </a>
    </header>
	<main
		class="relative flex h-[70%] w-full flex-col items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]"
	>
        <slot />
	</main>
</div>
