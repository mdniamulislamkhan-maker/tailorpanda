"use client"

const OrderPlacedPage = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                <h1 className="text-4xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
                <p className="text-gray-700 mb-6">Thank you for your order. Your tailor will contact you soon.</p>
                <button
                    onClick={() => window.location.href = '/'}

                    className="px-6 py-3 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition"
                >
                    Back to Home
                </button>
            </div>
        </div>
    );
};
export default OrderPlacedPage;
