'use client';

import { signIn, useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export default function AdminLayout({ children, ...rest }: PropsWithChildren) {
  const session = useSession();

  if (session.status === 'unauthenticated') {
    signIn();
  }

  if (session.status !== 'authenticated') {
    return null;
  }

  return children;
}
