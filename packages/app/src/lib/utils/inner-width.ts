import { writable } from "svelte/store";

export const innerWidth = writable(window.innerWidth);

window.addEventListener('resize', () => {
    innerWidth.set(window.innerWidth);
});
