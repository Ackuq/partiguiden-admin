'use client';

import Loading from '@app/loading';
import Home from '@app/page';
import { signIn, useSession } from 'next-auth/react';
import type { PropsWithChildren } from 'react';

export default function AdminLayout({ children }: PropsWithChildren) {
  const session = useSession();

  if (session.status === 'unauthenticated') {
    signIn();
    return <Home />;
  }

  if (session.status === 'loading') {
    return <Loading />;
  }

  return children;
}
