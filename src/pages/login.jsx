import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function LoginPage(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate =  useNavigate()

  async function handleLogin() { // http request going to backend with email and password
    //console.log(email)
    //console.log(password)

    try{
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login", {
        email: email,
        password: password
      })
      //alert("Login Successful");
      toast.success("Login Successful");
      console.log(response.data);
      localStorage.setItem("token", response.data.token); //store token in local storage
      //const token = localStorage.getItem("token");   //to get token from local storage


      if(response.data.role === "admin"){
        //window.location.href = "/admin";  //redirect to admin page,outdated one
        navigate("/admin")  //redirect to admin page,new way
      }else{
        navigate("/")  //redirect to user home page
      }

        

    }catch(e){
      //alert(e.response.data.message);  //we can use alert instead of console.log
      toast.error(e.response.data.message);
    }

  }

    return(
      <div className="w-full h-screen bg-[url('/login.jpg')] bg-center bg-cover flex justify-evenly">
        <div className="w-[50%] h-full ">

        </div>

        <div className="w-[50%] h-full flex justify-center items-center">
          <div className="w-[500px] h-[600px] backdrop-blur-md rounded-[20px] shadow-xl flex flex-col justify-center items-center">
            <input 

              onChange = {
                (e)=>{
                  setEmail(e.target.value); //to update email state with the value of input field
                  //console.log(e.target.value);//to print changes in email evry time (wensa karna hama welawkm karpu wenaskm console eke penwa)
                  //console.log("email has been changes");//to go farward with updated email
                }
              }

              value={email}

            className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] my-[20px]"/>
            <input

              onChange={
                (e)=>{
                  setPassword(e.target.value); //to update password state with the value of input field
                }
              }

              value={password}

            type="password" className="w-[300px] h-[50px] border border-[#c3efe9] rounded-[20px] mb-[20px]"/>
            <button onClick={handleLogin} className="w-[300px] cursor-pointer h-[50px] bg-[#c3efe9] rounded-[20px] font-bold text-white my-[20px]">Login</button>
          </div>
        </div>

      </div>
    )
}