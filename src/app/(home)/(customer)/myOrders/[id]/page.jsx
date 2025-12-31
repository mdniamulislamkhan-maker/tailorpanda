"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const MyOrderDetailsPage = () => {
    
    const params = useParams()
    const { id } = params; 


    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const res = await fetch(`/api/myOrders/${id}`);
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
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Order Details</h1>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Order ID:</span> {order._id}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Status:</span> {order.status}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Total Price:</span> ৳ {order.totalPrice}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Address:</span> {order.address}</p>
                <p className="text-gray-600 mb-2"><span className="font-semibold">Phone:</span> {order.phone}</p>
                <p className="text-gray-600 mb-6"><span className="font-semibold">Order Details:</span> {order.orderDetails}</p>

                <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Note</h2>
                <p className="text-gray-600">{order.customerNote || "No additional notes from customer."}</p>

            </div>
        </div>
    );
};
export default MyOrderDetailsPage;