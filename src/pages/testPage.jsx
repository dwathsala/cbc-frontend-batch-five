import { useState } from "react";
import { compile } from "tailwindcss";

export default function TestPage() {

    const [count,setCount] = useState(0)  //useState(0) initializes count is 0   //setCount is use to change the value of count and rerun the component in function without hooks
    const [status,setStatus] = useState("Passed") //useState("Passed") initializes status is Passed

    return(
        <div className="w-full h-screen flex justify-center items-center flex-col">
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

            

            <div className="w-[450px] h-[250px] shadow flex flex-col justify-center items-center">
                {/*id user passed or failed span tag*/}
                <span className="text-[40px] font-bold text-center w-[100px] h-[40px] mx-[10px] flex justify-center items-center">
                    {status}
                </span>

                <div>
                    <button className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer m-[20px]" onClick={
                        ()=>{
                            setStatus("Passed");
                            }
                    }>
                        Passed
                    </button>

                    <button className="bg-blue-600 text-white font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer m-[20px]" onClick={
                        ()=>{
                            setStatus("Failed");
                            }
                    }>
                        Failed
                    </button>
                </div>
            </div>

        </div>
    )
}