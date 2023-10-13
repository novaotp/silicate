
// Next
import Image from 'next/image';

// Internal
import SilicateLogo from '@public/SilicateAppIconBlackHorizontal.png';

/** Returns the header of the sign-up page. */
const WelcomeHeader = (): JSX.Element => {
  return (
    <>
      <h1>Bienvenue sur</h1>
      <Image
        src={SilicateLogo}
        alt="Silicate Logo"
        width={200}
        height={100}
      />
    </>
  )
}

export default WelcomeHeader;
