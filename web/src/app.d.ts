// See https://kit.svelte.dev/docs/types#app

import type { User } from "../../libs/models/User";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
		interface Locals {
			user?: User
		}
	}
}

export {};
