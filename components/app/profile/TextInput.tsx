
"use client";

interface TextInput {
    label: string;
    name: string;
    placeholder: string;
    defaultValue: string;
}

export const TextInput = ({ label, name, placeholder, defaultValue }: TextInput) => {
    return (
        <div className="relative w-full h-[50px] flex flex-col mb-5 last-of-type:mb-0">
            <label
                htmlFor={name}
                className="absolute h-4 -top-2 left-5 z-[2] text-xs bg-white px-1 text-gray-500"
            >
                {label}
            </label>
            <input
                type="text"
                placeholder={placeholder}
                name={name}
                defaultValue={defaultValue}
                className="relative w-full h-full px-6 rounded-md border border-gray-400 text-[14px]"
            />
        </div>
    )
}
