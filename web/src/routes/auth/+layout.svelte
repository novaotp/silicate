<script lang="ts">
    import { PUBLIC_APP_NAME } from "$env/static/public";
</script>

<div class="relative h-full w-full flex flex-col lg:flex-row">
    <header class="relative w-full h-[30%] lg:h-full px-[10%] lg:px-0 flex flex-col justify-center lg:items-center bg-stone-300">
        <h1 class="text-2xl">Bienvenue sur {PUBLIC_APP_NAME}</h1>
        <a href="/" class="relative w-[200px] h-[100px]">
            <img src="/logos/SilicateLogo.png" alt="Silicate Logo" width={200} height={100} />
        </a>
    </header>
    <main class="relative flex h-[70%] lg:h-full w-full flex-col items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)] lg:shadow-none">
        <slot />
    </main>
</div>
