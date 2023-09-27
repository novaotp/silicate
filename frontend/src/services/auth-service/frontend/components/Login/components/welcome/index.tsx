
// Next
import Image from 'next/image';

// Internal
import SilicateLogo from '@public/silicate_logo.svg';

/** Returns the header of the log-in page. */
const WelcomeHeader = (): JSX.Element => {
  return (
    <>
      <h1>Re-bienvenue sur</h1>
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