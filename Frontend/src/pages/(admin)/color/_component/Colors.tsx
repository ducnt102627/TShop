import { IColor } from '@/interfaces/color';
import { OptionsType, typeResponse } from '@/interfaces/options';
import { getPaginate, hiddenColor, restoreColor } from '@/services/color';
import { useEffect, useState } from 'react';
import { TableComponent } from '../../_components/TableComponent';

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
import ColorForm from './ColorForm';
const Colors = () => {
    const [colors, setColors] = useState<IColor[]>([]);
    const [openId, setOpenId] = useState<string | boolean>(false);
    const [openHidden, setOpenHidden] = useState<string | boolean>(false);
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
    const handleColors = async () => {
        try {
            const { data } = await getPaginate(options);
            // console.log(data.content);
            setColors(data?.content);
            setResponse({
                currentPage: data.currentPage,
                totalPages: data.totalPages,
                totalItems: data.totalItems,
            })
            return data?.content
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        handleColors();
    }, [options]);
    const handlePageClick = (value: any) => {
        setOptions({ ...options, page: +value.selected + 1 });
    }
    const handleHidden = async (id: string | boolean) => {
        try {
            await hiddenColor(id);
            setOpenHidden(false);
            handleColors();
            toast.success("Ẩn màu sắc thành công");
        } catch (error) {
            console.log(error);
        }
    }
    const handleRestore = async (id: string) => {
        try {
            await restoreColor(id);
            handleColors();
            toast.success("Khôi phúc màu sắc thành công");
        } catch (error) {
            console.log(error);
        }
    }
    const columns: ColumnDef<IColor>[] = [
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
            accessorKey: "code",
            header: "Mã màu",
        },
        {
            accessorKey: "code",
            header: "Màu",
            cell: ({ row }) => {
                return (
                    <div
                        className="md:text-base text-xs w-8 h-8 border rounded-full"
                        style={{ backgroundColor: `${row.original.code}` }}
                    ></div>
                );
            },
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
                <h3 className="text-xl font-medium">Quản lý màu sắc</h3>
                <Button onClick={() => setOpenId(true)} className='flex gap-1'><IoMdAdd size={20} /> Danh mục</Button>
            </div>
            <div className="">
                <Tabs value={`${options.tab}`} className="w-[100%]">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="1" onClick={() => { setOptions((prev: any) => ({ ...prev, tab: 1 })) }}>Danh mục</TabsTrigger>
                        <TabsTrigger value="2" onClick={() => { setOptions((prev: any) => ({ ...prev, tab: 2 })) }}>Danh mục đã ẩn</TabsTrigger>
                    </TabsList>

                </Tabs>
                <TableComponent
                    data={colors}
                    columns={columns}
                    pageCount={response.totalPages}
                    handlePageClick={handlePageClick}
                />
            </div>
            {!!openId && (
                <ColorForm
                    open={openId}
                    handlePaging={() => handleColors()}
                    handleClose={() => setOpenId(false)}
                />
            )}
            {!!openHidden && (
                <DialogConfirm
                    open={!!openHidden}
                    handleClose={() => setOpenHidden(false)}
                    handleSubmit={() => handleHidden(openHidden)}
                    title="��n màu sắc"
                    content={`Bạn có chắc muốn ẩn màu  ${colors?.find((c) => c._id === openHidden)?.name}?`}
                    labelConfirm='Ẩn'
                />
            )}
        </>
    )
}

export default Colors