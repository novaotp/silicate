import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
    plugins: [sveltekit()],
    optimizeDeps: {
        exclude: [
            '@tabler/icons-svelte',
            '@floating-ui/dom',
            'tailwind-merge',
            'clsx',
            'bits-ui',
            'lucide-svelte',
            'socket.io-client',
            'devalue',
            '@sveltejs/vite-plugin-svelte',
            'svelte-easy-crop',
            '@tiptap/core',
            '@tiptap/extension-document',
            '@tiptap/extension-bullet-list',
            '@tiptap/extension-list-item',
            '@tiptap/extension-paragraph',
            '@tiptap/extension-text',
            '@tiptap/extension-bold',
            '@tiptap/extension-italic',
            '@tiptap/extension-strike',
            '@tiptap/extension-underline',
            '@tiptap/extension-heading',
            '@tiptap/extension-horizontal-rule',
            '@tiptap/extension-history',
            '@tiptap/extension-ordered-list',
            '@tiptap/extension-text-align'
        ]
    }
});
