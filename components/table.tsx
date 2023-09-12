type ColumnProps = React.TdHTMLAttributes<HTMLTableCellElement>;

export function Column({ children, className, ...rest }: ColumnProps) {
  return (
    <td
      className={`px-6 py-4 font-medium text-gray-900 dark:text-white ${className}`}
      {...rest}
    >
      {children}
    </td>
  );
}

type RowProps = React.HTMLAttributes<HTMLTableRowElement>;
export function Row({ children, className, ...rest }: RowProps) {
  return (
    <tr
      className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 last:border-0 ${className}`}
      {...rest}
    >
      {children}
    </tr>
  );
}

type TableProps = React.PropsWithChildren<{
  columns: { name: string; width: `${number}%` }[];
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
      className={`table-fixed w-full text-sm text-left text-gray-500 dark:text-gray-400 ${className}`}
      {...rest}
    >
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {columns.map((column) => (
            <th
              key={column.name}
              style={{ width: column.width }}
              scope="col"
              className="px-6 py-3"
            >
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
}
