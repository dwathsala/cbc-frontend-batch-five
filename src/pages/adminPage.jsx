import { Link, Routes, Route, useLocation } from "react-router-dom";
import AdminProductsPage from "./admin/productsPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";

export default function AdminPage() {

    const location = useLocation();
    const path = location.pathname;

    function getClass(name){
        if(path.includes(name)){
            return "bg-accent text-white";
        }else{
            return "text-accent"
        }
    }

    return(
        <div className="w-full h-screen flex">
            <div className="h-full w-[300px] text-accent font-bold p-4 gap-4 text-xl flex flex-col ">
                <Link to="/admin/products">Products</Link>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/orders">Orders</Link>
                <Link to="/admin/reviews">Reviews</Link>
            </div>

            <div className="h-full w-[calc(100%-300px)]">
                <Routes>
                    <Route path="/products" element={<AdminProductsPage/>} />
                    <Route path="/users" element={<h1>Users</h1>} />
                    <Route path="/orders" element={<h1>Orders</h1>} />
                    <Route path="/reviews" element={<h1>Reviews</h1>} />
                    <Route path="/add-product" element={<AddProductPage/>} />
                    <Route path="/edit-product" element={<EditProductPage/>} />
                </Routes>
            </div>
        </div>
    )
}