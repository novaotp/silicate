<script lang="ts">
    import { switchTheme, theme, type Theme } from "$lib/stores/theme";
    import Select from "$lib/ui/Select.svelte";

    const themeOptions = [
        { value: "light", label: "Clair" },
        { value: "dark", label: "Sombre" },
        { value: "system", label: "Système" }
    ];

    const onThemeChange = (event: CustomEvent<string>) => switchTheme(event.detail as Theme);
</script>

<div class="relative w-full flex justify-between items-center h-[50px] gap-[10px]">
    <span class="text-neutral-500 text-sm dark:text-neutral-50">Changer de thème.</span>
    <Select items={themeOptions} on:change={onThemeChange} invert>
        {themeOptions.find(t => t.value === $theme)?.label}
    </Select>
</div>
