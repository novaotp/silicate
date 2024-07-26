import { writable } from "svelte/store";
import { v4 } from "uuid";

interface Toast {
    id: string,
    type: "success" | "error" | "info",
    message: string
}

type ToastData = Omit<Toast, 'id'>;

export const toasts = writable<Toast[]>([]);

/** Adds a new toast to the stack. */
export const addToast = (toast: ToastData) => {
    const id = v4();

    // Push the toast to the top of the list of toasts
    toasts.update((all) => [...all, { id, ...toast }]);

    setTimeout(() => {
        dismissToast(id)
    }, 3000);
};

/** Removes a toast from the stack. */
export const dismissToast = (id: string) => {
    toasts.update((all) => all.filter((toast) => toast.id !== id));
};
