import axios from "axios";
import { useState, useEffect } from "react";

export default function AdminOrdersPage() {

    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState("");
    const [isLoading, setIsLoading] = useState(true);   
    
    useEffect(() => {
        if (isLoading) { 
            const Token = localStorage.getItem("Token");
            if (!Token) {
                alert("Please login first.");
                return;
            }
            axios.get(import.meta.env.VITE_API_URL + "/api/orders", {
                headers: {
                    Authorization: "Bearer " + Token,
                },
            }).then((res) => {
                setOrders(res.data);
                setIsLoading(false);
            }
            ).catch((err) => {
                alert("Error fetching orders: " + err.response?.data?.message || "unknown error");
                setIsLoading(false);
            });
        }

          
    }, [isLoading]);
               
    return (
        <div>
            
        </div>
    );
}