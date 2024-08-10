import React from 'react'

const Sidebar = () => {
    return (
        <>
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
        </>
    )
}

export default Sidebar