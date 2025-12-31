import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h3 className="text-2xl font-extrabold text-white mb-4">
            TailorBD
          </h3>
          <p className="text-gray-400">
            Premium tailoring marketplace connecting customers with skilled
            tailors.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Explore</h4>
          <ul className="space-y-2">
            <li><Link href="/gigs" className="hover:text-white">Browse Gigs</Link></li>
            <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
            <li><Link href="/about" className="hover:text-white">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Support</h4>
          <ul className="space-y-2">
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
            <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-white mb-4">Stay Updated</h4>
          <p className="text-gray-400 mb-4">
            Get updates on new tailors and exclusive offers.
          </p>
          <div className="flex">
            <input
              type="email"
              placeholder="Email address"
              className="w-full px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white focus:outline-none"
            />
            <button className="px-5 py-2 bg-indigo-600 text-white rounded-r-lg hover:bg-indigo-700 transition">
              Join
            </button>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} TailorBD. All rights reserved.
      </div>
    </footer>
  );
}
