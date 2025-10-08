import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import mediaUpload from "../../utils/mediaUpload";


export default function EditProductPage() {


const [productId, setProductId] = useState("");
const [name, setName] = useState("");
const [altName, setAltName] = useState('');
const [description, setDescription] = useState("");
const [images, setImages] = useState([]);
const [labelledPrice, setLabelledPrice] = useState(0);
const [price, setPrice] = useState(0);
const [stock, setStock] = useState(0);
const navigate = useNavigate();

async function updateProduct(){
    const token = localStorage.getItem("token");
    if(token == null){
        toast.error("You are not logged in");
        return;
    }

    if(images.length <= 0){
        toast.error("Please select at least one image");
        return;
    }

    const promisesArray = []

    for(let i=0; i<images.length; i++){ //read all images one by one
        promisesArray[i] = mediaUpload(images[i]); //if there sre 5 images, there will be 5 promises and push them to the array
    }

    try{

        const imageUrls = await Promise.all(promisesArray) //it will run all promises at the same time
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

        axios.post (import.meta.env.VITE_BACKEND_URL+"/api/products", product, {
            headers : {
                "Authorization" : "Bearer "+token
            }
        })
        .then((res)=>{
            //console.log(res.data);
            toast.success("Product added successfully");
            navigate("/admin/products");
        })
        .catch((err)=>{
            //console.log(err);
            toast.error("Error while adding product");
        })
        
    }catch(err){
        toast.error("Error while uploading images");
        return;
    }    
    
}

    return(
    <div className="w-full h-full flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Edit Product</h1>
        <input type="text" placeholder="Product ID" className="input input-bordered w-full max-w-xs" value={productId} onChange={(e)=>{setProductId(e.target.value)}} />
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