export default function SignUpPage(){
    return(
        <div className="w-full min-h-screen bg-pink-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md flex flex-col items-center">
        <h2 className="text-2xl font-bold text-green-700 mb-4">Sign Up</h2>
        <input type="text" placeholder="Username" className="border p-2 mb-3 w-64 rounded" />
        <input type="email" placeholder="Email" className="border p-2 mb-3 w-64 rounded" />
        <input type="password" placeholder="Password" className="border p-2 mb-4 w-64 rounded" />
        <button className="bg-green-500 text-white px-8 py-2 rounded hover:bg-green-600 font-semibold">Sign Up</button>
      </div>
    </div>
    )
}