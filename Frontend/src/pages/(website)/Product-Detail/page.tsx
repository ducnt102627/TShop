import { getCategory } from '@/services/category';
import { getProductById, getProductBySlug } from '@/services/product';
import { useQuery } from '@tanstack/react-query';
import React from 'react'
import { useParams } from 'react-router-dom'
import Album from './_component/Album';
import InforProduct from './_component/InforProduct';

const ProductDetail = () => {
    const { id } = useParams();
    const { data: product } = useQuery({
        queryKey: ['product_detail', id],
        queryFn: async () => {
            const { data } = await getProductById(id as string);
            console.log(data)
            return data;
        },
        staleTime: 5 * 60 * 60 * 1000
    });
    console.log(product)
    return (
        <>
            <section className="mt-6 lg:mt-10">
                <div className="container-large">
                    <div className="grid grid-cols-12 gap-8">
                        {/* box-img */}
                        <div className="col-span-5 mb-10 lg:mb-0">
                            <Album data={product?.image as string[] || []} />
                        </div>
                        {/* box-right */}
                        <div className="col-span-7 pl-10">
                            <InforProduct data={product || {}} />
                        </div>

                    </div>
                </div>
            </section>
        </>
    )
}

export default ProductDetail