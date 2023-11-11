
// Next
import type { Metadata } from 'next';

// Internal
import { SignUp } from './page.components';

export const metadata: Metadata = {
  title: 'Inscription - Silicate'
}

/** The sign-up page. */
const Page = (): JSX.Element => {
  return (
    <SignUp />
  )
}

export default Page;
