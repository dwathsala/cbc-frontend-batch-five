import { useState } from "react";
import { Link } from "react-router-dom";
import { addToCart, getCart, removeFromCart, getTotal } from "../../utils/cart";
import { BiTrash } from "react-icons/bi";

export default function CartPage() {
    const [cart, setCart] = useState(getCart()); 
    
    return (
        <div className="w-full h-full flex flex-col items-center pt-4 relative">
            <div className="w-[350px] h-[80px] shadow absolute top-1 right-1 flex flex-col justify-center items-center">
                <p className="text-2xl text-secondary-text font-bold">Total: 
                    <span className="text-accent font-bold mx-2">
                        {getTotal().toFixed(2)}
                    </span>
                </p>

                <Link to="/checkout" className="w-[150px] h-[40px] bg-accent text-white font-bold rounded-full flex flex-row justify-center items-center hover:bg-pink-900 cursor-pointer active:bg-accent">
                    Checkout
                </Link>

            </div>
            {
                cart.map((item)=>{
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
                                    addToCart(item, -1);
                                    setCart(getCart());
                                }}
                                >-</button>
                                <span className="mx-4 text-lg font-semibold text-secondary-text">{item.qty}</span>
                                <button className="w-8 h-8 bg-accent text-white font-bold rounded-full hover:bg-pink-900 cursor-pointer active:bg-accent" onClick={() =>{
                                    addToCart(item, 1); //add one more item to the cart
                                    setCart(getCart()); //update the cart state to reflect the changes
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
                                    removeFromCart(item.productId);
                                    setCart(getCart()); //refresh cart
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