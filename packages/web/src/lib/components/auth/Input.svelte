<script lang="ts">
    export let type: 'text' | 'email' | 'password';
    export let label: string;
    export let placeholder: string;
    export let name: string;
    export let value: string;
</script>

<!--
@component

A custom controlled input field with a label on top.

* Autocomplete : Off
* Required : True
-->

<div class="relative flex w-full flex-col gap-[10px]">
    <label for={name} class="text-neutral-500">
        {label}
    </label>
    <input
        {...{ type }}
        {placeholder}
        {name}
        bind:value
        class="relative h-[50px] w-full rounded-md bg-neutral-100 text-neutral-950 px-5 text-sm"
        autoComplete="off"
        required={true}
    />
</div>
