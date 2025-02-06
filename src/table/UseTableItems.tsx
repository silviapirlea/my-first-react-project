import {
  createColumnHelper,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Item, ItemStatus } from "../list-item/ListItem.tsx";

export function useTableItems(items: Item[]) {
  const columnHelper = createColumnHelper<Item>();
  const table = useReactTable({
    data: items,
    columns: [
      columnHelper.accessor("name", {
        id: "name",
        header: "Name",
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor("url", {
        id: "url",
        header: "Url",
        cell: (info) => (
          <a href={info.renderValue()} target={"_blank"}>
            {info.renderValue()}
          </a>
        ),
      }),
      columnHelper.accessor("tags", {
        id: "tags",
        header: "Tags",
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor("amount", {
        id: "amount",
        header: "Amount",
        cell: (info) => (info.renderValue() ? info.getValue() : "-"),
      }),
      columnHelper.accessor("status", {
        id: "status",
        header: "Status",
        cell: (info) => ItemStatus[info.renderValue()],
      }),
      columnHelper.accessor("deadline", {
        id: "deadline",
        header: "Deadline",
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor("description", {
        id: "description",
        header: "Description",
        cell: (info) => info.renderValue(),
      }),
      columnHelper.accessor("isRepetable", {
        id: "isRepetable",
        header: "Repetable",
        cell: (info) => (info.renderValue() ? "Repetable" : "Nonrepetable"),
      }),
    ],
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return table;
}
