import { ChildrenProps } from "@/types/interfaces";

export const Main = ({ children }: ChildrenProps) => {
    return (
        <main className='relative flex h-[70%] w-full flex-col items-center justify-center shadow-[0_0_10px_rgba(0,0,0,0.5)]'>
            {children}
        </main>
    );
};
