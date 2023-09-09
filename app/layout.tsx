import { PropsWithChildren } from 'react';
import NextAuthProvider from './(auth)/next-auth-provider';
import { Header } from './(header)/header';
import './globals.css';
import type { Metadata } from 'next';
import { Lato } from 'next/font/google';

const lato = Lato({
  subsets: ['latin'],
  weight: ['100', '300', '400', '700'],
});

export const metadata: Metadata = {
  title: 'Partiguiden Admin',
  description: 'Admin portal for Partiguiden',
};

export default function RootLayout({ children, ...rest }: PropsWithChildren) {
  return (
    <html lang="sv">
      <body
        className={`${lato.className} bg-slate-50 dark:bg-slate-950 text-slate-950 dark:text-slate-50 min-h-screen flex flex-col`}
      >
        <NextAuthProvider>
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
