"use client";

import { type Dispatch, type SetStateAction } from "react";

interface InputProps {
    /** The type of the input. Defaults to `text`. */
    type?: "text" | "email" | "password";
    /** The label used for the input. */
    label: string;
    /** The input's placeholder. */
    placeholder: string;
    /** The controlled value. */
    value: string;
    /** The value's onChange handler. */
    setValue: Dispatch<SetStateAction<string>>;
}

/**
 * A custom controlled input field with a label on top.
 *
 * - Autocomplete : Off
 * - Required : True
 */
export const Input = ({
    type = "text",
    label,
    placeholder,
    value,
    setValue,
}: InputProps): JSX.Element => {
    const name = label.split(" ").join("-").toLowerCase();

    return (
        <div className='relative mb-[10px] flex w-full flex-col last-of-type:mb-0'>
            <label htmlFor={name}>{label}</label>
            <input
                type={type}
                className='relative h-[50px] w-full rounded-md border border-gray-400 px-[10px] text-[14px]'
                placeholder={placeholder}
                name={name}
                value={value}
                onChange={(event) => setValue(event.target.value)}
                autoComplete='off'
                required={true}
            />
        </div>
    );
};
