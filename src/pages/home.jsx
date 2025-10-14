import Header from "../components/header" 
import { Route, Routes } from "react-router-dom"
import ProductPage from "./client/productPage"
import ProductOverview from "./client/productOverview"

export default function HomePage(){
    return(
      <div className="w-full h-screen flex flex-col items-center">
        <Header/>
        <div className="w-full h-[calc(100vh-80px)] flex flex-col items-center">
          <Routes path="/*">
            <Route path="/" element={<h1>Home</h1>} />
            <Route path="/products" element={<ProductPage />} />
            <Route path="/about" element={<h1>About</h1>} />
            <Route path="/contact" element={<h1>Contact</h1>} />
            <Route path="/overview" element={<ProductOverview/>} />
            <Route path="/*" element={<h1>404 Not Found</h1> }></Route>
          </Routes>
        </div>
        
      </div>
    )
}