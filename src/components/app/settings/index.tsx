import { ChildrenProps } from "@/types/interfaces";
import { Item } from "./Item";
import { ChangeTheme } from "./prefabs/ChangeTheme";

interface BoxProps extends ChildrenProps {
    label: string;
}

/**
 * Renders a simple wrapper to separate settings categories.
 *
 * - Adds a label at the top of the box
 */
export const Box = ({ label, children }: BoxProps) => {
    return (
        <div className='relative mt-5 flex w-full flex-col'>
            <h2 className='relative mb-[10px]'>{label}</h2>
            <ul>{children}</ul>
        </div>
    );
};

Box.Item = Item;
Box.ChangeTheme = ChangeTheme;
