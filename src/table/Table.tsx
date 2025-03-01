import { flexRender } from "@tanstack/react-table";
import { useTableItems } from "./UseTableItems.tsx";
import { useRecoilValue } from "recoil";
import { filteredItemsState } from "../state/RecoilState.ts";

export function Table() {
    const filteredItems = useRecoilValue(filteredItemsState);

  const table = useTableItems(filteredItems);

  return (
    <table>
      <thead>
        {table.getHeaderGroups().map((group) => (
          <tr key={group.id}>
            {group.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext(),
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((visibleCell) => (
              <td key={visibleCell.id}>
                {flexRender(
                  visibleCell.column.columnDef.cell,
                  visibleCell.getContext(),
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
