"use client";
import { useEffect, useState } from "react";
import api from "../../lib/axios";
import Link from "next/link";

export default function ExamsPage() {
  const [exams, setExams] = useState([]);

  useEffect(() => {
    api.get("/exams").then((res) => setExams(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Exams</h1>
      <Link href="/exams/add" className="bg-blue-600 text-white px-3 py-1 rounded">
        Add Exam
      </Link>
      <ul className="mt-4 space-y-2">
        {exams.map((e: any) => (
          <li key={e.id} className="border p-2 rounded flex justify-between">
            <span>{e.title} ({e.date})</span>
            <div className="space-x-2">
              <Link href={`/exams/${e.id}`}>View</Link>
              <Link href={`/exams/${e.id}/edit`}>Edit</Link>
              <Link href={`/exams/${e.id}/delete`}>Delete</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
