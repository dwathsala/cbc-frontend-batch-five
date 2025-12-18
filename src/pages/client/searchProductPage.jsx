import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "../../components/productCard";
import Loading from "../../components/loading";

export default function SearchProductPage(){
    const [products, setProducts] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [query, setQuery] = useState("");

  /*useEffect(
        ()=>{
            if(isLoading == true){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products/search/"+query).then(
                    (res)=>{
                        console.log("data loaded" , res.data);
                        setProducts(res.data);
                        setLoading(false);
                    }
                )
            }
        },[isLoading]
    ) */

    useEffect(() => {
        setLoading(true); // Start loading
        
        // If query is empty, fetch all products
        const endpoint = query.trim() === "" 
            ? import.meta.env.VITE_BACKEND_URL + "/api/products"
            : import.meta.env.VITE_BACKEND_URL + "/api/products/search/" + query;
        
        axios.get(endpoint)
            .then((res) => {
                console.log("data loaded", res.data);
                setProducts(res.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
            
    }, [query]);

    return(
        //flex-wrap is use when there is not enough space in a row, it will go to the next row
        <div className="w-full h-full flex flex-wrap justify-center items-center "> 
        <input 
            type="text"
            placeholder="Search for product......"
            className="w-[1200px] p-2 m-4 border border-gray-300 rounded-3xl"
            value={query}
            onChange={(e)=>{
                setQuery(e.target.value);
                setLoading(true);
            }} 
        />
        
            <div className="w-full h-full flex flex-wrap justify-center items-center ">
                {
                    isLoading?(
                        <Loading/>
                    ):
                    products.map(
                        (product) => {
                            return(
                                <ProductCard key={product.productId} product={product}/>
                            )
                        }
                    )
                }
                
                    
                
            </div>
        </div>
    )
}