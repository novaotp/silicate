"use client";

interface TextInput {
    label: string;
    name: string;
    placeholder: string;
    defaultValue: string;
}

export const TextInput = ({
    label,
    name,
    placeholder,
    defaultValue,
}: TextInput) => {
    return (
        <div className='relative mb-5 flex h-[50px] w-full flex-col last-of-type:mb-0'>
            <label
                htmlFor={name}
                className='absolute -top-2 left-5 z-[2] h-4 bg-white px-1 text-xs text-gray-500'
            >
                {label}
            </label>
            <input
                type='text'
                placeholder={placeholder}
                name={name}
                defaultValue={defaultValue}
                className='relative h-full w-full rounded-md border border-gray-400 px-6 text-[14px]'
            />
        </div>
    );
};
