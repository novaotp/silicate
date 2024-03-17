<script lang="ts">
    export let order: string;
</script>

<div class="flex flex-col gap-2">
    <h2>Ordre</h2>
    <div
        class="relative w-full grid grid-cols-2 p-[2px] overflow-hidden rounded-lg gap-[2px] bg-gray-500
            [&>*:nth-child(1)]:rounded-l-md [&>*:nth-child(2)]:rounded-r-md"
    >
        <label
            class="relative text-center h-10 text-sm flex justify-center items-center flex-grow border-gray-500 {order ===
            'due-asc'
                ? `bg-gray-500 text-white`
                : `text-gray-500 bg-white`} cursor-pointer
                "
        >
            <input
                class="invisible"
                value="due-asc"
                bind:group={order}
                checked={order === 'due-asc'}
                type="radio"
            />
            <span class="pr-2">Échéance (asc.)</span>
        </label>
        <label
            class="relative text-center h-10 text-sm flex justify-center items-center flex-grow border-gray-500 {order ===
            'due-desc'
                ? `bg-gray-500 text-white`
                : `text-gray-500 bg-white`} cursor-pointer
                "
        >
            <input
                class="invisible"
                value="due-desc"
                bind:group={order}
                checked={order === 'due-desc'}
                type="radio"
            />
            <span class="pr-2">Échéance (desc.)</span>
        </label>
    </div>
</div>
