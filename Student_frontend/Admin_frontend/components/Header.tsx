
"use client";
import Link from "next/link";
 
export default function Header() {
  return (
<header className="bg-blue-600 text-white shadow">
<nav className="container mx-auto flex justify-between items-center py-4 px-6">
<h1 className="text-xl font-bold">online quiz</h1>
<div className="space-x-6">
<Link href="/" className="hover:text-gray-200">Home    </Link>
<Link href="/login" className="hover:text-gray-200">Login    </Link>
<Link href="/register" className="hover:text-gray-200">    Register    </Link>
<Link href="/dashboard" className="hover:text-gray-200">    Dashboard</Link>
</div>
</nav>
</header>
  );
}

