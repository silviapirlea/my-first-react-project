import {ItemType} from "../list-item/ListItem.tsx";
import {useItemsReactive} from "../list/UseItems.tsx";
import {useMemo} from "react";
import {flexRender} from "@tanstack/react-table";
import {useTableItems} from "./UseTableItems.tsx";
import {useRecoilValue} from "recoil";
import {filteredItemsState} from "../state/recoil_state.ts";

export function Table() {
    // const items = useItems();
    // const filteredItems = useMemo(() => {
    //     return items.filter(item => props.type == ItemType.ALL || item.type === props.type);
    // }, [items, props.type]);

    const filteredItems = useRecoilValue(filteredItemsState);

    const table = useTableItems(filteredItems);

    return (
        <table>
            <thead>
            {table.getHeaderGroups().map((group) => (
                <tr key={group.id}>
                    {group.headers.map((header) => (
                        <th key={header.id}>
                            {flexRender(header.column.columnDef.header, header.getContext())}
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
                            {flexRender(visibleCell.column.columnDef.cell, visibleCell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}