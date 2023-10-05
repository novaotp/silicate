
// Next
import type { Metadata } from 'next';

// Internal
import { SignUpComponent } from '@/services/auth-service';

export const metadata: Metadata = {
  title: 'Sign up - Silicate'
}

/** The sign-up page. */
const Page = (): JSX.Element => {
  return (
    <SignUpComponent />
  )
}

export default Page;
