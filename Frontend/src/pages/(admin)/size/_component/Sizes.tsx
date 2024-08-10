import React, { useEffect, useState } from 'react'
import DialogConfirm from '@/components/DialogConfirm';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    DotsHorizontalIcon
} from "@radix-ui/react-icons";
import {
    ColumnDef
} from "@tanstack/react-table";
import { format } from "date-fns";
import { IoMdAdd } from 'react-icons/io';
import { toast } from 'sonner';
import { ISize } from '@/interfaces/size';
import { OptionsType, typeResponse } from '@/interfaces/options';
import { getAllSizes, getPaginate, hiddenSize, restoreSizeById } from '@/services/size';
import { TableComponent } from '../../_components/TableComponent';
import { size } from 'lodash';
const Sizes = () => {
    const [sizes, setSizes] = useState<ISize[]>([]);
    const [openId, setOpenId] = useState<string | boolean>(false);
    const [openHidden, setOpenHidden] = useState<string | boolean>(false);
    const [options, setOptions] = useState<OptionsType>({
        page: 1,
        pageSize: 3,
        sort: 1,
        tab: 1,
    });
    const [response, setResponse] = useState<typeResponse>({
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
    });
    const handleSize = async () => {
        try {
            const { data } = await getAllSizes();
            setSizes(data);
            // setResponse({
            //     currentPage: data.currentPage,
            //     totalPages: data.totalPages,
            //     totalItems: data.totalItems,
            // })
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handleSize()
    }, [])

    const handleHidden = async (id: string | boolean) => {
        try {
            const { data } = await hiddenSize(id);
            setSizes((size) => size.filter((item: ISize) => item._id !== id))
            setOpenHidden(false);
            toast.success("Ẩn kích cỡ thành công!");
        } catch (error) {
            console.log(error);
        }
    }
    const handleRestore = async (id: string) => {
        try {
            await restoreSizeById(id);
            handleSize();
            toast.success("Khôi phục kích cỡ thành công!")
        } catch (error) {
            console.log(error);
        }
    }
    const columns: ColumnDef<ISize>[] = [
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
            header: "Tên kích cỡ",
        },
        {
            accessorKey: "minHeight",
            header: "Chiều cao tối thiểu (cm)",
        },
        {
            accessorKey: "maxHeight",
            header: "Chiều cao tối đa (cm)",
        },
        {
            accessorKey: "minWeight",
            header: "Cân nặng tối thiểu (cm)",
        },
        {
            accessorKey: "maxWeight",
            header: "Cân nặng tối đa (cm)",
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
                                <DotsHorizontalIcon className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setOpenId(row?.original._id)}>
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
        <>
            <div className="flex justify-between items-center py-4">
                <h3 className="text-xl font-medium">Quản lý kích cỡ</h3>
                <Button onClick={() => setOpenId(true)} className='flex gap-1'><IoMdAdd size={20} /> Kích cỡ</Button>
            </div>
            <div className="">
                <TableComponent
                    data={sizes}
                    columns={columns}
                    pageCount={response?.totalPages}
                />
            </div>
            {!!openHidden && (
                <DialogConfirm
                    open={!!openHidden}
                    title="Ẩn kích cỡ"
                    content={`Bạn có chắc muốn ẩn kích cỡ ${sizes.find((s) => s._id === openHidden)?.name} không?`}
                    handleSubmit={() => handleHidden(openHidden)}
                    handleClose={() => setOpenHidden(false)}
                    labelConfirm='Ẩn'
                />
            )}
        </>
    )
}

export default Sizes