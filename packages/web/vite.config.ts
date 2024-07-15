import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
    optimizeDeps: {
        exclude: [
            "@tabler/icons-svelte",
            "@floating-ui/dom",
            "tailwind-merge",
            "clsx",
            "bits-ui",
            "lucide-svelte",
            "socket.io-client",
            "devalue"
        ]
    }
});
