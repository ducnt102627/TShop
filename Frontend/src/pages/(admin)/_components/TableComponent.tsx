import React, { useState } from 'react'

import {
    ColumnDef,
    ColumnFiltersState,
    RowSelectionState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    useReactTable
} from "@tanstack/react-table"

import Paginations from '@/components/Pagination'
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ScrollArea } from '@/components/ui/scroll-area'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pageCount: number,
    handlePageClick?: ({ selected }: { selected: number }) => void,
    rowSelection?: RowSelectionState | undefined; //! lưu trữ các row selected
    setRowSelection?: React.Dispatch<React.SetStateAction<RowSelectionState>>; //! hàm đ
    isLoading: boolean;
}

export function TableComponent<TData, TValue>(
    { columns, data, pageCount, isLoading, handlePageClick, rowSelection,
        setRowSelection, }: DataTableProps<TData, TValue>) {
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        []
    )
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
    })

    return (
        <>
            <div className="w-full">
                <div className="flex justify-between items-center py-4">
                    <Input
                        placeholder="Tìm kiếm..."
                        value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                            table.getColumn("name")?.setFilterValue(event.target.value)
                        }
                        className="max-w-sm"
                    />
                    {/* <Button onClick={() => setOpenId(true)} className='flex gap-1'><IoMdAdd size={24} /> Danh mục</Button> */}
                </div>
                <div className="rounded-md border">
                    <ScrollArea className="max-w-[100%] whitespace-nowrap">
                        <Table>
                            <TableHeader className="scroll-custom">
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <TableRow key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <TableHead key={header.id}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                </TableHead>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableHeader>
                            <TableBody className="scroll-custom relative" >
                                {isLoading && (
                                    <div className="inset-0 absolute bg-gray-300/40 flex justify-center items-center">
                                        <AiOutlineLoading3Quarters size={20} className="text-blue-500 animate-spin" />
                                    </div>
                                )}

                                {table.getRowModel().rows?.length ? (
                                    table.getRowModel().rows.map((row) => (
                                        <TableRow
                                            key={row.id}
                                            data-state={row.getIsSelected() && "selected"}
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id}>
                                                    {flexRender(
                                                        cell.column.columnDef.cell,
                                                        cell.getContext()
                                                    )}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={columns.length}
                                            className="h-24 text-center"
                                        >
                                            Không có giá trị.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </ScrollArea>

                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s) selected.
                    </div>
                    <div className="">
                        <Paginations pageCount={pageCount} handlePageClick={handlePageClick} />
                    </div>
                </div>
            </div >
        </>
    )
}

