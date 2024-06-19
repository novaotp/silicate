import { twMerge } from 'tailwind-merge';
import clsx from 'clsx';

export const cn = (...classLists: string[]) => {
    return twMerge(clsx(classLists));
};
