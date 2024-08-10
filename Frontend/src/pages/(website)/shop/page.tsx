import React from 'react'
import Sidebar from './_component/Sidebar'
import ProductList from './_component/ProductList'


const ShopPage = () => {
    return (
        <>
            <section className="mt-4 lg:mt-10 mb-[232px] lg:mb-[336px]">
                <div className="container-large ">
                    <div className="grid grid-cols-12 gap-6 md:gap-8 text-[#1A1E26]">
                        {/* sidebar */}
                        <Sidebar />
                        {/* main */}
                        <ProductList />
                        {/* end-main */}
                    </div>
                </div>
            </section >

        </>
    )
}

export default ShopPage