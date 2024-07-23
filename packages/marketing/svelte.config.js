import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
        alias: {
            "$components": "./src/lib/components",
            "$utils": "./src/lib/utils"
        }
	}
};

export default config;
