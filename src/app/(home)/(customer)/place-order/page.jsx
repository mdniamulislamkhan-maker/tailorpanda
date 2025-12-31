"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function CreateOrderPage() {

    const fetchUser = async () => {
        const res = await fetch("/api/test-session");
        const data = await res.json();
        console.log(data);
        setUserId(data?.user?.id || null);
    }

    useEffect(()=> {
        fetchUser();

    }, [])


    const router = useRouter();

    const searchParams = useSearchParams();
    const [userId, setUserId] = useState(null);

    const tailorId = searchParams.get("tailor");
    const gigId = searchParams.get("gig");


    const [form, setForm] = useState({
        orderDetails: "",
        phone: "",
        address: "",
        customerNote: "",
        totalPrice: "",
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch("/api/place-order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...form,
                    tailor: tailorId,
                    gig: gigId,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            // router.push(`/order-placed/${data.order._id}`);

            router.push(`/order-placed`);

        } catch (err) {
            alert(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 flex items-center justify-center px-4">
            <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">
                    Place Your Order
                </h1>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Order Details *
                        </label>
                        <textarea
                            name="orderDetails"
                            required
                            rows={4}
                            value={form.orderDetails}
                            onChange={handleChange}
                            placeholder="Describe the dress, size, fabric, design, deadline..."
                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number *
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            required
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="01XXXXXXXXX"
                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Delivery Address *
                        </label>
                        <input
                            type="text"
                            name="address"
                            required
                            value={form.address}
                            onChange={handleChange}
                            placeholder="House, Road, Area, City"
                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Agreed Price (৳)
                        </label>
                        <input
                            type="number"
                            name="totalPrice"
                            value={form.totalPrice}
                            onChange={handleChange}
                            placeholder="Optional"
                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Note for Tailor
                        </label>
                        <textarea
                            name="customerNote"
                            rows={2}
                            value={form.customerNote}
                            onChange={handleChange}
                            placeholder="Any special instruction?"
                            className="w-full rounded-xl border border-gray-300 p-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                        />
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition disabled:opacity-50"
                    >
                        {loading ? "Placing Order..." : "Confirm Order"}
                    </button>
                </form>
            </div>
        </div>
    );
}
