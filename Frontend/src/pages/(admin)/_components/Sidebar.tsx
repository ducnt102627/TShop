import Sidebar, { SidebarItem } from '@/configs/SidebarConfig'
import { AlignLeft, BarChart3, LayoutDashboard, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { SiTemporal } from "react-icons/si";
import { RxSize } from "react-icons/rx";
import { IoIosColorFilter } from 'react-icons/io';
const SidebarAdmin = () => {
    return (
        <>
            <Sidebar>
                <Link to="/admin">
                    <SidebarItem icon={<LayoutDashboard size={20} />} text="Trang quản lý" alert />
                </Link>
                <Link to="/admin">
                    <SidebarItem icon={<BarChart3 size={20} />} text="Thống kê" />
                </Link>
                <Link to="/admin/users">
                    <SidebarItem icon={<Users size={20} />} text="Người dùng " />
                </Link>
                <Link to="/admin/category">
                    <SidebarItem icon={<AlignLeft size={20} />} text="Danh mục" />
                </Link>
                <Link to="/admin/products">
                    <SidebarItem icon={<SiTemporal size={20} />} text="Sản phẩm" />
                </Link>
                <Link to="/admin/colors">
                    <SidebarItem icon={<IoIosColorFilter size={20} />} text="Màu sắc" />
                </Link>
                <Link to="/admin/sizes">
                    <SidebarItem icon={<RxSize size={20} />} text="Kích cỡ" />
                </Link>
            </Sidebar>
        </>
    )
}

export default SidebarAdmin