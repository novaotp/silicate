<script lang="ts">
	import Title from './Title.svelte';
	import Content from './Content.svelte';
	import Settings from './settings/Settings.svelte';

    export let showSettings: boolean;
</script>

<Title />
<Content />

{#if showSettings}
    <Settings bind:showSettings />
{/if}
