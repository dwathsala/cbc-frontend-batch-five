import axios from "axios";
import { useState , useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"

export default function ProductOverview() {
    const params = useParams();
    const productId = params.id;
    const [status, setStatus] = useState("loading"); //loading, error, success
    const [product, setProduct] = useState(null);

    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/"+productId).then(
                (res)=>{
                    console.log(res.data);
                    setProduct(res.data);
                    setStatus("success");

                }
            ).catch(
                (err)=>{
                    console.log(err);
                    setStatus("error");
                    toast.error("Error fetching product details");
                }
            )
        },[]
    )

    return (
        <div>
            This is overview page for product {productId} {JSON.stringify(product)}
        </div>
    )
}

//FBFBFB   background color
//C5BAFF   Accent color
//44444E   secondary text