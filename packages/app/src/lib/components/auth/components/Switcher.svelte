<script lang="ts">
    import Submit from './Submit.svelte';

    let isToggled: boolean = false;
</script>

<div class="switcher {isToggled ? 'active' : ''}">
    <div class="wrapper">
        <div class="flex flex-col gap-5">
            <slot name="names" />
        </div>
        <button
            class="relative px-4 py-2 flex justify-center items-center rounded-lg text-sm mb-[60px] bg-primary-600 text-primary-50"
            type="button"
            on:click={() => (isToggled = true)}
        >
            Continuer
        </button>
    </div>
    <div class="wrapper">
        <div class="flex flex-col gap-5">
            <slot name="credentials" />
        </div>
        <button
            class="relative px-4 py-2 flex justify-center items-center rounded-lg text-sm border border-primary-600 bg-primary-50 text-primary-600"
            type="button"
            on:click={() => {
                isToggled = false;
            }}
        >
            Revenir
        </button>
        <Submit label="Créer mon compte" />
    </div>
</div>

<style>
    .switcher {
        position: relative;
        width: 200%;
        display: flex;
        translate: 0 0;
        transition: 200ms ease-in-out;
    }

    .switcher.active {
        translate: calc(-1 * (50% + 10px)) 0;
    }

    .wrapper {
        position: relative;
        width: calc(50% - 10px);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: column;
        gap: 20px;
        padding: 0 5px;
    }

    .wrapper:first-of-type {
        margin-right: 20px;
    }
</style>
