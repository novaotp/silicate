<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    import { fade, fly } from 'svelte/transition';
    import FullScreen from '../../../shared/FullScreen.svelte';

    export let label: string;
    export let value: string;
    export let values: string[];

    const dispatch = createEventDispatcher();

    let holdVal: string = value;

    let inputSelected: boolean = false;

    export let isOpen: boolean = false;

    export let acceptOther: boolean = false;
    let inputVal: string = values.includes(value) ? "" : value;

    let showEmptyInputWarning: boolean = false;
</script>

<!--
@component

Displays a row including a label and the currently selected value.

By cliking on the selected value, a submenu will open to choose from.

Optional functionalities :
* accepts an `on:open` event (to close other menus for example)
* offers a binding for whether the menu is open or not
* an `acceptOther` option tied to an input

Usage :

```svelte
    <script lang="ts">
        let values = ["Low", "Medium", "High"];
        let value = values.at(0);
    </script>

    <Selector
        label="priority"
        bind:value
        {values}
        on:open={() => {
            // Close other menus for example
        }}
    />
```

-->

<div class="relative w-full flex justify-between items-center">
    <span>{label}</span>
    <button
        class="relative px-3 py-2 bg-gray-200 rounded-lg text-sm"
        on:click={() => {
            dispatch('open');
            isOpen = true;
        }}
    >
        {value}
    </button>
</div>
{#if isOpen}
    <FullScreen>
        <div class="relative w-full flex flex-col bg-white rounded-t-3xl shadow-2xl p-5 gap-2" transition:fly={{ y: 100 }}>
            {#each values as v}
                <button
                    class="relative w-full h-10 rounded-lg {holdVal === v && !inputSelected ? 'bg-gray-200' : 'bg-transparent'} rounded-lg"
                    on:click={() => {
                        holdVal = v;
                        inputSelected = false;
                    }}
                >
                    {v}
                </button>
            {/each}
            {#if acceptOther}
                <button on:click={() => (inputSelected = true)} class="relative rounded-lg flex justify-between items-center h-10 w-full {inputSelected ? 'bg-gray-200' : 'bg-transparent'}">
                    <span class="relative w-20 h-full flex justify-center items-center">Autre</span>
                    <input on:keyup={() => (inputSelected = true)} bind:value={inputVal} placeholder="Catégorie..." class="relative rounded-r-lg h-full w-[calc(100%-5rem)] {inputSelected ? 'bg-gray-200' : 'bg-transparent'}" required={inputSelected && inputVal === ""} />
                </button>
                <p class="{showEmptyInputWarning ? "flex" : "hidden"} text-red-500 text-xs">Si vous choisissez "Autre", vous devez entrer une valeur.</p>
            {/if}
            <button
                class="relative w-full h-10 bg-blue-500 rounded-lg text-white"
                on:click={() => {
                    if (inputSelected && inputVal === "") {
                        showEmptyInputWarning = true;
                    } else {
                        value = inputSelected ? inputVal : holdVal;
                        isOpen = false;
                        showEmptyInputWarning = false;
                    }
                }}
            >
                Appliquer
            </button>
        </div>
    </FullScreen>
{/if}
