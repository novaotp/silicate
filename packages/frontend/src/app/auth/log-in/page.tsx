
// Next
import type { Metadata } from 'next';

// Internal
import { LoginComponent } from '@/services/auth-service';

export const metadata: Metadata = {
  title: 'Login - Silicate'
}

/** The log-in page. */
const Page = (): JSX.Element => {
  return (
    <LoginComponent />
  )
}

export default Page;
