
// React
import { Suspense } from 'react';

// Internal
import { poppins } from '@assets/fonts';
import '@assets/styles/globals.scss';
import { Loading } from './_components/Loading';
import { ChildrenProps } from '../types/interfaces';
import { ToastProvider } from '@/libs/contexts/ToastContext';
import { Toast } from './_components/Toast';
import { AlertProvider } from '@/libs/contexts/AlertContext';
import { Alert } from './_components/Alert';

/** The main layout of the app. */
const RootLayout = ({ children }: ChildrenProps): JSX.Element => {
  return (
    <html lang="fr">
      <head>
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/images/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/images/favicon-32x32.png"/>
        <link rel="icon" type="image/png" sizes="16x16" href="/images/favicon-16x16.png"/>
      </head>
      <body className={poppins.className}>
        <Suspense fallback={<Loading />}>
          <AlertProvider>
            <Alert />
            <ToastProvider>
              <Toast />
              {children}
            </ToastProvider>
          </AlertProvider>
        </Suspense>
      </body>
    </html>
  )
}

export default RootLayout;
