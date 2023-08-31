import Image from 'next/image';
import SilicateLogo from '@public/silicate_logo.svg';
import styles from './index.module.css';

interface HeaderProps {
  closeNav: () => void;
}

export default function Header({ closeNav }: HeaderProps) {
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