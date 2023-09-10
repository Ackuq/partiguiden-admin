import { PropsWithChildren, Suspense } from 'react';
import NextAuthProvider from './(auth)/next-auth-provider';
import { Header } from './(header)/header';
import './globals.css';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';
import Loading from './loading';

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
        className={`${lato.className} bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark min-h-screen flex flex-col`}
      >
        <NextAuthProvider>
          <Header />
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </NextAuthProvider>
      </body>
    </html>
  );
}
