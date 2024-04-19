import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { internalIpV4 } from "internal-ip";

// process is a nodejs global
const mobile = !!/android|ios/.exec(process.env.TAURI_ENV_PLATFORM);

export default defineConfig(async () => {
    const hostIp = await internalIpV4();

    return {
        plugins: [svelte()],
        clearScreen: false,
        server: {
            port: 1420,
            strictPort: true,
            host: mobile ? "0.0.0.0" : false,
            hmr: mobile
                ? {
                    protocol: "ws",
                    host: hostIp,
                    port: 1421,
                }
                : undefined,
            watch: {
                ignored: ["./src-tauri/**"],
            }
        },
        resolve: {
            alias: [
                { find: '$', replacement: fileURLToPath(new URL('./src', import.meta.url)) },
                { find: '$lib', replacement: fileURLToPath(new URL('./src/lib', import.meta.url)) },
                { find: '$libs', replacement: fileURLToPath(new URL('../libs', import.meta.url)) },
            ]
        }
    }
});
