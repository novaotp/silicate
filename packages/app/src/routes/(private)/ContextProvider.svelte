<script lang="ts">
    import { setContext } from "svelte";
	import { writable } from "svelte/store";
	import type { User } from "$common/models/User";

    export let user: User;

    setContext("user", writable<User>(user));
</script>

<slot />
