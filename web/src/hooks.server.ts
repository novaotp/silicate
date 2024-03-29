import type { Handle } from '@sveltejs/kit';

// This allows us to use localhost instead of 127.0.0.1 for undici fetch.
// https://stackoverflow.com/a/76552326
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	return response;
};
