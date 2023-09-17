import type { PropsWithChildren } from 'react';
import { Suspense } from 'react';
import NextAuthProvider from './(auth)/next-auth-provider';
import { Header } from './(header)/header';
import './globals.css';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import Loading from './loading';
import StatusContextProvider from './(status)/status-context';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
});

export const metadata: Metadata = {
  title: 'Partiguiden Admin',
  description: 'Admin portal for Partiguiden',
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="sv">
      <body
        className={`${lato.className} flex min-h-screen flex-col bg-background-light text-foreground-light dark:bg-background-dark dark:text-foreground-dark`}
      >
        <StatusContextProvider>
          <NextAuthProvider>
            <Header />
            <Suspense fallback={<Loading />}>{children}</Suspense>
          </NextAuthProvider>
        </StatusContextProvider>
      </body>
    </html>
  );
}
