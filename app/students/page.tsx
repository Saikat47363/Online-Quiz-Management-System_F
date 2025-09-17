"use client";
import { useEffect, useState } from "react";
import api from "../../lib/axios";
import Link from "next/link";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    api.get("/students").then((res) => setStudents(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Students</h1>
      <Link href="/students/add" className="bg-blue-600 text-white px-3 py-1 rounded">
        Add Student
      </Link>
      <ul className="mt-4 space-y-2">
        {students.map((s: any) => (
          <li key={s.id} className="border p-2 rounded flex justify-between">
            <span>{s.name} ({s.email})</span>
            <div className="space-x-2">
              <Link href={`/students/${s.id}`}>View</Link>
              <Link href={`/students/${s.id}/edit`}>Edit</Link>
              <Link href={`/students/${s.id}/delete`}>Delete</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
