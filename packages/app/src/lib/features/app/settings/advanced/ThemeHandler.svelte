<script lang="ts">
    import { switchTheme, theme, type Theme } from "$stores/theme";
	import { Label, Select } from "$ui/forms";

    const themeOptions = [
        { value: "light", label: "Clair" },
        { value: "dark", label: "Sombre" },
        { value: "system", label: "Système" }
    ];

    const onThemeChange = (event: CustomEvent<string>) => switchTheme(event.detail as Theme);
</script>

<div class="relative w-full flex justify-between items-center h-[50px] gap-[10px]">
    <Label>Changer de thème.</Label>
    <Select items={themeOptions} on:change={onThemeChange}>
        {themeOptions.find(t => t.value === $theme)?.label}
    </Select>
</div>
