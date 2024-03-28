<script lang="ts">
    /** All the possible values. */
    export let values: string[];
    /** The selected options. */
    export let selected: string[];
    /** The master color in the hex format. */
    export let color: string;
</script>

<!--
@component

A composable panel of options allowing for multi-selection.

Only works for 4 elements.

You need to pass :
* an array of all the possible values
* an array that contains the selected options
* a master color in the hex format

-->

<div
    style="background-color: {color}"
    class="relative w-full grid grid-cols-2 p-[2px] overflow-hidden rounded-lg gap-[2px]
            [&>*:nth-child(1)]:rounded-tl-md [&>*:nth-child(2)]:rounded-tr-md [&>*:nth-child(3)]:rounded-bl-md [&>*:nth-child(4)]:rounded-br-md"
>
    {#each values as value}
        <label
            style="border-color: {color}; {selected.includes(value)
                ? `background-color: ${color}`
                : `color: ${color}`}"
            class="relative text-center h-10 text-sm flex justify-center items-center flex-grow {selected.includes(
                value
            )
                ? `bg-[${color}] text-white`
                : `text-[${color}] bg-white`} cursor-pointer
                "
        >
            <input
                class="invisible"
                {value}
                bind:group={selected}
                checked={selected.includes(value)}
                type="checkbox"
                multiple
            />
            <span class="pr-2">{value}</span>
        </label>
    {/each}
</div>
