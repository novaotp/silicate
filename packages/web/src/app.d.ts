declare global {
	namespace App {
		// interface Error {}
		interface Locals {
            /** @description The value is always set once in the app. */
            jwt: string | undefined
        }
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

export {};
