import axios from "axios";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import Modal from "react-modal";
import toast from "react-hot-toast";

Modal.setAppElement("#root");

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    if (!isLoading) return;

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Please login first");
      return;
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        toast.error(
          err.response?.data?.message || "Failed to load orders"
        );
      })
      .finally(() => setIsLoading(false));
  }, [isLoading]);

  return (
    <div className="w-full h-full overflow-y-scroll p-5">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="overflow-x-auto">
          {/* -------- Modal ---------- */}
          <Modal
            isOpen={isModalOpen}
            onRequestClose={() => setIsModalOpen(false)}
            className="bg-white rounded-xl shadow-2xl max-w-2xl mx-auto mt-20 p-6 outline-none"
            overlayClassName="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-start"
          >
            {activeOrder && (
              <div className="space-y-6">
                {/* Order Header */}
                <div className="flex justify-between items-center border-b pb-3">
                  <h2 className="text-2xl font-bold text-accent">
                    Order #{activeOrder.orderId}
                  </h2>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      activeOrder.status === "pending"
                        ? "bg-yellow-200 text-yellow-800"
                        : activeOrder.status === "completed"
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-800"
                    }`}
                  >
                    {activeOrder.status}
                  </span>
                </div>

                {/* Customer Info */}
                <div className="bg-gray-50 p-4 rounded-lg border">
                  <h3 className="font-semibold text-lg mb-2">
                    Customer Information
                  </h3>
                  <p><strong>Name:</strong> {activeOrder.name}</p>
                  <p><strong>Email:</strong> {activeOrder.email}</p>
                  <p><strong>Phone:</strong> {activeOrder.phone}</p>
                  <p><strong>Address:</strong> {activeOrder.address}</p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(activeOrder.date).toLocaleString()}
                  </p>
                </div>

                {/* Product List */}
                <div>
                  <h3 className="font-semibold text-lg mb-2">Ordered Products</h3>
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-gray-100 text-gray-700">
                        <th className="px-3 py-2">Product</th>
                        <th className="px-3 py-2">Qty</th>
                        <th className="px-3 py-2">Price</th>
                        <th className="px-3 py-2">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeOrder.products.map((item) => (
                        <tr
                          key={item._id}
                          className="border-b hover:bg-gray-50"
                        >
                          <td className="px-3 py-2 flex items-center gap-3">
                            <img
                              src={item.productInfo.images[0]}
                              alt=""
                              className="w-12 h-12 rounded object-cover border"
                            />
                            {item.productInfo.name}
                          </td>
                          <td className="px-3 py-2">{item.quantity}</td>
                          <td className="px-3 py-2 text-green-600 font-medium">
                            ${item.productInfo.price.toFixed(2)}
                          </td>
                          <td className="px-3 py-2 font-semibold">
                            ${(item.productInfo.price * item.quantity).toFixed(2)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total Price */}
                <div className="text-right font-bold text-xl text-accent border-t pt-3">
                  Order Total: ${activeOrder.total.toFixed(2)}
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="w-full bg-accent text-white py-2 rounded-lg hover:opacity-90 transition"
                >
                  Close
                </button>
              </div>
            )}
          </Modal>

          {/* -------- Orders Table ---------- */}
          <table className="w-full border-collapse shadow-lg">
            <thead>
              <tr className="bg-accent text-white">
                <th className="px-4 py-3 text-left">Order ID</th>
                <th className="px-4 py-3 text-left">Name</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Total</th>
                <th className="px-4 py-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o, index) => (
                <tr
                  key={o._id}
                  className={`cursor-pointer ${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-blue-50`}
                  onClick={() => {
                    setActiveOrder(o);
                    setIsModalOpen(true);
                  }}
                >
                  <td className="px-4 py-3">{o.orderId}</td>
                  <td className="px-4 py-3">{o.name}</td>
                  <td className="px-4 py-3">{o.email}</td>
                  <td className="px-4 py-3 font-semibold text-green-600">
                    ${o.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        o.status === "pending"
                          ? "bg-yellow-200 text-yellow-800"
                          : o.status === "completed"
                          ? "bg-green-200 text-green-800"
                          : "bg-red-200 text-red-800"
                      }`}
                    >
                      {o.status}
                    </span>
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
