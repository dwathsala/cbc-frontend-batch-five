import { Link } from "react-router-dom";

export default function AdminPage() {
    return(
        <div className="w-full h-screen flex">
            <div className="h-full w-[300px] flex flex-col">
                <Link to="/admin/products">Products</Link>
                <Link to="/admin/users">Users</Link>
                <Link to="/admin/orders">Orders</Link>
                <Link to="/admin/reviews">Reviews</Link>
            </div>

            <div className="h-full w-[calc(100%-300px)]  bg-yellow-400">

            </div>
        </div>
    )
}