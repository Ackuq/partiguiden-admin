export function Column({ children }: React.PropsWithChildren) {
  return (
    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
      {children}
    </td>
  );
}

export function Row({ children }: React.PropsWithChildren) {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 last:border-0">
      {children}
    </tr>
  );
}

type TableProps = React.PropsWithChildren<{
  columns: string[];
}> &
  React.HTMLAttributes<HTMLTableElement>;

export default function Table({
  columns,
  className,
  children,
  ...rest
}: TableProps) {
  return (
    <table
      className={`w-full text-sm text-left text-gray-500 dark:text-gray-400 ${className}`}
      {...rest}
    >
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {columns.map((column) => (
            <th key={column} scope="col" className="px-6 py-3">
              {column}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
