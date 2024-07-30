import { useEffect, useState } from 'react';

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import instance from '@/configs/axios';
import {
    DotsHorizontalIcon
} from "@radix-ui/react-icons";
import {
    ColumnDef
} from "@tanstack/react-table";
import { IoMdAdd } from "react-icons/io";
import { TableComponent } from '../../_components/TableComponent';
import CategoryForm from './CategoryForm';
import { compareAsc, format } from "date-fns";
import { getHiddenList, hiddenCate } from '@/services/category';
import { toast } from 'sonner';
import DialogConfirm from '@/components/DialogConfirm';
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

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
const CategoriseHidden = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [response, setResponse] = useState<typeResponse>({
        currentPage: 0,
        totalPages: 0, //tổng số phần tử
        totalItems: 0, //tổng số phần tử trong 1 trang
    });
    const [openId, setOpenId] = useState<string | boolean>(false);
    const [openHidden, setOpenHidden] = useState<string | boolean>(false);
    // const handleCategory = async (_page: number) => {
    //     try {
    //         const { data } = await instance.get(`/category/get?_page=${_page}`);
    //         setCategories(data.data.docs);
    //         setResponse({
    //             currentPage: data.data.page,
    //             totalPages: data.data.totalPages,
    //             totalItems: data.data.totalDocs
    //         })

    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // useEffect(() => {
    //     handleCategory(1)
    // }, []);

    // const handlePageClick = (value: any) => {
    //     console.log(value);
    //     handleCategory(+value.selected + 1)
    // }
    const handleGetHiddenCate = async () => {
        try {
            const { data } = await getHiddenList();
            console.log("hidden list", data)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        handleGetHiddenCate();
    }, [])
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
            accessorKey: "createdAt",
            header: "Ngày tạo",
            cell: ({ row }) => {
                const date = format(row.original.createdAt || row.original.deletedAt || " ", "dd-MM-yyyy")
                return (
                    <div className="" > {date}</div>
                )
            }
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
                            <DropdownMenuItem onClick={() => setOpenHidden(row.original._id)}>
                                Xóa
                            </DropdownMenuItem>

                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return (
        <div className="w-full">
            <TabsContent value='list-hidden'>
                <TableComponent columns={columns} data={categories} pageCount={response.totalPages} />
            </TabsContent>
            {/* <TableComponent columns={columns} data={categories} pageCount={response.totalPages} handlePageClick={handlePageClick} /> */}

            {!!openId && (
                <CategoryForm
                    open={openId}
                    title="Cập nhật"
                    handleClose={() => setOpenId(false)}
                    handlePaging={() => handleGetHiddenCate()}
                />
            )}
            {/* 
            {!!openHidden && (
                <DialogConfirm
                    open={!!openHidden}
                    title="Xác nhận xóa"
                    content="Bạn có chắc muốn xóa danh mục này?"
                    handleClose={() => setOpenHidden(false)}
                    handleSubmit={() => handleHiddenCate(openHidden)}
                />
            )} */}

        </div >
    )
}

export default CategoriseHidden