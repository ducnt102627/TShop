
import { ChevronFirst, ChevronLast, MoreVertical } from "lucide-react";
import { useContext, createContext, useState, ReactNode } from "react";

// Định nghĩa kiểu dữ liệu cho context
interface SidebarContextType {
    expanded: boolean;
}

// Tạo context với kiểu dữ liệu đã định nghĩa
const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

// Định nghĩa kiểu dữ liệu cho props của Sidebar
interface SidebarProps {
    children: ReactNode;
}

// Định nghĩa kiểu dữ liệu cho props của SidebarItem
interface SidebarItemProps {
    icon: ReactNode;
    text: string;
    active: boolean;
    alert?: boolean;
}

export default function Sidebar({ children }: SidebarProps) {
    const [expanded, setExpanded] = useState(true)

    return (
        <aside className="">
            <nav className=" flex flex-col bg-white border-r shadow-sm">
                <div className="p-4 pb-2 flex justify-between items-center">

                    <div className={`overflow-hidden transition-all ${expanded ? "w-full" : "w-0"
                        }`}>
                        <div className='flex items-center space-x-3 '>
                            <img src="https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjZ8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D" alt=""
                                className='w-9 h-9 rounded-full border-transparent' />
                            <h3 className="text-base font-semibold">Nguyễn Tuấn Đức</h3>
                        </div>
                    </div>
                    <button
                        onClick={() => setExpanded((curr) => !curr)}
                        className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
                    >
                        {expanded ? <ChevronFirst /> : <ChevronLast />}
                    </button>
                </div>

                <SidebarContext.Provider value={{ expanded }}>
                    <ul className="flex-1 px-3">{children}</ul>
                </SidebarContext.Provider>

            </nav>
        </aside>
    )
}

export function SidebarItem({ icon, text, active, alert }: any) {
    const context = useContext(SidebarContext);

    if (!context) {
        throw new Error('SidebarItem must be used within a Sidebar');
    }

    const { expanded } = context;

    return (
        <li
            className={`
        relative flex items-center py-2 px-3 my-1
        font-medium rounded-md cursor-pointer
        transition-colors group
        ${active
                    ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                    : "hover:bg-indigo-50 text-gray-600"
                }
    `}
        >
            {icon}
            <span
                className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"
                    }`}
            >
                {text}
            </span>
            {alert && (
                <div
                    className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${expanded ? "" : "top-2"
                        }`}
                />
            )}

            {!expanded && (
                <div
                    className={`
          absolute left-full rounded-md px-2 py-1 ml-6
          bg-indigo-100 text-indigo-800 text-sm
          invisible opacity-20 -translate-x-3 transition-all
          group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      `}
                >
                    {text}
                </div>
            )}
        </li>
    )
}