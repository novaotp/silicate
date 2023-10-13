
"use client";

// MUI Icons
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

// Next
import Image from 'next/image';

// Internal
import SilicateLogo from '@public/SilicateAppIconBlackHorizontal.png';
import styles from './index.module.scss';

interface HeaderProps {
  closeNav: () => void;
}

/** The app navigation's header. */
const Header = ({ closeNav }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <button className={styles.button} onClick={closeNav}>
        <CloseRoundedIcon />
      </button>
      <Image
        src={SilicateLogo}
        alt="Silicate Logo"
        height={60}
      />
    </div>
  )
}

export default Header;
