<script lang="ts">
    export let text: string;
    export let href: string;
    export let label: string;
</script>

<div class="relative flex text-xs text-neutral-500">
    <p>{text}</p>
    &nbsp;
    <a class="text-primary-500 underline" {href}>
        {label}
    </a>
</div>
