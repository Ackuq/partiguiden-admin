import { ZodIssue } from 'zod';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: ZodIssue;
}

export default function Input({ error, ...props }: InputProps) {
  return (
    <>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:outline-none data-[error=true]:outline-red-600 data-[error=true]:outline"
        data-error={!!error ?? false}
        {...props}
      />
      {error && <span>{error.message}</span>}
    </>
  );
}
