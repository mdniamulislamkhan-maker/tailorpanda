"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const MyTailorOrderDetails = () => {
  const params = useParams();
  const { id } = params;

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const res = await fetch(`/api/tailorOrders/${id}`);
        if (!res.ok) throw new Error("Order not found");
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [id]);

  const handleUpdate = async (field, promptMessage, defaultValue = "") => {
    const newValue = prompt(promptMessage, defaultValue);
    if (newValue === null || newValue.trim() === "") return; 

    setUpdating(true);
    try {
      const res = await fetch(`/api/tailorOrders/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ field, value: newValue }),
      });
      if (!res.ok) throw new Error("Update failed");
      const updatedOrder = await res.json();
      setOrder(updatedOrder);
    } catch (err) {
      console.error(err);
      alert("Failed to update order");
    } finally {
      setUpdating(false);
      window.location.reload();
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading order details...
      </div>
    );
  }

  if (!order) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        Order not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8 space-y-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Details</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <p className="text-gray-600"><span className="font-semibold">Order ID:</span> {order._id}</p>
          <p className="text-gray-600"><span className="font-semibold">Status:</span> 
            <span className={`ml-2 px-2 py-1 rounded-full text-white font-semibold ${
              order.status === "pending" ? "bg-yellow-500" :
              order.status === "in-progress" ? "bg-blue-500" :
              order.status === "completed" ? "bg-green-500" :
              "bg-red-500"
            }`}>
              {order.status}
            </span>
          </p>
          <p className="text-gray-600"><span className="font-semibold">Total Price:</span> ৳ {order.totalPrice}</p>
          <p className="text-gray-600"><span className="font-semibold">Phone:</span> {order.phone}</p>
          <p className="text-gray-600"><span className="font-semibold">Address:</span> {order.address}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Order Details</h2>
          <p className="text-gray-600">{order.orderDetails}</p>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Customer Note</h2>
          <p className="text-gray-600">{order.customerNote || "No additional notes from customer."}</p>
        </div>

        <div className="flex flex-col md:flex-row gap-3 mt-6">
          <button
            disabled={updating}
            onClick={() => handleUpdate("status", "Enter new status (pending, in-progress, completed, cancelled):", order.status)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Update Status
          </button>

          <button
            disabled={updating}
            onClick={() => handleUpdate("orderDetails", "Enter new order details:", order.orderDetails)}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Update Details
          </button>

          <button
            disabled={updating}
            onClick={() => handleUpdate("totalPrice", "Enter new total price:", order.totalPrice)}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Update Price
          </button>

          <button
            disabled={updating}
            onClick={() => handleUpdate("status", "Are you sure you want to cancel the order? Type 'cancel' to confirm:", "")}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            Cancel Order
          </button>
        </div>

        {updating && (
          <p className="text-gray-500 mt-2 text-center font-medium">Updating...</p>
        )}
      </div>
    </div>
  );
};

export default MyTailorOrderDetails;
