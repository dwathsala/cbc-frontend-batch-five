import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { FaTrash, FaEdit } from "react-icons/fa";
import toast from "react-hot-toast";
import { sampleProducts } from "../../assets/sampleData";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(sampleProducts);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch Products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/products");
        setProducts(res.data);
      } catch (err) {
        toast.error("Failed to load products");
      } finally {
        setIsLoading(false);
      }
    }

    if (isLoading) fetchProducts();
  }, [isLoading]);

  // Delete Product
  function deleteProduct(productId) {
    const Token = localStorage.getItem("Token");

    if (!Token) {
      toast.error("You are not logged in");
      return;
    }

    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, {
        headers: { Authorization: "Bearer " + Token },
      })
      .then(() => {
        toast.success("Product deleted successfully");
        setIsLoading(true);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Error deleting product");
      });
  }

  return (
    <div className="w-full h-full p-4 overflow-y-auto relative">
      
      {/* ADD PRODUCT BUTTON */}
      <Link
        to="/admin/add-product"
        className="fixed bottom-6 right-6 bg-green-600 hover:bg-green-700 transition text-white text-xl py-3 px-6 rounded-full shadow-lg flex items-center justify-center"
      >
        +
      </Link>

      {/* LOADING SPINNER */}
      {isLoading ? (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-16 h-16 border-[6px] border-gray-300 border-t-accent rounded-full animate-spin"></div>
        </div>
      ) : (

        <div className="bg-white border border-accent/40 rounded-xl shadow-sm p-4">
          <h1 className="text-2xl font-heading text-accent pb-4">Products List</h1>

          <table className="w-full border-collapse">
            <thead className="bg-accent text-white text-lg">
              <tr>
                <th className="py-3 px-2">ID</th>
                <th className="py-3 px-2">Name</th>
                <th className="py-3 px-2">Image</th>
                <th className="py-3 px-2">Labelled Price</th>
                <th className="py-3 px-2">Price</th>
                <th className="py-3 px-2">Stock</th>
                <th className="py-3 px-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 hover:bg-primary transition"
                >
                  <td className="py-3 text-center">{item.productId}</td>
                  <td className="py-3 text-center font-semibold">{item.name}</td>

                  {/* Product Image */}
                  <td className="py-3 flex justify-center">
                    <img
                      src={item.images[0]}
                      className="w-14 h-14 rounded-md object-cover border"
                    />
                  </td>

                  <td className="py-3 text-center">{item.labelledPrice}</td>
                  <td className="py-3 text-center">{item.price}</td>
                  <td className="py-3 text-center">{item.stock}</td>

                  {/* ACTION BUTTONS */}
                  <td className="py-3">
                    <div className="flex justify-center gap-5">

                      {/* DELETE */}
                      <button
                        onClick={() => deleteProduct(item.productId)}
                        className="text-red-600 hover:text-red-700 transition p-2 rounded-full bg-red-100 hover:bg-red-200"
                      >
                        <FaTrash size={18} />
                      </button>

                      {/* EDIT */}
                      <button
                        onClick={() =>
                          navigate("/admin/edit-product", { state: item })
                        }
                        className="text-blue-600 hover:text-blue-700 transition p-2 rounded-full bg-blue-100 hover:bg-blue-200"
                      >
                        <FaEdit size={18} />
                      </button>

                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
