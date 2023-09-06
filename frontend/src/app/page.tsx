import type { Metadata } from 'next'
import LandingComponent from './page.components'

export const metadata: Metadata = {
  title: 'Silicate'
}

export default function Page() {
  return (
    <LandingComponent />
  )
}