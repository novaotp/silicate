// app/providers.jsx

"use client";

import { ChildrenProps } from "@/types/interfaces";
import { ThemeProvider as NextThemeProvider } from "next-themes";

export const ThemeProvider = ({ children }: ChildrenProps) => {
    return <NextThemeProvider attribute='class'>{children}</NextThemeProvider>;
};
