import React from 'react'
import { ScrollArea } from "@/components/ui/scroll-area"
import { NavLink } from 'react-router-dom'
import MenuAdmin from './MenuAdmin'
const SidebarAdmin = () => {
    return (
        <>
            <ScrollArea className='w-[280px] h-full px-8  overflow-y-auto '>
                <div className="mt-2 mb-6 py-4  flex justify-center border-transparent rounded-xl bg-slate-100 ">
                    <div className="flex items-center  space-x-3  ">
                        <div className=''>
                            <img src="https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" alt=""
                                className='w-10 h-10 rounded-full border-transparent' />
                        </div>
                        <div className="text-base font-semibold">Nguyễn Tuấn Đức</div>
                    </div>
                </div>
                <div className='flex flex-col'>
                    {/* {MenuAdmin.map((item, index) => (
                        <NavLink to="" className="text-base font-medium text-[#09090B] py-3">
                            {item.label}
                        </NavLink>
                    ))} */}
                    <NavLink to="/admin/category">Danh mục</NavLink>
                    <NavLink to="/admin/category">Sản phẩm</NavLink>
                    <NavLink to="/admin/category">Màu sắc</NavLink>
                    <NavLink to="/admin/category">Kích cỡ</NavLink>

                </div>
            </ScrollArea>
        </>
    )
}

export default SidebarAdmin