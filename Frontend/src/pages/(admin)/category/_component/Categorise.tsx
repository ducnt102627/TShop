import { useEffect, useState } from 'react'

import {
    DotsHorizontalIcon
} from "@radix-ui/react-icons"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import Paginations from '@/components/Pagination'
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import instance from '@/configs/axios'
import { IoMdAdd } from "react-icons/io"
import CategoryForm from './CategoryForm'
import { Value } from '@radix-ui/react-select'
import { TableComponent } from '../../_components/TableComponent'


interface ICategory {
    _id: string,
    name: string,
    deletedAt: string;
    createdAt: string;
    updatedAt: string;
    slug: string,
}
export interface typeResponse {
    currentPage: number;
    totalPages: number; //tổng số phần tử
    totalItems: number;
}
export interface SearchObjectType {
    page: number;
    limit: number;
    sort?: 1 | -1;
    totalPages?: number; //tổng số phần tử
    totalItems?: number;
}
const Categorise = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [response, setResponse] = useState<typeResponse>({
        currentPage: 0,
        totalPages: 0, //tổng số phần tử
        totalItems: 0, //tổng số phần tử trong 1 trang
    });
    const [openId, setOpenId] = useState<string | boolean>(false);
    const handleCategory = async (_page: number) => {
        try {
            const { data } = await instance.get(`/category/get?_page=${_page}`);
            setCategories(data.data.docs);
            setResponse({
                currentPage: data.data.page,
                totalPages: data.data.totalPages,
                totalItems: data.data.totalDocs
            })

        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleCategory(1)
    }, []);
    const handlePageClick = (value: any) => {
        console.log(value);
        handleCategory(+value.selected + 1)
    }
    // console.log(categories)
    const columns: ColumnDef<ICategory>[] = [
        {
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        },
        {
            accessorKey: "name",
            header: "Tên danh mục",
        },
        {
            accessorKey: "slug",
            header: "Slug",
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const payment = row.original
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setOpenId(row.original._id)}>
                                Sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                Xóa
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]
    // const table = useReactTable({
    //     data: categories,
    //     columns,
    //     onSortingChange: setSorting,
    //     onColumnFiltersChange: setColumnFilters,
    //     getCoreRowModel: getCoreRowModel(),
    //     getPaginationRowModel: getPaginationRowModel(),
    //     getSortedRowModel: getSortedRowModel(),
    //     getFilteredRowModel: getFilteredRowModel(),
    //     onColumnVisibilityChange: setColumnVisibility,
    //     onRowSelectionChange: setRowSelection,
    //     state: {
    //         sorting,
    //         columnFilters,
    //         columnVisibility,
    //         rowSelection,
    //     },
    // })

    return (
        <div className="w-full">
            <div className="flex justify-between items-center py-4">
                <h3 className="text-xl font-medium">Quản lý danh mục</h3>
                <Button onClick={() => setOpenId(true)} className='flex gap-1'><IoMdAdd size={24} /> Danh mục</Button>
            </div>

            <TableComponent columns={columns} data={categories} pageCount={response.totalPages} handlePageClick={handlePageClick} />

            {!!openId && (
                <CategoryForm
                    open={openId}
                    title="Cập nhật"
                    handleClose={() => setOpenId(false)}
                    handlePaging={() => handleCategory(1)}
                />
            )}
        </div >
    )
}

export default Categorise