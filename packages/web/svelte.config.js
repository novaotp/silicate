import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter(),
		alias: {
			'$libs': '../libs',
            '$utils': './src/lib/utils',
            '$components': './src/lib/components',
            '$types': './src/types'
		}
	}
};

export default config;
