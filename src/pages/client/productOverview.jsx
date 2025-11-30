import axios from "axios";
import { useState , useEffect } from "react";
import toast from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/loading";
import ImageSlider from "../../components/imageSlider";
import { addToCart, getCart } from "../../utils/cart";

export default function ProductOverview() {
    const params = useParams();
    const productId = params.id;
    const [status, setStatus] = useState("loading"); //loading, error, success
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

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
        <div className="w-full h-full flex flex-col md:flex-row"> 
            <div className="w-full md:w-[50%] h-full flex justify-center items-center">
                <ImageSlider images={product.images} />
            </div>  

            <div className="w-[50%] h-full flex justify-center items-center">
                <div className="w-[500px] h-[600px] flex flex-col items-center">
                    <h1 className="w-full text-center text-4xl font-semibold text-secondary-text">{product.name}
                        {
                            product.altName.map((altName,index)=>{
                                return (
                                    <span key={index} className="text-2xl font-normal text-gray-500"> {" | " +altName} </span>
                                )
                            })
                        }
                    </h1>

                    <h1 className="w-full text-center my-2 text-md text-gray-600 font-semibold">{product.productId}</h1>
                    <p className="w-full text-center my-2 text-md text-gray-600 font-semibold">{product.description}</p>
                    {
                        product.labelledPrice > product.price?
                        <div>
                            <span className="text-4xl mx-4 text-gray-500 line-through">{product.labelledPrice.toFixed(2)}</span>
                            <span className="text-4xl mx-4 font-bold text-accent">{product.price.toFixed(2)}</span>
                        </div>
                        :
                        <div>
                            <span className="text-4xl mx-4 font-bold text-accent">{product.price.toFixed(2)}</span>
                        </div>
                    }

                    <div className="w-full flex justify-center items-center">
                        <button className="bg-green-700 text-white px-6 py-3 rounded-full mt-6 hover:bg-accent-dark mx-4 font-bold cursor-pointer hover:bg-green-800 active:bg-green-600" onClick={
                            ()=>{
                                console.log("Old Cart");
                                console.log(getCart());
                                addToCart(product, 1);
                                console.log("New Cart:");
                                console.log(getCart());
                            }
                        }>Add to Cart</button>
                        
                        <button className="bg-green-700 text-white px-6 py-3 rounded-full mt-6 hover:bg-accent-dark mx-4 font-bold cursor-pointer  hover:bg-green-800 active:bg-green-600"
                        onClick={() => {
                            console.log("Buy Now clicked");
                            console.log("Product:", product); 
                            navigate("/checkout",{
                                state: {
                                    cart: [
                                        {
                                            productId: product.productId,
                                            name: product.name,
                                            price: product.price,
                                            labelledPrice: product.labelledPrice,
                                            image: product.images[0],
                                            qty: 1
                                        }
                                    ]
                                }
                            })
                        }}
                        >
                            Buy Now</button>

                    </div>

                </div>
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

