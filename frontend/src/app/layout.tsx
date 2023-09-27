
// React
import { Suspense } from 'react';

// Internal
import { poppins } from '@/core/fonts';
import './globals.scss';
import Loading from './loading';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
