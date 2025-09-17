

import Link from "next/link";
 
export default function Header() {

  return (
<header className="bg-gray-800 text-white p-4 flex justify-between">
<h1 className="font-bold">Exam System</h1>
<nav className="space-x-4">

<Link href="/students">Students</Link>
<Link href="/teachers">Teachers</Link>
<Link href="/exams">Exams</Link>
</nav>
</header>

  );

}
<Link href="/dashboard">Dashboard</Link>
 