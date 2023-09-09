"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";

function LoginButton() {
  return (
    <button
      className="bg-primary p-2 rounded w-full max-w-lg"
      onClick={() => signIn()}
    >
      Logga in
    </button>
  );
}

export default function Home() {
  const session = useSession();

  return (
    <main className="flex flex-1 flex-col gap-3 mx-3 items-center justify-center">
      <Image
        src="/partiguiden_logo_primary.png"
        alt="Partiguiden logo"
        width="890"
        height="140"
      />
      {session.status === "unauthenticated" && <LoginButton />}
    </main>
  );
}
