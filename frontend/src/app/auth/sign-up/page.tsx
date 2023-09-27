
// Next
import type { Metadata } from 'next';

// Internal
import { SignUpComponent } from '@/services/auth-service';

export const metadata: Metadata = {
  title: 'Sign up - Silicate'
}

export default function Page() {
  return (
    <SignUpComponent />
  )
}