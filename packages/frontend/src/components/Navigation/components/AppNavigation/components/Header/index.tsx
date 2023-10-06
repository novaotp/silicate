
// Next
import Image from 'next/image';

// Internal
import SilicateLogo from '@public/silicate_logo.svg';
import styles from './index.module.scss';

interface HeaderProps {
  closeNav: () => void;
}

const Header = ({ closeNav }: HeaderProps) => {
  return (
    <div>
      <button className={styles.button} onClick={closeNav}>
        Close
      </button>
      <Image
        src={SilicateLogo}
        alt="Silicate Logo"
        width={150}
        height={75}
      />
    </div>
  )
}

export default Header;
