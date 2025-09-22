import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/header'
import ProductCard from './components/productCard'
import HomePage from './pages/home'
import LoginPage from './pages/login'
import AdminPage from './pages/adminPage'
import TestPage from './pages/testPage'
import { Toaster } from 'react-hot-toast'
import RegisterPage from './pages/register'


function App() { //full app ------> App()

  return (
    <BrowserRouter>
      <div>
        <Toaster position='top-center'/>

        <Routes path="/*"> 
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage/>} />
          <Route path="/testing" element={<TestPage />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path='/*' element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
 
export default App

//https://zufnjkshbpewbmbsbviy.supabase.co
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp1Zm5qa3NoYnBld2JtYnNidml5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1MjgzMTMsImV4cCI6MjA3NDEwNDMxM30.RAmYTgvIB4RTRtA8vsauO8M2jzm0_r9jl-mv-cEXxVg