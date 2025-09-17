"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Exam = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export default function ExamsPage() {
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      fetchExams();
    }
  }, [token, router]);

  const fetchExams = async () => {
    try {
      const res = await axios.get("http://localhost:8080/exams", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExams(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch exams");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-black">Loading exams...</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded text-black">
      <h1 className="text-3xl font-bold mb-6 text-black">All Exams</h1>
      {exams.length === 0 ? (
        <p className="text-black">No exams available.</p>
      ) : (
        <ul>
          {exams.map((exam) => (
            <li
              key={exam.id}
              className="mb-4 p-4 border rounded flex justify-between items-center text-black"
            >
              <div>
                <strong>{exam.title}</strong> - {exam.description} <br />
                <span className="text-sm text-black">
                  Date: {new Date(exam.date).toLocaleString()}
                </span>
              </div>
              <button
                onClick={() => router.push(`/exams/${exam.id}`)}
                className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
