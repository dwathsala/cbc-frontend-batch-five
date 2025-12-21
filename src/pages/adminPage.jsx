import { Link, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import Loading from "../components/loading";
import AdminProductsPage from "./admin/productsPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductPage";
import AdminOrdersPage from "./admin/adminOrdersPage";

export default function AdminPage() {

    const location = useLocation();
    const path = location.pathname;
    const [status, setStatus] = useState(true); 
    
    useEffect(() => {
        console.log("useEffect running - should appear only ONCE");

        const token = localStorage.getItem("token");
        if (!token) {
            setStatus("unauthorized");
            toast.error("You must be logged in to access this page.");
            window.location.href = "/login"; 
        } else {
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => {
                if (res.data.role !== "admin") {
                    setStatus("unauthorized");
                    toast.error("You are not authorized to access this page.");
                    window.location.href = "/";
                } else {
                    setStatus("authenticated");
                }
            }).catch((error) => {
                console.error("Error verifying admin:", error);
                setStatus("unauthorized");
                toast.error("You are not authorized to access this page.");
                window.location.href = "/login";
            });
        }

    },[status]);

    function getClass(name){
        if(path.includes(name)){
            return "bg-accent text-white p-2 rounded-md";
        }else{
            return "text-accent p-2 rounded-md ";
        } 
    }

    if (status === "loading") {
        return (
            <div className="w-full h-screen flex items-center justify-center">
                <Loading/>
            </div>
        );
    }

    if (status !== "authenticated") {
        return null;
    }

    return(
        <div className="w-full h-screen flex">
            {status === "loading" || status == "unauthorized" ?
                <Loading/>:
                <>
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
                            <Route path="/orders" element={<AdminOrdersPage/>} />
                            <Route path="/reviews" element={<h1>Reviews</h1>} />
                            <Route path="/add-product" element={<AddProductPage/>} />
                            <Route path="/edit-product" element={<EditProductPage/>} />
                        </Routes>
                    </div>
                </>
            }
        </div>
    )
}