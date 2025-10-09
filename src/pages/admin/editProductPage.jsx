import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import mediaUpload from "../../utils/mediaUpload";


export default function EditProductPage() {

const location = useLocation();  //location is json object
const [productId, setProductId] = useState(location.state.productId);
const [name, setName] = useState(location.state.name);
const [altName, setAltName] = useState(location.state.altName.join(","));
const [description, setDescription] = useState(location.state.description);
const [images, setImages] = useState([]);
const [labelledPrice, setLabelledPrice] = useState(location.state.labelledPrice);
const [price, setPrice] = useState(location.state.price);
const [stock, setStock] = useState(location.state.stock);
const navigate = useNavigate();  //navigate is function
console.log(location);

async function updateProduct(){
    const token = localStorage.getItem("token");
    if(token == null){
        toast.error("You are not logged in");
        return;
    }

    let imageUrls = location.state.images; //default value is old images

    const promisesArray = []

    for(let i=0; i<images.length; i++){ //read all images one by one
        promisesArray[i] = mediaUpload(images[i]); //if there sre 5 images, there will be 5 promises and push them to the array
    }

    try{
        if(images.length > 0){ //if user select new images
             imageUrls = await Promise.all(promisesArray) //it will run all promises at the same time
        }
        console.log(imageUrls);

        const altNamesArray = altName.split(",")

        const product = {
            productId : productId,
            name : name,
            altName : altNamesArray,
            description : description,
            images : imageUrls,
            labelledPrice : Number(labelledPrice),
            price : Number(price),
            stock : Number(stock)
        }

        axios.put (import.meta.env.VITE_BACKEND_URL+"/api/products/" +productId, product, {
            headers : {
                "Authorization" : "Bearer "+token
            }
        })
        .then((res)=>{
            //console.log(res.data);
            toast.success("Product updated successfully");
            navigate("/admin/products");
        })
        .catch((err)=>{
            //console.log(err);
            toast.error("err.response.data.message");
        })
        
    }catch(err){
        console.log(err);
    }    
    
}

    return(
    <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
        <input type="text" disabled placeholder="Product ID" className="input input-bordered w-full max-w-xs" value={productId} onChange={(e)=>{setProductId(e.target.value)}} />
        <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" value={name} onChange={(e)=>{setName(e.target.value)}} />
        <input type="text" placeholder="Alt Name" className="input input-bordered w-full max-w-xs" value={altName} onChange={(e)=>{setAltName(e.target.value)}} />
        <input type="text" placeholder="Description" className="input input-bordered w-full max-w-xs" value={description} onChange={(e)=>{setDescription(e.target.value)}} />
        <input type="file" placeholder="Images" multiple className="input input-bordered w-full max-w-xs" onChange={(e)=>{setImages(Array.from(e.target.files))}} />
        <input type="number" placeholder="Labelled Price" className="input input-bordered w-full max-w-xs" value={labelledPrice} onChange={(e)=>{setLabelledPrice(e.target.value)}} />
        <input type="number" placeholder="Price" className="input input-bordered w-full max-w-xs" value={price} onChange={(e)=>{setPrice(e.target.value)}} />
        <input type="number" placeholder="Stock" className="input input-bordered w-full max-w-xs" value={stock} onChange={(e)=>{setStock(e.target.value)}} />

        <div className="w-full flex justify-center flex-row items-center mt-4">
            <Link to="/admin/products" className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-4">Cancel</Link>
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={updateProduct}>Update Product</button>
        </div>
        
    </div>
)
}