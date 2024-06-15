declare global {
    namespace Express {
        interface Response {
            /**
             * Convenient helper for sending a 200 success response with custom data (optional).
             * @param message The message to send along.
             * @param data The custom data to send along (optional).
             */
            success(message: string, data?: unknown): void;
            /**
             * Convenient helper for sending a 404 not found error.
             * @param message The message to send along.
             */
            notFoundError(message: string): void;
            /** Convenient helper for sending a 500 server error with message "Internal Server Error". */
            serverError(): void;
        }
    }
}

export {};
