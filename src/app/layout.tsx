
// React
import { Suspense } from 'react';

// Internal
import { poppins } from '@/fonts';
import './globals.scss';
import Loading from '@components/shared/Loading';
import LayoutProps from './interfaces';

/** The main layout of the app. */
const RootLayout = ({ children }: LayoutProps): JSX.Element => {
  return (
    <html lang="fr">
      <body className={poppins.className}>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}

export default RootLayout;
