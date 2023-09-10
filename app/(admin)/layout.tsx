'use client';

import Loading from '@app/loading';
import { signIn, useSession } from 'next-auth/react';
import { PropsWithChildren } from 'react';

export default function AdminLayout({ children }: PropsWithChildren) {
  const session = useSession();

  if (session.status === 'unauthenticated') {
    signIn();
  }

  if (session.status !== 'authenticated') {
    return <Loading />;
  }

  return children;
}
