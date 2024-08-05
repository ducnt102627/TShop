import { cn } from '@/common/lib/utils';
import formProductSchema from '@/common/validations/product';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { uploadFileCloudinary } from '@/common/lib/utils';
import { selectStyle } from '@/components/custom-style/selectCustom';
import { Textarea } from '@/components/ui/textarea';
import { IProduct } from '@/interfaces/product';
import { getAllCategories } from '@/services/category';
import { getAllColors } from '@/services/color';
import { addProduct } from '@/services/product';
import { getAllSizes } from '@/services/size';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { CiCirclePlus } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useParams } from 'react-router-dom';
import Select from 'react-select';
import { toast } from 'sonner';

const ProductForm = () => {
    const queryClient = useQueryClient();
    const [categories, setCategories] = useState([])
    const [sizes, setSizes] = useState([]);
    const [colors, setColors] = useState([]);
    const [images, setImages] = useState([]);
    const form = useForm({
        resolver: zodResolver(formProductSchema),
        defaultValues: {
            name: "",
            image: [],
            price: 0,
            category: {
                _id: "",
                name: "",
            },
            description: "",
            discount: 0,
            featured: false,
            countInStock: 0,
            attribute: [
                {
                    size: {
                        _id: "",
                        name: "",
                    },
                    color: {
                        _id: "",
                        name: "",
                    },
                    price: 0,
                    quantity: 0,
                },
            ]
        }
    })
    const control = form.control;
    const { fields, append, remove } = useFieldArray({
        control,
        name: "attribute"
    });
    const { id } = useParams();
    // const { data: product } = useQuery({
    //     queryKey: ['product', id],
    //     queryFn: async () => {
    //         try {
    //             const { data } = await getProductById(id as string);
    //             console.log(data);
    //             return data;
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     }
    // });
    // console.log(product);
    const { mutate } = useMutation({
        mutationFn: async (product: IProduct) => {
            return addProduct(product)
        },
        onSuccess: () => {
            toast.success("Thêm thành công");
            queryClient.invalidateQueries({
                queryKey: ['product'],
            })
        },
        onError: () => {
            toast.error("Vui lòng thử lại!");
        }
    })

    useEffect(() => {
        (async () => {
            try {
                const { data: categoriesData } = await getAllCategories()
                const { data: sizeData } = await getAllSizes();
                const { data: colorData } = await getAllColors();
                setCategories(categoriesData);
                setSizes(sizeData);
                setColors(colorData);
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])
    // console.log("images", images)

    const onSubmit = async (product: any) => {
        try {
            if (!images || images.length === 0) {
                console.log("chọn ảnh")
                toast.error("Vui lòng chọn ít nhất 1 ảnh cho sản phẩm!");
                return;
            }
            // console.log(product.attribute, "attribute")
            const attribute = product.attribute?.map((attribute: any) => (
                { ...attribute, size: attribute.size._id, color: attribute.color._id }
            ))
            const typeAtt = attribute[0];
            console.log(typeAtt)
            console.log(typeof typeAtt)
            // console.log(newAttribute)
            const data = { ...product, category: product.category._id, image: images, attribute: attribute }
            console.log("product", data)
            mutate(data);

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <div className="">
                <h3 className="text-xl font-medium">Thêm sản phẩm</h3>
                <div className="">
                    <div className="shrink-0 bg-border h-[1px] w-full my-6"></div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="grid grid-cols-1 gap-y-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Tên sản phẩm</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" {...field} />
                                                </FormControl>

                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => {
                                            return (
                                                <FormItem className=''>
                                                    <FormLabel>Danh mục</FormLabel>
                                                    <Select
                                                        options={categories}
                                                        {...field}
                                                        getOptionLabel={(option: any) => option.name}
                                                        getOptionValue={(option: any) => option._id}
                                                        styles={selectStyle}
                                                        placeholder="Chọn danh mục"
                                                        onChange={(values: any) => {
                                                            field.onChange(values);
                                                            form.clearErrors('category')
                                                        }}
                                                    />
                                                    <FormMessage />
                                                </FormItem>
                                            )
                                        }}
                                    />

                                </div>
                                <div className="grid grid-cols-1 gap-y-2">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Giá sản phẩm</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Giá" {...field} onChange={(event) => field.onChange(+event.target.value)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="discount"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Giảm giá</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Giảm giá" {...field} onChange={(event) => field.onChange(+event.target.value)} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <FormField
                                control={form.control}
                                name="image"
                                render={({ field }) => (
                                    <FormItem className='w-[50%]'>
                                        <FormLabel>Ảnh sản phẩm</FormLabel>
                                        <FormControl>
                                            <Input type='file' multiple placeholder="" {...field}
                                                onChange={async (e) => {
                                                    const files = e.target.files;
                                                    console.log(files)
                                                    if (!files) return;
                                                    const urls = await Promise.all(
                                                        Array.from(files).map(uploadFileCloudinary)
                                                    )
                                                    setImages(urls as [])
                                                }} />
                                        </FormControl>
                                        <FormMessage />
                                        { }
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="featured"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                        </FormControl>
                                        <div className="space-y-0 leading-none">
                                            <FormLabel>Sản phẩm nổi bật?</FormLabel>
                                        </div>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            {/* biến thể */}
                            <div className="">
                                <FormLabel>
                                    Biến thể
                                </FormLabel>
                                <div className={cn(
                                    "flex flex-col w-full border p-4 md:p-6 gap-5 rounded-lg items-center",
                                    form.formState.errors.attribute && "border-red-500",
                                )}>
                                    <ul className="flex w-full flex-col justify-between gap-4">
                                        {fields.map((item, index) => (
                                            <li key={item.id}
                                                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 w-full gap-4 border-b pb-2">
                                                <FormField
                                                    control={control}
                                                    name={`attribute.${index}.size`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Kích cỡ</FormLabel>
                                                            <FormControl>
                                                                <Select
                                                                    options={sizes}
                                                                    {...field}
                                                                    styles={selectStyle}
                                                                    getOptionLabel={(option: any) => option.name}
                                                                    getOptionValue={(option: any) => option._id}
                                                                    onChange={(values: any) => {
                                                                        field.onChange(values);
                                                                        form.clearErrors(`attribute.${index}.size`)
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={control}
                                                    name={`attribute.${index}.color`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Màu sắc</FormLabel>
                                                            <FormControl>
                                                                <Select options={colors}
                                                                    placeholder="Màu sắc"
                                                                    {...field}
                                                                    styles={selectStyle}
                                                                    getOptionLabel={(option: any) => option.name}
                                                                    getOptionValue={(option: any) => option._id}
                                                                    onChange={(values: any) => {
                                                                        field.onChange(values);
                                                                        form.clearErrors(`attribute.${index}.color`)
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                />
                                                <FormField
                                                    control={control}
                                                    name={`attribute.${index}.price`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Giá</FormLabel>
                                                            <FormControl>
                                                                <Input type='number' placeholder="" {...field}
                                                                    onChange={(event) =>
                                                                        field.onChange(+event.target.value)
                                                                    } />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                >
                                                </FormField>
                                                <FormField
                                                    control={control}
                                                    name={`attribute.${index}.quantity`}
                                                    render={({ field }) => (
                                                        <FormItem>
                                                            <FormLabel>Số lượng</FormLabel>
                                                            <FormControl>
                                                                <Input type='number' placeholder="" {...field}
                                                                    onChange={(event) =>
                                                                        field.onChange(+event.target.value)
                                                                    } />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )}
                                                >
                                                </FormField>
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <button type='button' onClick={() => remove(index)} className={cn(
                                                        "hover:bg-gray-100 p-1 rounded-full",
                                                        fields?.length === 1 && "opacity-30",
                                                    )} disabled={fields.length === 1}>
                                                        <MdDelete color='red' size={25} />
                                                    </button>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="w-full flex justify-center pt-5">
                                        <button type='button' onClick={() => append({ price: 0, size: { name: '', _id: '' }, color: { name: '', _id: '' }, quantity: 0 })}>
                                            <CiCirclePlus size={25} />
                                        </button>
                                    </div>

                                </div>
                                <FormMessage />
                            </div>
                            <FormField
                                control={form.control}
                                name="description"
                                render={({ field }) => (
                                    <FormItem className="flex items-center space-x-3 space-y-0">
                                        <FormControl>
                                            <Textarea className="h-[200px]" placeholder='Mô tả sản phẩm...'{...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit">Thêm sản phẩm</Button>
                        </form>
                    </Form>
                </div>

            </div>
        </>
    )
}

export default ProductForm