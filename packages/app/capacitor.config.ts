import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'ch.chalari',
    appName: 'Chalarí',
    webDir: 'build',
    plugins: {
        CapacitorCookies: {
            enabled: true,
        },
    }
};

export default config;
