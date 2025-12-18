import {useState} from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function ForgetPasswordPage() {
    const [otpsent, setOtpSent] = useState(false);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function sendOtp() {
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/send-otp",
        {email: email
        }).then((response) => {
            setOtpSent(true);
            toast.success("OTP sent to your email!");
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
        });
    }

    function verfyOtp() { 
        const otpInNumber = parseInt(otp, 10);
        axios.post(import.meta.env.VITE_BACKEND_URL + "/api/users/reset-password", {
            email: email,
            otp: otpInNumber,
            newPassword: newPassword,
        }).then((response) => {
            toast.success("Password reset successful!");
            console.log(response.data);
        }).catch((error) => {
            console.error(error);
            toast.error("Failed to reset password.");
        })
    }
    
    return (
        <div className="w-full h-screen flex justify-center items-center bg-gradient-to-br from-pink-100 to-purple-200 bg-[url('login.jpg')] bg-cover bg-center">
            {
                otpsent?
                <div className="w-[400px] bg-white shadow-2xl rounded-3xl flex flex-col justify-center items-center p-8 gap-4"> 
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Reset Password</h2>
                    <input 
                        type="text" 
                        placeholder="Enter OTP" 
                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent" 
                        value={otp} 
                        onChange={(e)=>{setOtp(e.target.value)}} 
                    />
                    <input 
                        type="password" 
                        placeholder="New Password" 
                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" 
                        value={newPassword} 
                        onChange={(e)=>{setNewPassword(e.target.value)}} 
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" 
                        value={confirmPassword} 
                        onChange={(e)=>{setConfirmPassword(e.target.value)}} 
                    />
                    <button 
                        className="w-full h-12 bg-accent text-white font-bold rounded-full hover:bg-pink-500 transition-colors duration-200 active:scale-95" 
                        onClick={verfyOtp }
                    >
                        Reset Password
                    </button>
                    
                    {/*resend otp button that sets sentOTP false */} 
                    <button 
                        className="w-full h-12 bg-gray-300 text-gray-800 font-bold rounded-full hover:bg-gray-400 transition-colors duration-200 active:scale-95 mt-2" 
                        onClick={()=>{setOtpSent(false)}}
                    >
                        Resend OTP
                    </button>

                </div>
                :
                <div className="w-[400px] bg-white shadow-2xl rounded-3xl flex flex-col justify-center items-center p-8 gap-6">
                    <h2 className="text-2xl font-bold text-gray-800">Forgot Password?</h2>
                    <p className="text-gray-600 text-center text-sm">Enter your email to receive an OTP</p>
                    <input 
                        type="email" 
                        placeholder="Enter Your Email" 
                        className="w-full h-12 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500" 
                        value={email} 
                        onChange={(e)=>{setEmail(e.target.value)}} 
                    />  
                    <button 
                        className="w-full h-12 bg-accent text-white font-bold rounded-full hover:bg-pink-500 transition-colors duration-200 active:scale-95" 
                        onClick={sendOtp}
                    >
                        Send OTP
                    </button>
                </div>
            }
        </div> 
    )
}