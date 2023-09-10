export default function MainContainer({ children }: React.PropsWithChildren) {
  return <main className="mx-auto w-full max-w-3xl px-2 py-3">{children}</main>;
}
