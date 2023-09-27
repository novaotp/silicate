
// Next
import type { Metadata } from 'next'

// Internal
import { LoginComponent } from '@/services/auth-service'

export const metadata: Metadata = {
  title: 'Login - Silicate'
}

export default function Page() {
  return (
    <LoginComponent />
  )
}