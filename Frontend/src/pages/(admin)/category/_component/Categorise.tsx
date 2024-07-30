import { useEffect, useState } from 'react';

import DialogConfirm from '@/components/DialogConfirm';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import instance from '@/configs/axios';
import { getAllCategories, getHiddenList, hiddenCate, unHiddenCate } from '@/services/category';
import {
    DotsHorizontalIcon
} from "@radix-ui/react-icons";
import {
    ColumnDef
} from "@tanstack/react-table";
import { format } from "date-fns";
import { IoMdAdd } from "react-icons/io";
import { toast } from 'sonner';
import { TableComponent } from '../../_components/TableComponent';
import CategoryForm from './CategoryForm';
import { useQuery, useQueryClient } from '@tanstack/react-query';

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
export interface OptionsType {
    page: number;
    limit: number;
    sort?: 1 | -1;
    totalPages?: number; //tổng số phần tử
    totalItems?: number;
}
const Categorise = () => {
    // const [categories, setCategories] = useState<ICategory[]>([]);
    const [categoriseHidden, setCategoriesHidden] = useState<ICategory[]>([]);
    const [response, setResponse] = useState<typeResponse>({
        currentPage: 0,
        totalPages: 0, //tổng số phần tử
        totalItems: 0, //tổng số phần tử trong 1 trang
    });
    const [openId, setOpenId] = useState<string | boolean>(false);
    const [openHidden, setOpenHidden] = useState<string | boolean>(false);
    const [openUnHidden, setOpenUnHidden] = useState<string | boolean>(false);

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
    const queryClient = useQueryClient();
    const [options, setOptions] = useState<OptionsType>({
        page: 1,
        limit: 6,
        sort: 1,
    })
    const { data: categories, isLoading } = useQuery({
        queryKey: ['categories', options],
        queryFn: async () => {
            const { data } = await getAllCategories(options);
            return data
        }
    })
    // console.log("categories", categories.categories);
    const handlePageClick = (value: any) => {
        console.log(value);
        // setOptions({ ...options, page: +value.selected + 1 });

    }
    const handleHiddenCate = async (id: string | boolean) => {
        try {
            const { data } = await hiddenCate(id);
            // setCategories()
            // handleCategory(1);
            setOpenHidden(false);
            toast.success("Ẩn đanh mục thành công")
        } catch (error) {
            console.log(error)
        }
    }
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
    // const handleGetHiddenCate = async () => {
    //     try {
    //         const { data } = await getHiddenList();
    //         setCategoriesHidden(data.data);
    //         console.log("hidden list", data.data)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // useEffect(() => {
    //     handleGetHiddenCate();
    // }, [])
    // const handleUnHiddenCate = async (id: string | boolean) => {
    //     try {
    //         await unHiddenCate(id);
    //         handleGetHiddenCate();
    //         setOpenUnHidden(false);
    //         toast.success("Khôi phục danh mục thành công")
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const columns2: ColumnDef<ICategory>[] = [
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
            accessorKey: "deletedAt",
            header: "Ngày ẩn",
            cell: ({ row }) => {
                const date = format(row.original.deletedAt || " ", "dd-MM-yyyy")
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
                            {/* <DropdownMenuItem onClick={() => setOpenId(row.original._id)}>
                                Sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleUnHiddenCate(row.original._id)}>
                                Khôi phục
                            </DropdownMenuItem> */}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return (
        <div className="w-full">
            <div className="flex justify-between items-center py-4">
                <h3 className="text-xl font-medium">Quản lý danh mục</h3>
                <Button onClick={() => setOpenId(true)} className='flex gap-1'><IoMdAdd size={24} /> Danh mục</Button>
            </div>
            <Tabs defaultValue="list" className="w-[100%]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="list">Danh mục</TabsTrigger>
                    <TabsTrigger value="list-hidden">Danh mục đã ẩn</TabsTrigger>
                </TabsList>
                <TabsContent value='list'>
                    <TableComponent columns={columns} data={categories.content} pageCount={categories.totalPages} handlePageClick={handlePageClick} />
                </TabsContent>
                <TabsContent value='list-hidden'>
                    {/* <TableComponent columns={columns2} data={categoriseHidden} pageCount={response.totalPages} handlePageClick={handlePageClick} /> */}
                </TabsContent>
            </Tabs>
            {/* <TableComponent columns={columns} data={categories} pageCount={response.totalPages} handlePageClick={handlePageClick} /> */}

            {/* {!!openId && (
                <CategoryForm
                    open={openId}
                    title="Cập nhật"
                    handleClose={() => setOpenId(false)}
                    handlePaging={() => handleCategory(1)}
                />
            )} */}

            {!!openHidden && (
                <DialogConfirm
                    open={!!openHidden}
                    title="Xác nhận xóa"
                    content="Bạn có chắc muốn xóa danh mục này?"
                    handleClose={() => setOpenHidden(false)}
                    handleSubmit={() => handleHiddenCate(openHidden)}
                />
            )}
            {/* {!!openUnHidden && (
                <DialogConfirm
                    open={!!openUnHidden}
                    title="Xác nhận xóa"
                    content="Bạn có chắc muốn khôi phục danh mục này?"
                    handleClose={() => setOpenHidden(false)}
                    handleSubmit={() => handleUnHiddenCate(openUnHidden)}
                />
            )} */}

        </div >
    )
}

export default Categorise