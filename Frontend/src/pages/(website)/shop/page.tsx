import React from 'react'

const ShopPage = () => {
    return (
        <>
            <section className="mt-4 lg:mt-10 mb-[232px] lg:mb-[336px]">
                <div className="container-large ">
                    <div className="grid grid-cols-12 gap-6 md:gap-8 text-[#1A1E26]">
                        {/* sidebar */}
                        <div className="hidden lg:block lg:col-span-3 pr-8 border-r border-[#F4F4F4]">
                            <h3 className="text-[18px] pt-[17px] pb-6 leading-[150%] border-b border-[#F4F4F4]">Filters</h3>
                            {/* categorise */}
                            <div >
                                <h4 className="lg:py-5 text-[#717378] text-xs font-light leading-[150%] tracking-[1px]">PRODUCT
                                    CATEGORY
                                </h4>
                                <div className="border-b border-[#F4F4F4] pb-5">
                                    <label className="category-item">
                                        <div className="flex gap-3 items-center">Sales <p className="text-[11px] text-[#F4F4F4]">|<span className="pl-3 text-base text-[#9D9EA2]">12</span></p>
                                        </div>
                                        <input type="radio" name="radio" />
                                        <span className="checkmark" />
                                    </label>

                                </div>
                            </div>
                            {/* filter by price */}
                            <div >
                                <h4 className="lg:py-5 text-[#717378] text-xs font-light leading-[150%] tracking-[1px]">Filter by
                                    price
                                </h4>
                                <input type="range" defaultValue={400} max={1000} className="w-full cursor-pointer" />
                                <div className="btn-default px-8 py-[9.5px] mt-6">Apply</div>
                            </div>

                        </div>
                        {/* main */}
                        <div className="col-span-12 lg:col-span-9 ">
                            {/* main-title */}
                            <div className="flex justify-between items-center pb-6 border-b border-[#F4F4F4]">
                                <h3 className="text-base lg:text-2xl leading-[150%]">Shop</h3>
                                <div className="relative">
                                    <button className="flex gap-2 lg:gap-3 items-center text-xs lg:text-sm leading-[150%] px-[14px] py-2 lg:px-5 lg:py-[11.5px] border border-[#F4F4F4] rounded-full ">Short
                                        By
                                        Lates <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[14px] h-[14px] text-[#9D9EA2]">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            {/*desc  */}

                            {/* end-slider */}
                            {/* gird-1 */}
                            <div className="grid grid-cols-2 gap-5 md:grid-cols-3 md:gap-8 mt-6 lg:mt-8  ">
                                {/* product-card */}
                                <div className="">
                                    <div className="">
                                        <img src="https://product.hstatic.net/1000096703/product/1_d32a9cd2668848a68ddf48afecf65ec9_grande.jpg" alt="" />
                                    </div>
                                    <div className="text-center mt-4">
                                        <h3 className="font-medium">Áo khoác thun nỉ, đơn giản và năng động. </h3>
                                        <span className="font-semibold">350,000đ</span>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="">
                                        <img src="https://product.hstatic.net/1000096703/product/1_d32a9cd2668848a68ddf48afecf65ec9_grande.jpg" alt="" />
                                    </div>
                                    <div className="text-center mt-4">
                                        <h3 className="font-medium">Áo khoác thun nỉ, đơn giản và năng động. </h3>
                                        <span className="font-semibold">350,000đ</span>
                                    </div>
                                </div>
                                <div className="">
                                    <div className="">
                                        <img src="https://product.hstatic.net/1000096703/product/1_d32a9cd2668848a68ddf48afecf65ec9_grande.jpg" alt="" />
                                    </div>
                                    <div className="text-center mt-4">
                                        <h3 className="font-medium">Áo khoác thun nỉ, đơn giản và năng động. </h3>
                                        <span className="font-semibold">350,000đ</span>
                                    </div>
                                </div>

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
                        {/* end-main */}
                    </div>
                </div>
            </section>

        </>
    )
}

export default ShopPage