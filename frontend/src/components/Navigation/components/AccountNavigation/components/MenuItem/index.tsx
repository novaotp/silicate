
"use client";

// Next
import Link from "next/link";

// Internal
import styles from './index.module.scss';
import { poppins } from "@/core/fonts";

interface CommonProps {
  /** The text of the link or button. */
  text: string;
  /** An optional special color for the item's text. Defaults to black. */
  color?: string;
  /** An optional special background color for the item. Defaults to white. */
  backgroundColor?: string;
}

interface LinkProps extends CommonProps {
  /** The hyperlink to redirect to. */
  href: string;
}

interface ButtonProps extends CommonProps {
  /** A function on button click. */
  onClick: () => void;
}

type AccountLinkProps = LinkProps | ButtonProps;

/**
 * A custom component for the account navigation's menu.
 * 
 * Renders a :
 *    - link if the href is provided.
 *    - button if the onClick function is provided.
 */
const MenuItem = (props: AccountLinkProps): JSX.Element => {
  return (
    <li className={styles.listItem}>
      {"href" in props && <Link style={{
        backgroundColor: props.backgroundColor ? props.backgroundColor : "white",
        color: props.color ? props.color : "black",
      }} className={styles.inner} href={props.href}>{props.text}</Link>}
      {!("href" in props) && <button style={{
        backgroundColor: props.backgroundColor ? props.backgroundColor : "white",
        color: props.color ? props.color : "black",
      }} className={`${styles.button} ${styles.inner} ${poppins.className}`} onClick={props.onClick}>{props.text}</button>}
    </li>
  );
};

export default MenuItem;
