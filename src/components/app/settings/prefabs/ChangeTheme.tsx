
"use client";

import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import DarkModeRoundedIcon from '@mui/icons-material/DarkModeRounded';

import { useTheme } from 'next-themes';

/** Renders a button to change the theme of the app. */
export const ChangeTheme = () => {
    const { theme, setTheme } = useTheme();
    
    const handleChange = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    }

    return (
        <li className="relative w-full h-[50px] flex justify-center items-center
                       border-t border-x border-gray-400 last-of-type:border-b
                       first-of-type:rounded-t-md last-of-type:rounded-b-md"
        >
            <button onClick={handleChange} className="relative w-full h-full px-5 flex justify-start items-center">
                { theme === "light" ? <LightModeRoundedIcon /> : <DarkModeRoundedIcon /> }
                &nbsp;&nbsp;&nbsp;&nbsp;
                <p>Apparence</p>
            </button>
        </li>
    )
}
