import { createClient } from "@supabase/supabase-js";
import { useState } from "react";
import { compile } from "tailwindcss";


export default function TestPage() {
    const [image, setImage] = useState(null);

    const url = "https://zufnjkshbpewbmbsbviy.supabase.co";
    const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1Zm5qa3NoYnBld2JtYnNidml5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1MjgzMTMsImV4cCI6MjA3NDEwNDMxM30.RAmYTgvIB4RTRtA8vsauO8M2jzm0_r9jl-mv-cEXxVg";

    const supabase = createClient(url, key); //make connection with supabase

    function fileUpload(){
        supabase.storage.from("images").upload(image.name, image, {
            upsert: false,
            cacheControl: '3600',
        }).then((res)=>{
            const publicUrl = supabase.storage.from("images").getPublicUrl(image.name).data.publicUrl
            console.log(publicUrl);
        
        }).catch((e)=>{
            console.log(e);
        })
    }

    return(
        <div className="w-full h-screen flex justify-center items-center flex-col">
            <input type="file" className="file-input file-input-bordered w-full max-w-xs" 
            onChange={(e)=>{
                
                setImage(e.target.files[0]);

            }}/>
            <button onClick={fileUpload} className="bg-green-500 text-white font-bold py-2 px-4 rounded">Upload</button>
        </div>
            
    )
}