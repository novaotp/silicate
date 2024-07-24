import MemoIcon from '@tabler/icons-svelte/icons/note';
import GradeIcon from '@tabler/icons-svelte/icons/stars';
import IconHome from '@tabler/icons-svelte/icons/home';
import TaskIcon from '@tabler/icons-svelte/icons/checklist';
import IconTool from '@tabler/icons-svelte/icons/tool';
import type { ComponentType } from 'svelte';

type NavigationItem = {
    href: string,
    label: string,
    icon: ComponentType
}

export const navigationItems: NavigationItem[] = [
    {
        href: "/",
        label: "Dashboard",
        icon: IconHome
    },
    {
        href: "/memos",
        label: "Mémos",
        icon: MemoIcon
    },
    {
        href: "/tasks",
        label: "Tâches",
        icon: TaskIcon
    },
    {
        href: "/mark-books",
        label: "Carnets de notes",
        icon: GradeIcon
    },
    {
        href: "/tools",
        label: "Outils pédagogiques",
        icon: IconTool
    }
];
