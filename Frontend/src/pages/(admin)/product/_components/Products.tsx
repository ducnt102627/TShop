import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { OptionsType, typeResponse } from '@/interfaces/options';
import { IProduct } from "@/interfaces/product";
import { getPaginate, hiddenProduct } from "@/services/product";
import {
    DotsHorizontalIcon
} from "@radix-ui/react-icons";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
    ColumnDef
} from "@tanstack/react-table";
import { format } from "date-fns";
import { useState } from 'react';
import { TableComponent } from "../../_components/TableComponent";
import { IoMdAdd } from "react-icons/io";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import DialogConfirm from "@/components/DialogConfirm";
import { ICategory } from "@/interfaces/category";
import { ScrollArea } from "@/components/ui/scroll-area";
import { IAttribute } from "@/interfaces/attributes";
import { formatQuantity } from "@/common/localFunction";
import { IColor } from "@/interfaces/color";
import { ISize } from "@/interfaces/size";

const Products = () => {
    const queryClient = useQueryClient();
    const [options, setOptions] = useState<OptionsType>({
        page: 1,
        pageSize: 20,
        sort: "createAt",
        _order: "desc",
        tab: 1,
    });
    const [response, setResponse] = useState<typeResponse>({
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
    });
    const [openHidden, setOpenHidden] = useState<string | boolean>(false);
    const { data, isLoading } = useQuery({
        queryKey: ['products', options],
        queryFn: async () => {
            try {
                const { data } = await getPaginate(options);
                setResponse({
                    currentPage: data.currentPage,
                    totalPages: data.totalPages,
                    totalItems: data.totalItems,
                });
                return data;
            } catch (error) {
                console.log(error);
            }
        },
        placeholderData: keepPreviousData,
        staleTime: 1 * 60 * 1000,
    })
    const { mutate: handleHidden } = useMutation({
        mutationFn: async (id: string | boolean) => {
            try {
                await hiddenProduct(id);
                setOpenHidden(false);
            } catch (error) {
                console.log(error);
            }
        },
        onSuccess: () => {
            toast.success("Đã ẩn sản phẩm thành công!");
            queryClient.invalidateQueries({
                queryKey: ['products', options],
            })
        },
        onError: (error) => {
            console.log(error);
            toast.error("Đã ẩn sản phẩm thất bại!");
        }
    })
    const handleRestore = async (id: string) => {

    }
    // console.log(options)
    const handlePageClick = (value: any) => {
        setOptions({ ...options, page: +value.selected + 1 });
    }
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    };

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
            accessorKey: "category",
            header: "Danh mục",
            cell: ({ row }) => {
                // const categoryName = row?.original?.category?.name || "";
                // console.log("category: ", categoryName)
                return (
                    <div> {(row.original.category as any).name}</div>
                )
            }
        },
        {
            accessorKey: "image ",
            header: "Ảnh",
            cell: ({ row }) => {
                const image = row?.original?.image[0];
                return (
                    <img src={image} width={100} alt="" />
                )
            }
        },
        {
            accessorKey: "price",
            header: "Giá",
            cell: ({ row }) => {
                const newPrice = formatCurrency(row?.original?.price);
                // console.log(newPrice);
                return (
                    <span>{newPrice}</span>
                )
            }
        },
        {
            accessorKey: "discount",
            header: "Ưu đãi",
            cell: ({ row }) => {
                const newPrice = formatCurrency(row?.original?.discount);
                // console.log(newPrice);
                return (
                    <span>{newPrice}</span>
                )
            }
        },
        {
            accessorKey: "quantity",
            header: "Số lượng",
        },
        {
            accessorKey: "color",
            header: "Màu",
            cell: ({ row }) => {
                const listColor = row.original.attribute.reduce(
                    (acc: IColor[], item: any) => {
                        // console.log("item", item)
                        if (!(item?.color as IColor)._id) return acc;
                        let group = acc.find((g) => g._id === (item.color as IColor)?._id);

                        // Nếu nhóm không tồn tại, tạo nhóm mới
                        if (!group) {
                            group = {
                                _id: (item.color as IColor)._id as string,
                                name: (item.color as IColor).name as string,
                                code: (item.color as IColor).code as string,
                            };
                            acc.push(group);
                            return acc;
                        }
                        return acc;
                    },
                    [],
                );
                return (
                    <div className="grid   md:gap-1">
                        {listColor?.map((item) => (
                            <div
                                className="w-2 h-2 md:w-4 md:h-4 rounded-full border border-gray-300 shadow-sm"
                                key={item?._id}
                                style={{
                                    backgroundColor: item?.code,
                                }}
                            ></div>
                        ))}
                    </div>
                );
            },
        },
        {
            accessorKey: "size",
            header: () => {
                return <div className="md:text-base text-xs">Size</div>;
            },
            cell: ({ row }) => {

                const listSize = row.original.attribute.reduce(
                    (acc: { _id: string; name: string }[], item: any) => {

                        if (!(item.color as IColor)._id) return acc;
                        let group = acc.find(
                            (g) => g._id === (item.size as ISize)?._id
                        );

                        // Nếu nhóm không tồn tại, tạo nhóm mới
                        if (!group) {
                            group = {
                                _id: (item.size as ISize)._id as string,
                                name: (item.size as ISize).name as string,
                            };
                            acc.push(group);
                            return acc;
                        }
                        return acc;
                    },
                    [],
                );
                return (
                    <div className="flex flex-wrap gap-1">
                        {listSize?.map((item: any) => item.name).join(", ")}
                    </div>
                );
            },
        },
        // {
        //     accessorKey: "description",
        //     header: "Mô tả",
        // },
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
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem >
                                <Link className="w-full" to={`/admin/productEdit/${row.original._id}`}> Sửa</Link>
                            </DropdownMenuItem>
                            {row?.original?.deleted ? (
                                <DropdownMenuItem onClick={() => handleRestore(row.original._id as string)}>
                                    Khôi phục
                                </DropdownMenuItem>

                            ) : (
                                <DropdownMenuItem onClick={() => setOpenHidden(row.original._id as string)}>
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
                <h3 className="text-xl font-medium">Quản lý sản phẩm</h3>
                <Link to="/admin/productAdd">
                    <Button className='flex gap-1'><IoMdAdd size={20} /> Sản phẩm</Button>
                </Link>
            </div>
            <div className="">
                <TableComponent
                    data={data?.content || []}
                    columns={columns}
                    pageCount={response.totalPages}
                    handlePageClick={handlePageClick}
                    isLoading={isLoading}
                />
            </div >
            {!!openHidden && (
                <DialogConfirm
                    open={!!openHidden}
                    content="Bạn có chắc chắn muốn ẩn sản phẩm này không?"
                    handleClose={() => setOpenHidden(false)}
                    handleSubmit={() => handleHidden(openHidden)}
                    title="Ẩn sản phẩm"
                    labelConfirm="Ẩn"
                />
            )
            }
        </>
    )
}

export default Products