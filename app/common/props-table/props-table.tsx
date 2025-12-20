import React from "react";

export interface PropMeta {
  name: string;
  type: string;
  description: string;
  default?: string;
  required?: boolean;
}

interface PropsTableProps {
  /** The prop documentation data to display */
  props: PropMeta[] | null | undefined;
}

export function PropsTable({ props }: PropsTableProps) {
  if (!props) {
    return (
      <div className="rounded border border-red-500 bg-red-50 p-4 text-red-700 dark:bg-red-950 dark:text-red-300">
        <strong>Error:</strong> No prop documentation provided.
        <br />
        Make sure to import and pass the props data.
      </div>
    );
  }

  if (props.length === 0) {
    return (
      <div className="border-grey-300 bg-grey-50 text-grey-600 dark:border-grey-700 dark:bg-grey-900 dark:text-grey-400 rounded border p-4">
        No props documented for this component.
      </div>
    );
  }

  return (
    <div className="not-prose my-6 overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-grey-300 bg-grey-100 dark:border-grey-700 dark:bg-grey-800 border-b">
            <th className="px-4 py-3 text-left text-sm font-semibold">Prop</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">Type</th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Default
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Required
            </th>
            <th className="px-4 py-3 text-left text-sm font-semibold">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {props.map((prop) => (
            <tr
              key={prop.name}
              className="border-grey-200 dark:border-grey-800 border-b"
            >
              <td className="px-4 py-3">
                <code>{prop.name}</code>
              </td>
              <td className="px-4 py-3">
                <code className="text-grey-700 dark:text-grey-300 text-xs">
                  {prop.type}
                </code>
              </td>
              <td className="text-grey-600 dark:text-grey-400 px-4 py-3 text-sm">
                {prop.default ? (
                  <code className="bg-grey-100 dark:bg-grey-800 rounded px-2 py-1 text-xs">
                    {prop.default}
                  </code>
                ) : (
                  <span className="text-grey-400 dark:text-grey-600">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-center text-sm">
                {prop.required ? (
                  <span className="text-danger-500">Yes</span>
                ) : (
                  <span className="text-grey-400 dark:text-grey-600">—</span>
                )}
              </td>
              <td className="text-grey-700 dark:text-grey-300 px-4 py-3 text-sm">
                {prop.description || (
                  <span className="text-grey-400 dark:text-grey-600 italic">
                    No description
                  </span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
