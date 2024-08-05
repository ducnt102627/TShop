import LayoutAdmin from "@/pages/(admin)/layout"
import Dashboard from "@/pages/(admin)/dashboard/page";
import HomePage from "@/pages/(website)/home/page";
import LayoutWebsite from "@/pages/(website)/layout";
import { Route, Routes } from "react-router-dom";
import CategoryAdmin from "@/pages/(admin)/category/page";
import CategoryForm from "@/pages/(admin)/category/_component/CategoryForm";
import ShopPage from "@/pages/(website)/shop/page";
import ColorAdmin from "@/pages/(admin)/color/page";
import SizeAdmin from "@/pages/(admin)/size/page";
import ProductAdmin from "@/pages/(admin)/product/page";
import ProductForm from "@/pages/(admin)/product/_components/ProductForm";

const Router = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<LayoutWebsite />}>
                    <Route index element={<HomePage />} />
                    <Route path="shop" element={<ShopPage />} />
                </Route>
                <Route path="admin" element={<LayoutAdmin />}>
                    <Route index element={<Dashboard />} />
                    <Route path="category" element={<CategoryAdmin />} />
                    <Route path="products" element={<ProductAdmin />} />
                    <Route path="productAdd" element={<ProductForm />} />
                    <Route path="colors" element={<ColorAdmin />} />
                    <Route path="sizes" element={<SizeAdmin />} />
                    {/* <Route path="category/add" element={<CategoryForm />} /> */}
                </Route>
            </Routes>
        </>
    );
};

export default Router;
