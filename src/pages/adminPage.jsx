import { Link, Routes, Route, useLocation } from "react-router-dom";
import AdminProductsPage from "./admin/productsPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";

export default function AdminPage() {

    const location = useLocation();
    const path = location.pathname;
 
    function getClass(name){
        if(path.includes(name)){
            return "bg-accent text-white p-2 rounded-md";
        }else{
            return "text-accent p-2 rounded-md ";
        } 
    }

    return(
        <div className="w-full h-screen flex">
            <div className="h-full w-[300px] text-accent font-bold  text-xl flex flex-col mx-2 ">
                <Link className={getClass("products")} to="/admin/products">Products</Link>
                <Link className={getClass("users")} to="/admin/users">Users</Link>
                <Link className={getClass("orders")} to="/admin/orders">Orders</Link>
                <Link className={getClass("review")} to="/admin/reviews">Reviews</Link>
            </div>

            <div className="h-full w-[calc(100%-300px)] border-4 border-accent rounded-md  ">
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