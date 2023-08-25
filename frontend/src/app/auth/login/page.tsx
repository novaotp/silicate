import { LoginComponent } from '@/services/auth-service'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login - Silicate'
}

export default function Page() {
  return (
    <LoginComponent />
  )
}