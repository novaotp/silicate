// MUI Icons
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';

// React / Next
import Link from "next/link";
import { useState } from "react";

// Internal
import NavMenuLinkProps from "../interfaces";
import styles from './index.module.scss';

interface RecursiveLinkProps {
  link: NavMenuLinkProps;
  setParentHeight?: any;
  closeNav: () => void;
  level?: number;
}

export default function RecursiveLink({ link, closeNav, level = 1 }: RecursiveLinkProps) {
  const { href, label, subLinks } = link;
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  return (
    <li className={styles.li}>
      <span className={styles.linkWrapper}>
        <Link className={styles.link} onClick={closeNav} href={href}>{label}</Link>
        {subLinks && <button className={`${styles.toggleBtn} ${isOpen ? styles.openButton : ""}`} onClick={toggleOpen}><KeyboardArrowDownSharpIcon /></button>}
      </span>
      {
        subLinks && (
          <ul className={`${styles.nestedUl} ${isOpen ? styles.openNestedUl : ""}`}>
            {subLinks.map((subLink) => <RecursiveLink key={subLink.href} link={subLink} closeNav={closeNav} level={level + 1} />)}
          </ul>
        )
      }
    </li>
  );
}