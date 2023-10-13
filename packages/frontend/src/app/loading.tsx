
// Next
import Image from 'next/image';

// Internal
import styles from './loading.module.scss';
import SilicateLogo from "@public/SilicateAppIconBlackVertical.png";

/** The loading screen. */
const Loading = (): JSX.Element => {
  return (
    <div className={styles.wrapper}>
      <Image
        src={SilicateLogo}
        alt="Silicate Logo"
        height={250}
      />
      <p>Chargement...</p>
    </div>
  )
}

export default Loading;
