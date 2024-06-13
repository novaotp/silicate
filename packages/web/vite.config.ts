import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vitest/config';

export default defineConfig({
	plugins: [sveltekit()],
    optimizeDeps: {
        exclude: ["@tabler/icons-svelte"]
    }
});
