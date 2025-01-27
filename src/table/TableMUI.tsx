import {useItems} from "../list/UseItems.tsx";
import {useMemo} from "react";
import {useTableItems} from "./UseTableItems.tsx";
import {ItemType} from "../list-item/ListItem.tsx";
import {Paper, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import Table from '@mui/material/Table';
import {flexRender} from "@tanstack/react-table";


export function TableMUI(props: {type: ItemType | undefined}) {
    const items = useItems();
    const filteredItems = useMemo(() => {
        return items.filter(item => props.type == ItemType.ALL || item.type === props.type);
    }, [items, props.type]);

    const table = useTableItems(filteredItems);

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <TableCell key={header.id}>
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableHead>

                <TableBody>
                    {table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            {row.getVisibleCells().map((visibleCell) => (
                                <TableCell key={visibleCell.id} align="left">
                                    {flexRender(visibleCell.column.columnDef.cell, visibleCell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}