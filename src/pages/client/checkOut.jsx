import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiTrash } from "react-icons/bi";
import toast from "react-hot-toast";
import axios from "axios";


export default function CheckOutPage() {
    const location = useLocation();
    console.log(location.state.cart);

    const [cart, setCart] = useState(location.state?.cart || []); 
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");

    function getTotal() {
        let total = 0;
        cart.forEach((item) => {
            total += item.price * item.qty;
        });
        return total;
    }

    function removeFromCart(index) {
        const newCart = cart.filter((item,i) => i !== index); //remove items that don't match the index and create a new array and copy items into it feom the old array
        setCart(newCart);
    }

    function changeQty(index,qty){
        const newQty = cart[index].qty + qty;
        if(newQty <= 0) {
            removeFromCart(index);
            return;
        }else{
            const newCart = [...cart];
            newCart[index].qty = newQty;
            setCart(newCart);
    }
}

    async function placeOrder() {
        const Token = localStorage.getItem("token");
        if(!Token) {
            toast.error("Please login to place order");
            return;
        }

        const orderInformation = {
            products : [],
            phone : phoneNumber,
            address :address,
            localPrice : getTotal()

                /*{productId: "sampleId", qty: 2},
                {productId: "sampleId2", qty: 1}*/ //saample data,in here array should empty            
        }

        for(let i=0; i<cart.length; i++){
            const item = {
                productId : cart[i].productId,
                qty: cart[i].qty,
            }
            orderInformation.products[i] = item
        }

        try{
            const res = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", orderInformation, {
            headers: {
                Authorization: "Bearer " + Token
            }
        })
        toast.success("order placed successfully.")
        console.log(res.data)

        }catch(err){
            console.log(err)
            toast.error("Error placing order")
            return
        }
    }


    return (
        <div className="w-full h-full flex flex-col items-center pt-4 relative">
            <div className="w-[350px] h-[80px] shadow absolute top-1 right-1 flex flex-col justify-center items-center">
                <p className="text-2xl text-secondary-text font-bold">Total: 
                    <span className="text-accent font-bold mx-2">
                        {getTotal().toFixed(2)}
                    </span>
                </p>

                <input 
                    type="text"
                    placeholder="Phone Number"    
                    className="w-full h-[40px] px-2 rounded-lg boredr border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent "   
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Address"
                    className="w-full h-[40px] px-2 rounded-lg boredr border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent "
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />

                <Link></Link>
                 

                <button className="w-[150px] h-[40px] bg-accent text-white font-bold rounded-full flex flex-row justify-center items-center hover:bg-pink-900 cursor-pointer active:bg-accent" onClick={placeOrder} >
                    Place Order
                </button>

            </div>
            {
                cart.map((item , index)=>{
                    return (
                        <div key={item.productId} className="w-[600px] h-[100px] bg-primary shadow-2xl rounded-tl-3xl rounded-bl-3xl flex flex-row my-2 relative justify-center items-center">
                            <img src={item.image} alt={item.name} className="w-[100px] h-[100px] object-cover rounded-3xl"/>
                            <div className="w-[250px] h-full flex flex-col justify-center pl-4">
                                <h1 className="text-xl font-semibold text-secondary-text">{item.name}</h1>
                                <h1 className=" text-md font-medium text-gray-500">{item.productId}</h1>

                                {
                                    item.labelledPrice > item.price?
                                    <div>
                                        <span className="text-md mx-2 text-gray-500 line-through">${item.labelledPrice.toFixed(2)}</span>
                                        <span className="text-md mx-2 font-bold text-accent">${item.price.toFixed(2)}</span>
                                    </div>
                                    :<span className="text-md mx-2 font-bold text-accent">${item.price.toFixed(2)}</span>
                                }
                            </div>

                            <div className="w-[100px] h-full flex flex-row justify-center items-center">
                                <button className="w-8 h-8 bg-accent text-white font-bold rounded-full hover:bg-pink-900 cursor-pointer active:bg-accent"
                                onClick={()=>{
                                    changeQty(index, -1);
                                }}
                                >-</button>
                                <span className="mx-4 text-lg font-semibold text-secondary-text">{item.qty}</span>
                                <button className="w-8 h-8 bg-accent text-white font-bold rounded-full hover:bg-pink-900 cursor-pointer active:bg-accent" onClick={() =>{
                                    changeQty(index, 1);
                                } }>+</button>
                            </div>

                            {/*total*/}
                            <div className="w-[150px] h-full flex flex-col justify-center items-center">
                                <span className="text-md font-medium text-gray-500">Total</span>
                                <span className="text-xl font-bold text-accent">${(item.price * item.qty).toFixed(2)}</span>
                            </div>

                            <div>
                                <button className="absolute top-1 bg-red-600 text-white rounded-full p-2 m-1 right-[-35] cursor-pointer hover:bg-red-700 active:bg-red-600 font-bold"
                                onClick={()=>{
                                    removeFromCart(index);
                                }}
                                ><BiTrash/></button>
                            </div>                            

                        </div>
                    )
                }
                )
            }
        </div>
    );
}