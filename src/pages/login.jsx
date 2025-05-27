import { useState } from 'react';

export default function LoginPage(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin() { // http request going to backend with email and password
    console.log(email)
    console.log(password)
  }

    return(
      <div className="w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex justify-evenly">
        <div className="w-[50%] h-full ">

        </div>

        <div className="w-[50%] h-full flex justify-center items-center">
          <div className="w-[500px] h-[600px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center">
            <input className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[20px]"/>
            <input type="password" className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] mb-[20px]"/>
            <button onClick={handleLogin} className="w-[300px] cursor-pointer h-[50px] bg-[#c3efe9] rounded-[20px] font-bold text-white my-[20px]">Login</button>
          </div>
        </div>

      </div>
    )
}