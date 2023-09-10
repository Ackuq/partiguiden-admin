'use client';
import { ZodIssue } from 'zod';
import Button from './button';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import LoadingSpinner from './icons/loading-spinner';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: ZodIssue;
}

export function Input({ error, ...props }: InputProps) {
  return (
    <div className="mb-4">
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none data-[error=true]:outline-red-600 data-[error=true]:outline"
        data-error={!!error ?? false}
        {...props}
      />
      {error && <span>{error.message}</span>}
    </div>
  );
}

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SubmitButton({ className, ...rest }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <div className="text-right mt-6">
      <Button className={className} type="submit" disabled={pending} {...rest}>
        {pending ? (
          <>
            <LoadingSpinner className="inline-block w-5 h-5 mr-1" />
            <span className="align-middle">Skickar...</span>
          </>
        ) : (
          <span className="align-middle">Skicka</span>
        )}
      </Button>
    </div>
  );
}

type FormProps = React.FormHTMLAttributes<HTMLFormElement>;

export default function Form({ children, className, ...props }: FormProps) {
  return (
    <form className={`rounded px-8 py-6 ${className}`} {...props}>
      {children}
    </form>
  );
}
