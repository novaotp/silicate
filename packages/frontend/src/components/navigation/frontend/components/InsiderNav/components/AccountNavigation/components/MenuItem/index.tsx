
"use client";

// React + Next
import Link from "next/link";
import { type CSSProperties } from "react";

// Internal
import styles from './index.module.scss';
import { poppins } from "@/core/fonts";

interface MenuItemProps {
  /** An icon for the item. */
  icon: React.ReactNode;
  /** The text of the link or button. */
  text: string;
  /** An optional special color for the item's text. Defaults to black. */
  color?: string;
  /** An optional special background color for the item. Defaults to white. */
  backgroundColor?: string;
  /** The hyperlink to redirect to. If defined, creates a link. */
  href?: string;
  /** An optional function on click. Usable on both links and buttons. */
  onClick?: () => void;
  /** An optional children prop that puts it in the other side of the icon + text span. */
  children?: React.ReactNode;
}

/**
 * A custom component for the account navigation's menu.
 * 
 * Renders a :
 *    - link if the href is provided.
 *    - button if the onClick function is provided.
 */
const MenuItem = ({ icon, text, color, backgroundColor, href, onClick, children }: MenuItemProps): JSX.Element => {
  return (
    <li className={styles.listItem}>
      {href ?
        <ItemLink icon={icon} text={text} color={color} backgroundColor={backgroundColor} href={href} onClick={onClick} />
        :
        <ItemButton icon={icon} text={text} color={color} backgroundColor={backgroundColor} children={children} onClick={onClick} />
      }
    </li>
  );
};

interface ItemLinkProps extends Omit<MenuItemProps, 'children'> { }

/** A custom item link. */
const ItemLink = ({ icon, text, color, backgroundColor, href, onClick }: ItemLinkProps) => {
  const customCss: CSSProperties = {
    backgroundColor: backgroundColor ?? "white",
    color: color ?? "black",
  }

  return (
    <Link
      style={customCss}
      className={styles.inner}
      href={href ?? "#"}
      onClick={onClick}
    >
      {icon}{text}
    </Link>
  )
}

interface ItemButtonProps extends Omit<MenuItemProps, 'href'> { }

/** A custom item button. */
const ItemButton = ({ icon, text, color, backgroundColor, children, onClick }: ItemButtonProps) => {
  const customCss: CSSProperties = {
    backgroundColor: backgroundColor ?? "white",
    color: color ?? "black",
  }

  return (
    <button
      style={customCss}
      className={`${styles.inner} ${styles.button} ${poppins.className}`}
      onClick={onClick}
    >
      <span>{icon}{text}</span>
      <span>{children}</span>
    </button>
  )
}

export default MenuItem;
