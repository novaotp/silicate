import type { ComponentType } from 'svelte';

export { default as Account } from './account/Account.svelte';
export { default as Billing } from './Billing.svelte';

export type Tab = {
    icon: ComponentType;
    label: string;
    description: string;
    slug: string;
    component: ComponentType;
};
