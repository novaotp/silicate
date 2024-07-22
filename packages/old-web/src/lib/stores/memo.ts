import { writable } from "svelte/store";

export const selectedMemoId = writable<number | null>(null);

export const setSelectedMemoId = (id: number | null) => {
    selectedMemoId.set(id);
};
