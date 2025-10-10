import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";

export default function ProductPage(){
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(
        ()=>{
            if(isLoading == true){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/").then(
                    (res)=>{
                        setProducts(res.data);
                        setLoading(false);
                    }
                )
            }
        },[isLoading]
    ) 

    return(
        //flex-wrap is use when there is not enough space in a row, it will go to the next row
        <div className="w-full h-full flex flex-wrap justify-center items-center "> 
            {
                products.map(
                    (product) => {
                        return(
                            <ProductCard key={product.productId} product={product}/>
                        )
                    }
                )
            }
        </div>
    )
}