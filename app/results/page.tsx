"use client";
import { useEffect, useState } from "react";
import api from "../../lib/axios";
import Link from "next/link";

export default function ResultsPage() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    api.get("/results").then((res) => setResults(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Results</h1>
      <Link href="/results/add" className="bg-blue-600 text-white px-3 py-1 rounded">
        Add Result
      </Link>
      <ul className="mt-4 space-y-2">
        {results.map((r: any) => (
          <li key={r.id} className="border p-2 rounded flex justify-between">
            <span>Student {r.studentId} → Score: {r.score}</span>
            <div className="space-x-2">
              <Link href={`/results/${r.id}`}>View</Link>
              <Link href={`/results/${r.id}/edit`}>Edit</Link>
              <Link href={`/results/${r.id}/delete`}>Delete</Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
