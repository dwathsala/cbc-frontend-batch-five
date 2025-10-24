import axios from "axios";
import { useState , useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom"
import Loading from "../../components/loading";
import ImageSlider from "../../components/imageSlider";

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
        <>
        {
        status == "success" && ( 
        <div className="w-full h-full flex flex-row"> 
            <div className="w-[50%] h-full flex justify-center items-center">
                <ImageSlider images={product.images} />
            </div>  

            <div className="w-[50%] h-full bg-blue-500">
                
            </div>          
        </div>
        )}

        {
        status == "loading" && <Loading />
        
        }
        </>
    )
}

// == is use for comparing value only
// === is use for comparing value and type both

