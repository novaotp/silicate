
// Next
import type { Metadata } from 'next';

// Internal
import { SignUp } from '@components/auth';

export const metadata: Metadata = {
  title: 'Sign up - Silicate'
}

/** The sign-up page. */
const Page = (): JSX.Element => {
  return (
    <SignUp />
  )
}

export default Page;
