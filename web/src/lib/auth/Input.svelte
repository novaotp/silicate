<script lang="ts">
    export let type: "text" | "email" | "password";
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

<div class='relative mb-[10px] flex w-full flex-col last-of-type:mb-0'>
    <label for={name}>
        {label}
        <input
            {...{ type }}
            {placeholder}
            {name}
            bind:value
            class='relative h-[50px] w-full rounded-md border border-gray-400 px-[10px] text-[14px]'
            autoComplete='off'
            required={true}
        />
    </label>
</div>
