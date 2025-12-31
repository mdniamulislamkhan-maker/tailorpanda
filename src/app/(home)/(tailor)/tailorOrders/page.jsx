"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MyTailorOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/tailorOrders");
        const data = await res.json();
        setOrders(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              Assigned Orders
            </h1>
            <p className="text-gray-500 mt-1">
              Track and manage your tailoring orders
            </p>
          </div>
        </div>

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="h-40 bg-white rounded-xl shadow animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && orders.length === 0 && (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <div className="text-5xl mb-4">🧵</div>
            <h2 className="text-xl font-semibold text-gray-800">
              No orders yet
            </h2>
            <p className="text-gray-500 mt-2">
              You haven’t placed any tailoring orders yet.
            </p>
          </div>
        )}

        {!loading && orders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {orders.map((order) => (
              <div
                onClick={()=> router.push(`/tailorOrders/${order._id}`)}
                key={order._id}
                className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-lg transition p-6 border border-gray-100"
              >
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full
                      ${
                        order.status === "pending" &&
                        "bg-yellow-100 text-yellow-700"
                      }
                      ${
                        order.status === "in-progress" &&
                        "bg-blue-100 text-blue-700"
                      }
                      ${
                        order.status === "completed" &&
                        "bg-green-100 text-green-700"
                      }
                      ${
                        order.status === "cancelled" &&
                        "bg-red-100 text-red-700"
                      }
                    `}
                  >
                    {order.status.replace("-", " ").toUpperCase()}
                  </span>

                  <span className="text-sm text-gray-400">
                    #{order._id.slice(-6)}
                  </span>
                </div>

                <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                  {order.orderDetails}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>
                    📅{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </span>

                  {order.totalPrice && (
                    <span className="font-semibold text-gray-800">
                      ৳ {order.totalPrice}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTailorOrders;
