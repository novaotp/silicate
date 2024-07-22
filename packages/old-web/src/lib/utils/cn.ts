import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';

export const cn = (...classLists: ClassValue[]) => {
    return twMerge(clsx(classLists));
};
