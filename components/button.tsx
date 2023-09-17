type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function BaseButton({ children, className, ...rest }: ButtonProps) {
  return (
    <button
      className={`inline-block rounded-lg p-2 hover:opacity-75 ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

export default function Button({ children, className, ...rest }: ButtonProps) {
  return (
    <BaseButton
      className={`bg-primary text-foreground-primary ${className}`}
      {...rest}
    >
      {children}
    </BaseButton>
  );
}
