<script lang="ts">
    import { IconTag } from "@tabler/icons-svelte";
	import type { PageData } from "./$types";

    export let data: PageData;
</script>

{#if data.memo}
    {@const { tag, title, content, lastChange } = data.memo}
    <h1>{title}</h1>
    <p>{content}</p>
    <p>Dernière modification : {new Date(lastChange).toLocaleString("fr-CH")}</p>
{/if}
