import { OptionsType, typeResponse } from '@/interfaces/options';
import { IProduct } from '@/interfaces/product';
import { formatCurrency, getPaginate } from '@/services/product';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductList = () => {
    // const queryClinet = useQueryClient();
    const [options, setOptions] = useState<OptionsType>({
        page: 1,
        pageSize: 10,
        sort: "createAt",
        _order: "desc",
        tab: 1,
    });
    const [response, setResponse] = useState<typeResponse>({
        currentPage: 0,
        totalPages: 0,
        totalItems: 0,
    });
    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const { data } = await getPaginate(options);
            return data.content
        },
        staleTime: 5 * 1000 * 1000
    })
    return (
        <>
            <div className="col-span-12 lg:col-span-9 ">
                {/* main-title */}
                <div className="flex justify-between items-center pb-6 border-b border-[#F4F4F4]">
                    <h3 className="text-base lg:text-xl font-medium leading-[150%]">Sản phẩm</h3>
                    <div className="relative">
                        <button className="flex gap-2 lg:gap-3 items-center text-xs lg:text-sm leading-[150%] px-[14px] py-2 lg:px-5 lg:py-[11.5px] border border-[#F4F4F4] rounded-full ">Short
                            Săp xếp theo <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[14px] h-[14px] text-[#9D9EA2]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/*desc  */}

                {/* end-slider */}
                {/* gird-1 */}
                <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-8 mt-6 lg:grid-cols-4 lg:mt-8  ">
                    {products && products?.map((item: IProduct, index: number) => (
                        <Link to={`/shop/${item?._id}`}>
                            <div className="block ">
                                <div className="flex relative flex-col items-center justify-center bg-[#F8F8F8] py-5 rounded-lg">
                                    <Link to={`/shop/${item?._id}`}> <img src={item?.image[0]} className=' ' alt="" /></Link>
                                    <div className="w-full h-full absolute  flex items-end justify-center  opacity-0 hover:opacity-100 transition">
                                        <a href="#" className="w-[85%] text-base font-semibold text-center leading-[150%] text-primary  bg-[#F8F8F8] backdrop-blur-sm  rounded-xl transition-none ">
                                            Thêm vào giỏ hàng</a>
                                    </div>
                                </div>
                                <div className="product-content text-left py-5">
                                    <Link to={`/shop/${item?._id}`}>
                                        <h3 className="text-[16px] text-[#1A1E26] font-medium line-clamp-2 hover:underline ">{item?.name}</h3>
                                    </Link>
                                    <div className="mt-3 *:text-sm *:lg:text-base">
                                        <span className="text-primary text-base font-semibold">{formatCurrency(item.price)}</span>
                                    </div>

                                    {/* <a href="#" className="btn-default mt-[20px] px-6 py-[9.5px]">Thêm vào giỏ h</a> */}
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* end-product-card */}
                </div>
                {/*end-grid  */}

                {/* pagination */}
                {/* <div className="lg:flex justify-between items-center border-t border-[#F4F4F4] pt-6">
                                <p className="text-[#717378] text-xs font-light leading-[150%] pb-5 lg:pb-0">Showing 1-30 of 393
                                    results</p>
                                <div className="flex space-x-4 *:w-[36px] *:h-[36px] *:flex *:justify-center *:items-center text-sm text-[#1A1E26] ">
                                    <button className="border border-[#F4F4F4] rounded-full "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[18px] h-[18px]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                    </svg>
                                    </button>
                                    <button className="border border-[#F2F6F4] bg-[#F2F6F4] rounded-full ">1</button>
                                    <button >2</button>
                                    <button >3</button>
                                    <button >4</button>
                                    <button >...</button>
                                    <button >5</button>
                                    <button className="border border-[#F4F4F4] rounded-full "><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[18px] h-[18px]">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                    </svg>
                                    </button>
                                </div>
                            </div> */}
            </div>
        </>
    )
}

export default ProductList