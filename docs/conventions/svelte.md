# Svelte Conventions

This convention serves as a guide for best practices, emphasizing on readability and maintainability.

## Svelte File Order

1. Imports are declared.
2. Properties are declared/declared.
3. Contexts are received.
4. Internal variables are initialized/declared.
5. Reactive variables are initialized.
6. Lifecycle functions are called.
7. Internal function are declared.

### Imports

1. First import 3rd party modules.
2. Then import 1st party modules.
3. Repeat 1 and 2 for typed imports.

## Example

```ts
<script lang="ts">
    import { page } from '$app/stores';
    import MyComponent from './MyComponent.svelte';
    import type { Writable } from 'svelte/store';
    import type { MyType } from './my-types';

    export let initialValue: number | undefined;

    const elements = getContext<Writable<MyType[]>>('my-types');

    let counter: number = initialValue ?? 0;

    $: console.log(counter);

    onMount(() => {
        alert(`Initial value : ${initialValue}`);
    });

    const increment = () => {
        counter += 1;
    }
</script>

<button on:click={increment}>
    Increment value by 1
</button>
```
