
/*
export default function Home() {
  return (
    
    <div>
      <h2 className="text-2xl font-bold">Welcome to Online QUIZ</h2>
      <p className="mt-2">Please login or register to continue.</p>
    </div>
  );
}*/

"use client";
import Link from "next/link";
 
export default function HomePage() {
  return (
<div className="text-center mt-20">
<h1 className="text-4xl font-bold">🎓 Student Exam System</h1>
<p className="text-gray-600 mt-4">
        Manage Students, Teachers, Exams, and Results in one platform.
</p>
 
      <div className="mt-8 flex justify-center space-x-4">
<Link
          href="/auth/login" 
          className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
>
         Login 
</Link>
<Link
          href="/auth/register"
          className="px-6 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-600 hover:text-white transition"
>
            Register
</Link>
</div>
</div>
  );
}