import { get, writable } from "svelte/store";

const THEMES = ["light", "dark", "system"] as const;
export type Theme = typeof THEMES[number];

export const theme = writable<Theme>("light");

/**
 * Initializes the theme store.
 * @description Use before accessing the theme store.
 */
export const initTheme = () => {
    if (!("theme" in localStorage)) {
        theme.set("system");
    } else if (localStorage.theme === "dark") {
        theme.set("dark");
    } else {
        theme.set("light");
    }
}

export const switchTheme = (newTheme: Theme) => {
    // Ensure it never switches to a non-existent theme
    if (!THEMES.includes(newTheme)) {
        throw new Error(`Cannot switch to non-existent theme value : ${newTheme}`);
    }

    if (get(theme) === newTheme) return;

    theme.set(newTheme);

    if (get(theme) === 'dark' || (get(theme) === "system" && prefersDarkMode())) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }

    if (get(theme) !== 'system') {
        localStorage.theme = get(theme);
    } else {
        localStorage.removeItem("theme");
    }
}

const prefersDarkMode = () => window.matchMedia('(prefers-color-scheme: dark)').matches;
