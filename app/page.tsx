'use client';

import { signIn, useSession } from 'next-auth/react';
import Image from 'next/image';

function LoginButton() {
  return (
    <button
      className="w-full max-w-lg rounded bg-primary p-2"
      onClick={() => signIn()}
    >
      Logga in
    </button>
  );
}

export default function Home() {
  const session = useSession();

  return (
    <main className="mx-3 flex flex-1 flex-col items-center justify-center gap-3">
      <Image
        src="/partiguiden_logo_primary.png"
        alt="Partiguiden logo"
        width="890"
        height="140"
      />
      {session.status === 'unauthenticated' && <LoginButton />}
    </main>
  );
}
