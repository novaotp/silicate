"use client";

// Next
import Link from "next/link";

// Internal
import styles from "./index.module.scss";

/** The {@link AlternativeLink}'s props. */
interface AlternativeLinkProps {
    /** The displayed text. */
    text: string;
    /** The href of the hyperlink. */
    href: string;
    /** The text of the hyperlink. */
    label: string;
}

/** Returns a text with a redirecting hyperlink. */
export const AlternativeLink = ({
    text,
    href,
    label,
}: AlternativeLinkProps): JSX.Element => {
    return (
        <div className='relative flex text-xs text-gray-500'>
            <p>{text}</p>
            &nbsp;
            <Link className='text-purple-900 underline' href={href}>
                {label}
            </Link>
        </div>
    );
};
