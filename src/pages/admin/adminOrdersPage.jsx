import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import Modal from "react-modal"; 

export default function AdminOrdersPage() {

    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true);  
    const [isModalIsOpen, setIsModalOpen] = useState(false); 
    const [activeOrder, setActiveOrder] = useState(0);
    
    useEffect(() => {
        if (isLoading) { 
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Please login first.");
                return;
            }
            axios.get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
                headers: {
                    Authorization: "Bearer " + token,
                },
            }).then((res) => {
                console.log("Orders received:", res.data);
                console.log("Number of orders:", res.data.length);
                console.log("First order structure:", res.data[0]);
                setOrders(res.data);
                //console.log(res.data);
                setIsLoading(false);
            }
            ).catch((err) => {
                alert("Error fetching orders: " + err.response?.data?.message || "unknown error");
                setIsLoading(false);
            });
        }

          
    }, [isLoading]);
               
    return(
        <div className="w-full h-full max-full overflow-y-scroll">
            {isLoading ? (
                <Loading />
            ) : (
                <div className="overflow-x-auto">
                <Modal
                    isOpen={isModalIsOpen}
                    onAfterOpen={() => {}}
                    onRequestClose={() => setIsModalOpen(false)}
                    contentLabel="Example Modal"   
                >
                    <div className="w-full h-full border-2 border-accent rounded-lg p-4">
                        {JSON.stringify(orders[activeOrder])}
                    </div>
                </Modal>

                <table className="w-full border-collapse shadow-lg">
                    <thead>
                        <tr className="bg-accent text-white">
                            <th className="border border-gray-300 px-4 py-3 text-left">Order ID</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Name</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Email</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Phone</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Address</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Total</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Date</th>
                            <th className="border border-gray-300 px-4 py-3 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order, index) => (
                            <tr 
                            onClick={() => {
                                setActiveOrder(index);
                                setIsModalOpen(true)}}
                            
                            key={order._id} className={index % 2 === 0 ? "bg-gray-50" : "bg-white hover:bg-blue-50"}>
                                <td className="border border-gray-300 px-4 py-3">{order.orderId}</td>
                                <td className="border border-gray-300 px-4 py-3">{order.name}</td>
                                <td className="border border-gray-300 px-4 py-3">{order.email}</td>
                                <td className="border border-gray-300 px-4 py-3">{order.phone}</td>
                                <td className="border border-gray-300 px-4 py-3">{order.address}</td>
                                <td className="border border-gray-300 px-4 py-3 font-semibold text-green-600">
                                    ${order.total.toFixed(2)}
                                </td>
                                <td className="border border-gray-300 px-4 py-3">
                                    {new Date(order.date).toLocaleDateString()}
                                </td>
                                <td className="border border-gray-300 px-4 py-3">
                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                        order.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                                        order.status === 'completed' ? 'bg-green-200 text-green-800' :
                                        'bg-red-200 text-red-800'
                                    }`}>
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
            )}
        </div>
    )

}