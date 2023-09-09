"use client";
import { Session } from "next-auth";
import { useSession, signOut, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { PropsWithChildren } from "react";

type HeaderButtonProps = PropsWithChildren<
  React.DOMAttributes<HTMLButtonElement>
>;

function HeaderButton({ children, ...rest }: HeaderButtonProps) {
  return (
    <button className="bg-primary p-3 my-2 rounded" {...rest}>
      {children}
    </button>
  );
}

function UserHeader({ session }: { session: Session }) {
  return (
    <div className="flex gap-3">
      <div className="flex justify-between py-2 flex-col">
        <span>{session.user?.name}</span>
        <span>{session.user?.email}</span>
      </div>
      <HeaderButton onClick={() => signOut()}>Logga ut</HeaderButton>
    </div>
  );
}

function NavigationLinks() {
  return <div className="align-middle flex">Links should be here</div>;
}

export function Header() {
  const session = useSession();

  if (session.status === "unauthenticated") {
    signIn();
  }

  return (
    <nav className="flex justify-between px-2">
      <NavigationLinks />
      {session.data && <UserHeader session={session.data} />}
    </nav>
  );
}
