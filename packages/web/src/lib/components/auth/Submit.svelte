<script lang="ts">
    import { Button } from "$lib/ui";

    export let label: string;
</script>

<Button.Normal type="submit">
    {label}
</Button.Normal>
