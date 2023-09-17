'use client';
import type { ZodIssue } from 'zod';
import Button from './button';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import LoadingSpinner from './icons/loading-spinner';

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: ZodIssue;
  rightContent?: React.ReactNode;
}

export function TextArea({ error, rightContent, ...rest }: TextAreaProps) {
  return (
    <div className="mb-4">
      <div className="flex">
        <textarea
          className="w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow focus:outline-none data-[error=true]:outline data-[error=true]:outline-red-600"
          data-error={!!error ?? false}
          {...rest}
        />
        {rightContent}
      </div>
      {error && <span>{error.message}</span>}
    </div>
  );
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: ZodIssue;
  rightContent?: React.ReactNode;
}

export function Input({ error, rightContent, ...rest }: InputProps) {
  return (
    <div className="mb-4">
      <div className="flex">
        <input
          className="w-full appearance-none rounded border px-3 py-2 text-gray-700 shadow focus:outline-none data-[error=true]:outline data-[error=true]:outline-red-600"
          data-error={!!error ?? false}
          {...rest}
        />
        {rightContent}
      </div>
      {error && <span>{error.message}</span>}
    </div>
  );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: { name: string; value: string }[];
  error?: ZodIssue;
}

export function Select({ error, options, ...rest }: SelectProps) {
  return (
    <div className="mb-4">
      <select
        className="w-full appearance-none rounded border text-gray-700 shadow focus:outline-none data-[error=true]:outline data-[error=true]:outline-red-600"
        data-error={!!error ?? false}
        {...rest}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <span>{error.message}</span>}
    </div>
  );
}

type SubmitButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export function SubmitButton({ className, ...rest }: SubmitButtonProps) {
  const { pending } = useFormStatus();

  return (
    <div className="mt-6 text-right">
      <Button className={className} type="submit" disabled={pending} {...rest}>
        {pending ? (
          <>
            <LoadingSpinner className="mr-1 inline-block h-5 w-5" />
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
