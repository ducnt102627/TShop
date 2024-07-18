import React, { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form'
import instance from '@/configs/axios'
import { toast } from 'sonner'
interface FormDialog {
    open: boolean | string;
    title?: "Thêm danh mục" | "Cập nhật";
    labelConfirm?: string;
    handleClose: () => void;
    handlePaging: () => void;
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
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
        },
    })
    console.log(open);
    const handleAdd = async (dataForm: any) => {
        try {
            const { data } = await instance.post(`/category/add`, dataForm);
            form.reset;
            handleClose();
            handlePaging();
            toast.success("Bạn đã thêm danh mục thành công");
        } catch (error) {
            console.log(error);
            toast.error("Vui lòng thử lại")
        }
    }
    useEffect(() => {
        if (typeof open === "string") {
            (async () => {
                try {
                    const { data } = await instance.get(`/category/get/${open}`);
                    form.reset(data.data);
                } catch (error) {
                    console.error("Error:", error);
                }
            })();
        }
    }, [open]);
    const handleUpdate = async (dataForm: { name: string }) => {
        try {
            const { data } = await instance.put(`/category/update/${open}`, dataForm);
            handleClose();
            handlePaging();
            toast.success("Bạn đã cập nhật danh mục thành công")
        } catch (error) {
            console.log(error)
        }
    }
    const onSubmit = (data: { name: string }) => {
        if (typeof open === "string") {
            handleUpdate(data)
        } else {
            handleAdd(data)
        }
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