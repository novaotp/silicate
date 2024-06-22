<script lang="ts">
    import { goto } from "$app/navigation";
    import { Button } from "$lib/ui";
</script>

<div class="relative h-full w-full max-w-[1080px] mx-auto flex flex-col">
    <nav class="relative w-full h-20 flex justify-between px-5 md:p-0 items-center">
        <a href="/">Chalarí</a>
        <div class="flex gap-5">
            <Button.Normal variant="secondary" size="small" on:click={() => goto("/login")}>
                Connexion
            </Button.Normal>
            <Button.Normal variant="primary" size="small" on:click={() => goto("/register")}>
                S'inscrire
            </Button.Normal>
        </div>
    </nav>
    <div class="relative flex-grow max-w-[1080px] h-[calc(100%-80px)] p-5 md:p-0 md:h-full flex flex-col justify-center items-center">
        <slot />
    </div>
</div>
