declare global {
    interface FormData {
        /** A convenient helper to transform a form data's content to JSON. */
        toJSON(): Record<string, unknown>;
    }
}

export {};
