// React
import { Suspense } from "react";

// Internal
import "./globals.css";
import { poppins } from "@/fonts";
import { ChildrenProps } from "../types/interfaces";

/// -- Components -- ///
import { Loading, Toast, Alert } from "@components/shared";

/// -- Libs -- ///
import { ToastProvider } from "@/libs/contexts/ToastContext";
import { AlertProvider } from "@/libs/contexts/AlertContext";
import { ThemeProvider } from "@/libs/contexts/ThemeContext";

/** The main layout of the app. */
const RootLayout = ({ children }: ChildrenProps): JSX.Element => {
    return (
        <html lang='fr' suppressHydrationWarning>
            <head>
                <link rel='shortcut icon' href='/icons/favicon.ico' />
                <link
                    rel='apple-touch-icon'
                    sizes='180x180'
                    href='/icons/apple-touch-icon.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='32x32'
                    href='/icons/favicon-32x32.png'
                />
                <link
                    rel='icon'
                    type='image/png'
                    sizes='16x16'
                    href='/icons/favicon-16x16.png'
                />
                <link rel='manifest' href='/manifest.json' />
            </head>
            <body className={poppins.className}>
                <Suspense fallback={<Loading />}>
                    <ThemeProvider>
                        <AlertProvider>
                            <Alert />
                            <ToastProvider>
                                <Toast />
                                {children}
                            </ToastProvider>
                        </AlertProvider>
                    </ThemeProvider>
                </Suspense>
            </body>
        </html>
    );
};

export default RootLayout;
