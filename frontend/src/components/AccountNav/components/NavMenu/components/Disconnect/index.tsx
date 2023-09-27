
import { useRouter } from 'next/navigation';
import styles from './index.module.scss';
import deleteCookie from './serverActions';
import { clientRoute } from '@shared/classes/route';
import { poppins } from '@/core/fonts';

/** A custom button to disconnect from the current account. */
const Disconnect = (): JSX.Element => {
  const router = useRouter();

  const handleOnClick = async (): Promise<void> => {
    const success = await deleteCookie();

    if (success) {
      router.push(clientRoute.auth.login.use());
    }
  }

  return (
    <button onClick={handleOnClick} className={`${styles.button} ${poppins.className}`}>
      Disconnect
    </button>
  )
}

export default Disconnect;
