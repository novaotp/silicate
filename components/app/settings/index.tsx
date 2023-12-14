
import { ChildrenProps } from "@/types/interfaces";
import { Item } from "./Item";

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
        <div className="relative w-full flex flex-col mt-5">
            <h2 className="relative mb-[10px]">{label}</h2>
            <ul>
                {children}
            </ul>
        </div>
    )
}

Box.Item = Item;
