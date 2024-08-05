import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { OptionsType, typeResponse } from '@/interfaces/options';
import { IProduct } from "@/interfaces/product";
import { getPaginate } from "@/services/product";
import {
    DotsHorizontalIcon
} from "@radix-ui/react-icons";
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
    ColumnDef
} from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from 'react';
import { TableComponent } from "../../_components/TableComponent";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";

const Products = () => {
    const queryClient = useQueryClient();
    const [options, setOptions] = useState<OptionsType>({
        page: 1,
        pageSize: 10,
        sort: 1,
        tab: 1,
    });
    const [response, setResponse] = useState<typeResponse>({
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
    });
    const { data } = useQuery({
        queryKey: ['products', options],
        queryFn: async () => {
            try {
                const { data } = await getPaginate(options);
                console.log(data)
                setResponse({
                    currentPage: data.currentPage,
                    totalPages: data.totalPages,
                    totalItems: data.totalItems,
                });
                return data;
            } catch (error) {
                console.log(error);
            }
        }
    })
    const columns: ColumnDef<IProduct>[] = [
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
            header: "Tên sản phẩm",
        },
        {
            accessorKey: "image ",
            header: "Ảnh",
            cell: ({ row }) => {
                const image = row?.original?.image;
                return (
                    <img src={image} width={100} height={50} alt="" />
                )
            }
        },
        {
            accessorKey: "price",
            header: "Giá",
        },
        {
            accessorKey: "quantity",
            header: "Số lượng",
        },
        {
            accessorKey: "description",
            header: "Mô tả",
        },
        {
            accessorKey: "createdAt",
            header: "Ngày tạo",
            cell: ({ row }) => {
                const date = format(row.original.createdAt || " ", "dd-MM-yyyy")
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
                        {/* <DropdownMenuContent align="end">
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
                        </DropdownMenuContent> */}
                    </DropdownMenu>
                )
            },
        },
    ]

    return (
        <>
            <div className="flex justify-between items-center py-4">
                <h3 className="text-xl font-medium">Quản lý sản phẩm</h3>
                <Link to="/admin/productAdd">
                    <Button className='flex gap-1'><IoMdAdd size={20} /> Sản phẩm</Button>
                </Link>
            </div>
            <div className="">
                <TableComponent
                    data={data?.content || ""}
                    columns={columns}
                    pageCount={response.totalPages}
                />
            </div>
        </>
    )
}

export default Products