'use client';
import { headerLinks } from '@lib/navigation';
import { Session } from 'next-auth';
import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

function UserHeader({ session }: { session: Session }) {
  return (
    <>
      <div className="gap-3 flex">
        <div className="justify-between py-2 flex-col hidden sm:flex">
          <span>{session.user?.name}</span>
          <span>{session.user?.email}</span>
        </div>
        <button
          className="bg-primary p-3 my-2 rounded text-white"
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
    <ol className="flex gap-2 my-2">
      {headerLinks.map(({ href, name }) => (
        <li key={href}>
          <Link
            href={href}
            aria-current={href === pathname ? 'page' : 'false'}
            className="inline-block p-2 bg-primary text-white rounded-lg aria-current-false:opacity-70 aria-current-false:hover:opacity-90"
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

  if (session.status !== 'authenticated') {
    return null;
  }

  return (
    <nav className=" bg-slate-100 dark:bg-slate-900 shadow-xl">
      <div className="max-w-7xl justify-between px-2 flex items-center mx-auto">
        <NavigationLinks />
        <UserHeader session={session.data} />
      </div>
    </nav>
  );
}
