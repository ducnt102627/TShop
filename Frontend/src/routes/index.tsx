import LayoutAdmin from "@/pages/(admin)/layout"
import Dashboard from "@/pages/(admin)/dashboard/page";
import HomePage from "@/pages/(website)/home/page";
import LayoutWebsite from "@/pages/(website)/layout";
import { Route, Routes } from "react-router-dom";
import CategoryAdmin from "@/pages/(admin)/category/page";
import CategoryForm from "@/pages/(admin)/category/_component/CategoryForm";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<HomePage />} />
                </Route>
                <Route path="admin" element={<LayoutAdmin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="category" element={<CategoryAdmin />} />
                    <Route path="category/add" element={<CategoryForm />} />
                </Route>
            </Routes>
        </>
    );
};

export default Router;
