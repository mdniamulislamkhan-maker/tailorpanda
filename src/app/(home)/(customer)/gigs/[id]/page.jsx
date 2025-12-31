"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function GigPage() {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGig = async () => {
      try {
        const res = await fetch(`/api/gigs/${id}`);
        if (!res.ok) throw new Error("Gig not found");
        const data = await res.json();
        setGig(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGig();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading gig...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500 font-semibold">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="max-w-3xl w-full bg-white rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{gig.title}</h1>
        <p className="text-gray-600 mb-6">{gig.description}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <span className="text-gray-700 font-medium">Price:</span>{" "}
            <span className="text-green-600 font-semibold">BDT {gig.price}</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <span className="text-gray-700 font-medium">Delivery:</span>{" "}
            <span className="text-blue-600 font-semibold">{gig.deliveryTime} days</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <span className="text-gray-700 font-medium">Revisions:</span>{" "}
            <span className="text-purple-600 font-semibold">{gig.revisions}</span>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg shadow-sm">
            <span className="text-gray-700 font-medium">Tailor:</span>{" "}
            <span className="text-gray-800 font-semibold">{gig.tailor.name}</span>
          </div>
        </div>

        <button onClick={()=> window.location.href = `/place-order?tailor=${gig.tailor._id}&gig=${gig._id}`} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors duration-300 cursor-pointer">
          Order from this Tailor
        </button>
      </div>
    </div>
  );
}
