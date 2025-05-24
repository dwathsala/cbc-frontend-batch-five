import UserData from "./userData";
import { Link } from "react-router-dom";

export default function Header(){
    console.log("Header component loading....")
    return(
        <div className="bg-[#FFFF00]">
            <Link to="/">Home</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <a href="https://www.google.com">Google</a>
        </div>
    )
}
//function name should equal to tag that we will create
//to change the text size in manually we use [] like in "text-[100px]"