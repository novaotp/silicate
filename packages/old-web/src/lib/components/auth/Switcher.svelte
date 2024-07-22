<script lang="ts">
    import { Button } from "$lib/ui";

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
        <Button.Normal type="submit">
            Créer mon compte
        </Button.Normal>
    </div>
</div>

<style lang="scss">
    $margin: 20px;
    $wrapper-width: calc(50% - ($margin / 2));

    .switcher {
        position: relative;
        width: 200%;
        display: flex;
        translate: 0 0;
        transition: 200ms ease-in-out;

        &.active {
            translate: calc(-1 * ($wrapper-width + $margin)) 0;
        }

        .wrapper {
            position: relative;
            width: $wrapper-width;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-direction: column;
            gap: 20px;
            padding: 0 5px;

            &:first-of-type {
                margin-right: $margin;
            }
        }
    }
</style>
