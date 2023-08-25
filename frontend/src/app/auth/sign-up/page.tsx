import { SignUpComponent } from '@/services/auth-service'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign up - Silicate'
}

export default function Page() {
  return (
    <SignUpComponent />
  )
}