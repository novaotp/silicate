<script lang="ts">
	import Submit from './Submit.svelte';

	let isToggled: boolean = false;
</script>

<div class="switcher {isToggled ? 'active' : ''}">
	<div class="wrapper">
		<div>
			<slot name="names" />
		</div>
		<button
			class="relative w-full h-10 flex justify-center items-center border-none rounded-xl mb-[60px] bg-purple-600 text-white"
			type="button"
			on:click={() => {
				isToggled = true;
			}}
		>
			Continuer
		</button>
	</div>
	<div class="wrapper">
		<div>
			<slot name="credentials" />
		</div>
		<button
			class="relative w-full h-10 flex justify-center items-center border-none rounded-xl bg-gray-600 text-white"
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
			flex-direction: column;
            gap: 20px;
            padding: 0 5px;

			&:first-of-type {
				margin-right: $margin;
			}
		}
	}
</style>
