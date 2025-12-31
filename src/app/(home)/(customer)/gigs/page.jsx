// app/(customer)/gigs/page.jsx
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CustomerGigsPage() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchGigs = async () => {
    try {
      const res = await fetch("/api/gigs");
      const data = await res.json();
      setGigs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-xl font-semibold">
        Loading gigs...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Available Tailor Gigs</h1>

      {gigs.length === 0 ? (
        <p className="text-gray-500">No gigs available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gigs.map((gig) => (
            <div
            onClick={()=> router.push(`/gigs/${gig._id}`)}
              key={gig._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <h2 className="text-xl font-semibold mb-2">{gig.title}</h2>
              <p className="text-gray-600 mb-4">{gig.description}</p>

              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 font-medium">Price:</span>
                <span className="text-green-600 font-semibold">BDT {gig.price}</span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 font-medium">Delivery:</span>
                <span className="text-blue-600 font-semibold">{gig.deliveryTime} days</span>
              </div>

              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-800 font-medium">Revisions:</span>
                <span className="text-purple-600 font-semibold">{gig.revisions}</span>
              </div>

              <div className="mt-4 text-sm text-gray-500">
                By: <span className="font-medium">{gig.tailor.name}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
