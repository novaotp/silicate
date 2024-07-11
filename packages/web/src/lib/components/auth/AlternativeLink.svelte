<script lang="ts">
    export let text: string;
    export let href: string;
    export let label: string;
</script>

<div class="relative flex text-xs text-neutral-500 dark:text-neutral-300">
    <p>{text}</p>
    &nbsp;
    <a class="text-primary-500 dark:text-primary-400 underline" {href}>
        {label}
    </a>
</div>
