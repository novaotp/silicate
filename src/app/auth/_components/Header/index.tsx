
import Image from 'next/image';
import SilicateLogo from 'public/SilicateAppIconBlackHorizontal.png';
import styles from './index.module.scss';

interface HeaderProps {
  title: string,
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <h1>{title}</h1>
      <Image
        src={SilicateLogo}
        alt="Silicate Logo"
        width={200}
        height={100}
      />
    </div>
  )
}
