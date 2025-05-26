import { useState } from "react";
import { compile } from "tailwindcss";

export default function TestPage() {

    const [count,setCount] = useState(0)  //useState(0) initializes count is 0 
    //setCount is use to change the value of count and rerun the component in function without hooks

    return(
        <div className="w-full h-screen flex justify-center items-center">
            <div className="w-[450px] h-[250px] shadow flex justify-center items-center">
                <button onClick={()=>{
                    //console.log("- clicked");
                    setCount(count - 1);

                }} className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer">
                    -
                </button>

                <span className="text-[40px] font-bold text-center w-[100px] h-[40px] mx-[10px] flex justify-center items-center">
                    {count}
                </span>

                 <button onClick={()=>{
                    //console.log("+ clicked");
                    setCount(count + 1);

                }} className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer">
                    +
                </button>
            </div>

        </div>
    )
}