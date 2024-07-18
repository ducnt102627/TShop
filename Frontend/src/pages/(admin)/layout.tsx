import { Outlet } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts"
import { useOpenSidebar } from "@/store/useSidebarAdmin";
import { useEffect } from "react";
import SidebarAdmin from "./_components/Sidebar";
import { Bell, CircleUser, User } from "lucide-react";
import { Button } from "@/components/ui/button";



const Layout = () => {
    const matches = useMediaQuery("(min-width: 1024px)");
    const { isOpen, setClose } = useOpenSidebar()
    useEffect(() => {
        if (matches) {
            setClose();
        }
    }, [matches])
    return (
        <div className="min-h-[100vh] flex">
            <div className="">
                <SidebarAdmin />
            </div>
            <div className=" w-full">
                {/* header */}
                <div className="flex justify-between px-6 lg:px-8 py-5 bg-white shadow-lg">
                    <h3 className="font-semibold">Trang quản lý</h3>
                    <div className="flex space-x-4">
                        <div className="relative">
                            <span className=""><Bell size={24} /></span>
                            <div className=" absolute -top-[3px] -right-[1px] w-4 h-4 text-white flex items-center justify-center bg-red-500 text-[10px] rounded-full">1</div>
                        </div>
                        <span><CircleUser size={24} /></span>
                    </div>
                </div>
                {/* main */}
                <div className="w-full h-full py-4 px-6 lg:px-8 bg-[#FAFAFA] shadow-inner">

                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Layout;
