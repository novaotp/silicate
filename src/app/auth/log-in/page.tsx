
// Next
import type { Metadata } from 'next';

// Internal
import { Login } from './page.components';

export const metadata: Metadata = {
  title: 'Connexion - Silicate'
}

/** The log-in page. */
const Page = (): JSX.Element => {
  return (
    <Login />
  )
}

export default Page;
