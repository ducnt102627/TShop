import { useState } from 'react';

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
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs";
import { getPaginate, hiddenCategory, restoreCategory } from '@/services/category';
import {
    DotsHorizontalIcon
} from "@radix-ui/react-icons";
import { keepPreviousData, useMutation, useQuery, useQueryClient, QueryCache } from '@tanstack/react-query';
import {
    ColumnDef
} from "@tanstack/react-table";
import { format } from "date-fns";
import { IoMdAdd } from "react-icons/io";
import { toast } from 'sonner';
import { TableComponent } from '../../_components/TableComponent';
import CategoryForm from './CategoryForm';

interface ICategory {
    _id: string,
    name: string,
    deleted: boolean,
    deletedAt: string,
    createdAt: string,
    updatedAt: string,
    slug: string,
}
export interface typeResponse {
    currentPage: number;
    totalPages: number; //tổng số phần tử
    totalItems: number;
}
export interface OptionsType {
    page: number;
    pageSize: number;
    sort?: 1 | -1;
    tab: 1;
    totalPages?: number;
    totalItems?: number;
}
const Categories = () => {
    const [response, setResponse] = useState<typeResponse>({
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
    });
    const [openId, setOpenId] = useState<string | boolean>(false);
    const [openHidden, setOpenHidden] = useState<string | boolean>(false);
    const [options, setOptions] = useState<OptionsType>({
        page: 1,
        pageSize: 5,
        sort: 1,
        tab: 1,
    })
    const queryClient = useQueryClient();
    const { data: categories, isFetching } = useQuery({
        queryKey: ['categories', options],
        queryFn: async () => {
            const { data } = await getPaginate(options);
            setResponse({
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                totalItems: data.totalItems,
            })
            return data;
        },
        placeholderData: keepPreviousData,
        staleTime: 5 * 60 * 1000, // 5 phút
        // cacheTime: 10 * 60 * 1000, // 10 phút
    })
    const { mutate: handleHidden } = useMutation({
        mutationFn: async (id: string | boolean) => {
            const { data } = await hiddenCategory(id);
            setOpenHidden(false);
        },
        onSuccess: () => {
            toast.success("Đã ẩn danh mục thành công!");
            queryClient.invalidateQueries({
                queryKey: ['categories'],
            })
        },
        onError: (error) => {
            console.log(error);
            toast.error("Ẩn danh mục thất bại!");
        },
    });
    const { mutate: handleRestore } = useMutation({
        mutationFn: async (id: string | boolean) => {
            const { data } = await restoreCategory(id);
            setOpenHidden(false);
        },
        onSuccess: () => {
            toast.success("Khôi phục danh mục thành công!");
            queryClient.invalidateQueries({
                queryKey: ['categories'],
            })
        },
        onError: (error) => {
            console.log(error);
            toast.error("Khôi phục danh mục thất bại!");
        },
    });

    const handlePageClick = (value: any) => {
        setOptions({ ...options, page: +value.selected + 1 });
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
                            {row?.original?.deleted ? (
                                <DropdownMenuItem onClick={() => handleRestore(row.original._id)}>
                                    Khôi phục
                                </DropdownMenuItem>

                            ) : (
                                <DropdownMenuItem onClick={() => setOpenHidden(row.original._id)}>
                                    Ẩn
                                </DropdownMenuItem>
                            )}
                        </DropdownMenuContent>
                    </DropdownMenu>
                )
            },
        },
    ]

    return (
        <div className="w-full">
            {isFetching ? <div>Loading...</div> : null}
            <div className="flex justify-between items-center py-4">
                <h3 className="text-xl font-medium">Quản lý danh mục</h3>
                <Button onClick={() => setOpenId(true)} className='flex gap-1'><IoMdAdd size={20} /> Danh mục</Button>
            </div>
            <Tabs value={`${options.tab}`} className="w-[100%]">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="1" onClick={() => { setOptions((prev: any) => ({ ...prev, tab: 1 })) }}>Danh mục</TabsTrigger>
                    <TabsTrigger value="2" onClick={() => { setOptions((prev: any) => ({ ...prev, tab: 2 })) }}>Danh mục đã ẩn</TabsTrigger>
                </TabsList>
            </Tabs>
            <TableComponent columns={columns} data={categories?.content || ""} pageCount={response?.totalPages} handlePageClick={handlePageClick} />

            {
                !!openId && (
                    <CategoryForm
                        open={openId}
                        title="Cập nhật"
                        handleClose={() => setOpenId(false)}
                    // handlePaging={() => handleCategory(1)}
                    />
                )
            }
            {
                !!openHidden && (
                    <DialogConfirm
                        open={!!openHidden}
                        title="Xác nhận xóa"
                        content="Bạn có chắc muốn ẩn danh mục này?"
                        handleClose={() => setOpenHidden(false)}
                        handleSubmit={() => handleHidden(openHidden)}
                        labelConfirm="Ẩn"

                    />
                )
            }
        </div >
    )
}

export default Categories