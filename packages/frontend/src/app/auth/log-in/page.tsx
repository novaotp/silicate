
// Next
import type { Metadata } from 'next';

// Internal
import { Login } from '@components/auth';

export const metadata: Metadata = {
  title: 'Login - Silicate'
}

/** The log-in page. */
const Page = (): JSX.Element => {
  return (
    <Login />
  )
}

export default Page;
