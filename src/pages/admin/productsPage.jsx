import { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminProductsPage() {

    const [products, setProducts] = useState(sampleProducts)
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect( //have function and dependency array(empty array)
        ()=>{//function only run once at the beginning but if we passed variables to that empty array, it will run again and again when that variable value changes(only sensitive to small variables include string, number, boolean ,not sensitive for json object or array)

            if(isLoading ==true){
                axios.get(import.meta.env.VITE_BACKEND_URL+"/api/products")
                .then(
                    (res)=>{
                        console.log(res.data);
                        setProducts(res.data); //refresh backend data again by again ,it is not good for performance and do not use it any day
                        setIsLoading(false); 
                    }
                );
            }
        },[isLoading] //if isLoading value changes, useEffect function will run again
    );

    function deleteProduct(productId){
        const token = localStorage.getItem("token");
        if(token == null){
            toast.error("You are not logged in");
            return;
        }
        axios.delete(import.meta.env.VITE_BACKEND_URL+"/api/products/" +productId, {
            headers : {
                "Authorization" : "Bearer "+token
            }
        }).then(() =>{
            toast.success("Product deleted successfully");
            setIsLoading(true); 
        }).catch((err) =>{
            toast.error(err.response.data.message);
        })
    }

    return(
        <div className="w-full h-full max-h-full overflow-y-scroll relative">
            <Link to="/admin/add-product" className="absolute text-xl cursor-pointer bottom-5 right-5 bg-green-500 text-white py-2 px-4 rounded text-center flex items-center justify-center">+</Link>

            {//!isLoading && // only display the table when the table is not loading, after loaded display the table (like if condition)
            isLoading ? //like if-else condition
            //: is use to represent else
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-[100px] h-[100px] border-[5px] border-t-blue-600 border-gray-300 rounded-full animate-spin" >

                    </div>
                </div> :   
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
                                        <td>{item.labelledPrice}</td>
                                        <td>{item.price}</td>
                                        <td>{item.stock}</td>
                                        <td>
                                            <div className="flex justify-center items-center space-x-4 cursor-pointer">
                                                <FaTrash className="text-[20px] text-red-600" onClick={() =>{
                                                    deleteProduct(item.productId)
                                                } }/> 
                                                <FaEdit onClick={()=>{
                                                    navigate("/admin/edit-product", {
                                                        state : item //send whole item to edit page by state
                                                    })
                                                }} className="text-[20px] text-blue-600"/> 
                                            </div>
                                        </td>
                                        
                                    </tr>
                                )
                            }
                        )
                    }
                </tbody>

            </table>

}
        </div>
    )
}

//useLocation hook is use to read information from another page