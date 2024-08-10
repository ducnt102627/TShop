import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useEffect } from 'react'
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form"

import instance from '@/configs/axios'
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ICategory } from "@/interfaces/category"
import { addColor, getColorById, updateColor } from "@/services/color"
import { useParams } from "react-router-dom"
import { IColor } from "@/interfaces/color"
interface FormDialog {
    open: boolean | string;
    title?: "Thêm danh mục" | "Cập nhật";
    handleClose: () => void;
    handlePaging: () => void;
}
const formSchema = z.object({
    name: z
        .string({
            message: "Tên màu không được để trống",
        })
        .min(2, {
            message: "Tên màu phải có ít nhất 2 ký tự",
        }),

    code: z
        .string({
            message: "Mã màu không được để trống",
        })
        .min(6, {
            message: "Mã màu phải có ít nhất 6 ký tự",
        }),
})
const ColorForm = ({
    title,
    open,
    handleClose,
    handlePaging,
}: FormDialog) => {
    const queryClient = useQueryClient();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            code: "",
        },
    })
    const { data } = useQuery({
        queryKey: ['color', open, form.reset],
        queryFn: async () => {
            const { data } = await getColorById(open as any);
            console.log(data)
            form.reset(data)
            return data;
        },
    })
    const { mutate } = useMutation({
        mutationFn: async (color: IColor) => {
            if (typeof open === "string") {
                await updateColor(color);
            } else {
                await addColor(color);
            }
        },
        onSuccess: () => {
            if (typeof open === "string") {
                handleClose();
                handlePaging()
                toast.success("Bạn đã cập nhật màu thành công");
                // queryClient.invalidateQueries({
                //     queryKey: ['colors'],
                // })
            } else {
                handleClose();
                handlePaging();
                toast.success("Bạn đã thêm màu thành công");
                // queryClient.invalidateQueries({
                //     queryKey: ['colors'],
                // })
            }
        },
        onError: () => {
            handleClose();
            toast.success("Vui lòng thử lại!")
        }
    })
    const onSubmit: SubmitHandler<any> = (data: IColor) => {
        mutate(data)
    }
    return (
        <>
            <Dialog open={!!open} onOpenChange={handleClose}>
                <DialogTrigger asChild>
                    <Button variant="outline">{title}</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>{typeof open === "string" ? "Cập nhật màu sản phẩm" : "Thêm màu sản phẩm"}</DialogTitle>
                        <DialogDescription>
                            Màu sản phẩm
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                <FormField
                                    control={form.control}
                                    name="name"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tên màu</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="code"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Mã màu</FormLabel>
                                            <FormControl>
                                                <div className='space-y-4'>
                                                    <Input type="color" placeholder="" {...field} />
                                                    <Input placeholder="Mã màu" {...field} />
                                                </div>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit">{typeof open === "string" ? "Cập nhật" : "Thêm"}</Button>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ColorForm