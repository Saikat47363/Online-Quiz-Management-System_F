"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white p-4 flex space-x-4">
      <Link href="/">Home</Link>
      <Link href="/students">Students</Link>
      <Link href="/results">Results</Link>
      <Link href="/exams">Exams</Link>
      <Link href="/dashboard">Dashboard</Link>
    </nav>
  );
}
