import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import mediaUpload from "../../utils/mediaUpload";

export default function AddProductPage() {

    /*const productSchema = new mongoose.Schema({
    productId : {
        type : String,
        required : true,
        unique : true
    },

    name : {
        type : String,
        required : true
    },

    altName : [
        {type : String}
    ],

    description : {
        type : String,
        required : true
    },

    images : [
        {type : String}
    ],

    labelledPrice :{
        type : Number,
        required : true
    },

    price : {
        type : Number,
        required : true
    },

    stock : {
        type : Number,
        required : true
    },

    isAvailable : {
        type : Boolean,
        required : true,
        default : true
    }
}); */

const [productId, setProductId] = useState("");
const [name, setName] = useState("");
const [altName, setAltName] = useState('');
const [description, setDescription] = useState("");
const [images, setImages] = useState([]);
const [labelledPrice, setLabelledPrice] = useState(0);
const [price, setPrice] = useState(0);
const [stock, setStock] = useState(0);

async function AddProduct(e){
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

        
    }catch(err){
        toast.error("Error while uploading images");
        return;
    }    
    
}

    return(
    <div className="w-full h-full flex flex-col justify-center items-center">
        <input type="text" placeholder="Product ID" className="input input-bordered w-full max-w-xs" value={productId} onChange={(e)=>{setProductId(e.target.value)}} />
        <input type="text" placeholder="Name" className="input input-bordered w-full max-w-xs" value={name} onChange={(e)=>{setName(e.target.value)}} />
        <input type="text" placeholder="Alt Name" className="input input-bordered w-full max-w-xs" value={altName} onChange={(e)=>{setAltName(e.target.value)}} />
        <input type="text" placeholder="Description" className="input input-bordered w-full max-w-xs" value={description} onChange={(e)=>{setDescription(e.target.value)}} />
        <input type="file" placeholder="Images" multiple className="input input-bordered w-full max-w-xs" onChange={(e)=>{setImages(e.target.files)}} />
        <input type="number" placeholder="Labelled Price" className="input input-bordered w-full max-w-xs" value={labelledPrice} onChange={(e)=>{setLabelledPrice(e.target.value)}} />
        <input type="number" placeholder="Price" className="input input-bordered w-full max-w-xs" value={price} onChange={(e)=>{setPrice(e.target.value)}} />
        <input type="number" placeholder="Stock" className="input input-bordered w-full max-w-xs" value={stock} onChange={(e)=>{setStock(e.target.value)}} />

        <div className="w-full flex justify-center flex-row items-center mt-4">
            <Link to="/admin/products" className="bg-red-500 text-white font-bold py-2 px-4 rounded mr-4">Cancel</Link>
            <button className="bg-green-500 text-white font-bold py-2 px-4 rounded" onClick={AddProduct}>Add Product</button>
        </div>
        
    </div>
)
}