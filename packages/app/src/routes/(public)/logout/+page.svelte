<script lang="ts">
	import { onMount } from "svelte";
	import { goto } from "$app/navigation";
	import { Preferences } from "@capacitor/preferences";

    onMount(async () => {
        await Preferences.remove({ key: "token" });
        return goto("/login");
    });
</script>
