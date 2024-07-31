declare global {
    namespace Express {
        interface Request {
            /**
             * The id of the user, retrieved from the `Authorization` header.
             * @description Is `null` if the JWT is `null` or invalid.
             */
            userId: string | null;
            /**
             * The JSON Web Token, retrieved from the `Authorization` header.
             * @description Is `null` if the header is `undefined`.
             */
            jwt: string | null;
        }
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
            /**
             * Convenient helper for sending a 422 unprocessable entity error.
             * @param message The message to send along.
             */
            unprocessableEntityError(message: string): void;
            /** Convenient helper for sending a 500 server error with message "Internal Server Error". */
            serverError(): void;
        }
    }
}

export {};
