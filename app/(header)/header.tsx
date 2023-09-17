'use client';
import { HEADER_LINKS } from '@lib/navigation';
import type { Session } from 'next-auth';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function UserHeader({ session }: { session: Session }) {
  return (
    <>
      <div className="flex gap-3">
        <div className="hidden flex-col justify-between py-2 sm:flex">
          <span>{session.user?.name}</span>
          <span>{session.user?.email}</span>
        </div>
        <button
          className="my-2 rounded bg-primary p-3 text-white"
          onClick={() => signOut()}
        >
          Logga ut
        </button>
      </div>
    </>
  );
}

function NavigationLinks() {
  const pathname = usePathname();

  return (
    <ol className="my-2 flex gap-2">
      {HEADER_LINKS.map(({ href, name }) => (
        <li key={href}>
          <Link
            href={href}
            aria-current={href === pathname ? 'page' : 'false'}
            className="inline-block rounded-lg bg-primary p-2 text-white aria-current-false:opacity-70 aria-current-false:hover:opacity-90"
          >
            {name}
          </Link>
        </li>
      ))}
    </ol>
  );
}

export function Header() {
  const session = useSession();

  return (
    <nav className=" bg-elevated-light shadow-xl dark:bg-elevated-dark">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-2">
        <NavigationLinks />
        {session.status === 'authenticated' && (
          <UserHeader session={session.data} />
        )}
      </div>
    </nav>
  );
}
