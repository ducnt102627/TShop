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
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { ICategory } from "@/interfaces/category"
interface FormDialog {
    open: boolean | string;
    title?: "Thêm danh mục" | "Cập nhật";
    labelConfirm?: string;
    handleClose: () => void;
    handlePaging?: () => void;
}
const formSchema = z.object({
    name: z
        .string({
            message: "Tên danh mục không được để trống",
        })
        .min(2, {
            message: "Tên danh mục phải có ít nhất 6 ký tự",
        }),
})
const CategoryForm = ({
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
        },
    })
    // console.log(open);
    const { data } = useQuery({
        queryKey: ['category', open],
        queryFn: async () => {
            const { data } = await instance.get(`/category/get/${open}`);
            form.reset(data.data)
            return data;
        },
    })
    const { mutate } = useMutation({
        mutationFn: async (category: ICategory) => {
            if (typeof open === "string") {
                return await instance.put(`/category/update/${open}`, category);
            } else {
                return await instance.post(`/category/add`, category);
            }
        },
        onSuccess: () => {
            if (typeof open === "string") {
                handleClose();
                toast.success("Bạn đã cập nhật danh mục thành công");
                queryClient.invalidateQueries({
                    queryKey: ['categories'],
                })
            } else {
                handleClose();
                toast.success("Bạn đã thêm danh mục thành công");
                queryClient.invalidateQueries({
                    queryKey: ['categories'],
                })
            }
        },
        onError: () => {
            handleClose();
            toast.success("Vui lòng thử lại!")
        }
    })
    const onSubmit = (data: ICategory) => {
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
                        <DialogTitle>{typeof open === "string" ? "Cập nhật danh mục" : "Thêm danh mục"}</DialogTitle>
                        <DialogDescription>
                            Danh mục sản phẩm
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
                                            <FormLabel>Tên danh mục</FormLabel>
                                            <FormControl>
                                                <Input placeholder="" {...field} />
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

export default CategoryForm