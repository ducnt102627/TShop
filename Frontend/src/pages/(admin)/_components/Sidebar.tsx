import Sidebar, { SidebarItem } from '@/configs/SidebarConfig'
import { AlignLeft, BarChart3, LayoutDashboard, Users } from 'lucide-react'
import { Link } from 'react-router-dom'

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
                <Link to="/admin/colors">
                    <SidebarItem text="Màu sắc" />
                </Link>
                <Link to="/admin/sizes">
                    <SidebarItem text="Kích cỡ" />
                </Link>
            </Sidebar>
        </>
    )
}

export default SidebarAdmin