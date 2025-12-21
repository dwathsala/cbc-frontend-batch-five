import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { GrGoogle } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

export default function LoginPage(){

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate =  useNavigate()

  const googleLogin = useGoogleLogin({
    onSuccess: (response) => {
      const accessToken = response.access_token;
      axios.post(import.meta.env.VITE_BACKEND_URL+"/api/users/login/google", {
        accessToken: accessToken
      }).then((response)=>{
        toast.success("Login Successful");
        const token = response.data.token;
        localStorage.setItem("token", token);
        if(response.data.role === "admin"){
          navigate("/admin")
        }else{
          navigate("/")
        }
      })
    }
  })

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
      localStorage.setItem("token", response.data.token); //store token in local storage/ user's browser
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
            
            <button onClick={handleLogin} className="w-[300px] cursor-pointer h-[50px] bg-[#c3efe9] rounded-[20px] font-bold text-white my-[20px] hover:bg-[#a8e0d7] active:bg-[#8dd4c7] active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md">
                Login
            </button>

            <button onClick={googleLogin} className="flex items-center justify-center gap-3 w-[300px] h-[50px] px-6 bg-white border-2 border-gray-300 rounded-[20px] hover:bg-[#00000060] hover:border-[#00000060] active:bg-[#00000030] active:scale-95 transition-all duration-200 shadow-sm hover:shadow-md font-bold text-gray-700 hover:text-white cursor-pointer">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>
                Sign in with Google
              </span>
            </button>

          </div>
        </div>

      </div>
    )
}