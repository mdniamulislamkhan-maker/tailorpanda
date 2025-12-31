"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b border-gray-200">
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-extrabold tracking-tight">
          <span className="text-indigo-600">Tailor</span>
          <span className="text-gray-900">Panda</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link href="/gigs" className="hover:text-indigo-600 transition">
            Browse Gigs
          </Link>
          <Link href="/how-it-works" className="hover:text-indigo-600 transition">
            How It Works
          </Link>
          <Link href="/about" className="hover:text-indigo-600 transition">
            About
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {!session ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-indigo-600"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
              >
                Get Started
              </Link>
            </>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition"
              >
                Dashboard
              </Link>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
