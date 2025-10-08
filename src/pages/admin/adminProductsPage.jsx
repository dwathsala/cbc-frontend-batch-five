import { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminProductsPage() {

    const [products, setProducts] = useState(sampleProducts)

    useEffect( //have function and dependency array(empty array)
        ()=>{//function only run once at the beginning
            axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products")
            .then(
                (res)=>{
                    console.log(res.data);
                    setProducts(res.data); //refresh backend data again by again ,it is not good for performance and do not use it any day
                }
            );
        },[]
    );

    
    return(
        <div className="w-full h-full max-h-full overflow-y-scroll relative">
            <Link to="/admin/add-product" className="absolute text-xl cursor-pointer bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded text-center flex items-center justify-center">+</Link>
            <table className="w-full text-center">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Labelled Price</th>
                        <th>Price</th>
                        <th>Stock</th> 
                        <th>Actions</th>
                    </tr> 
                </thead>

                <tbody>
                    {
                        products.map(
                            (item,index) =>{
                                return(
                                    <tr key={index}>
                                        <td>{item.productId}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <img 
                                                src={item.images[0]} className="w-[50px] h-[50px]"/>
                                        </td>
                                        <td>${item.labelledPrice}</td>
                                        <td>${item.price}</td>
                                        <td>{item.stock}</td>
                                        <td></td>
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>

            </table>
        </div>
    )
}