"use client";

import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";

import { useTheme } from "next-themes";

/** Renders a button to change the theme of the app. */
export const ChangeTheme = () => {
    const { theme, setTheme } = useTheme();

    const handleChange = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <li
            className='relative flex h-[50px] w-full items-center justify-center
                       border-x border-t border-gray-400 first-of-type:rounded-t-md
                       last-of-type:rounded-b-md last-of-type:border-b'
        >
            <button
                onClick={handleChange}
                className='relative flex h-full w-full items-center justify-start px-5'
            >
                {theme === "light" ? (
                    <LightModeRoundedIcon />
                ) : (
                    <DarkModeRoundedIcon />
                )}
                &nbsp;&nbsp;&nbsp;&nbsp;
                <p>Apparence</p>
            </button>
        </li>
    );
};
