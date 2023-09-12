type MainContainerProps = React.HTMLAttributes<HTMLElement>;

export default function MainContainer({
  children,
  className,
  ...rest
}: MainContainerProps) {
  return (
    <main
      className={`mx-auto w-full max-w-3xl px-2 py-3 ${className}`}
      {...rest}
    >
      {children}
    </main>
  );
}
