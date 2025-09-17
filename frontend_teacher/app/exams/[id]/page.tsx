"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

type Exam = {
  id: string;
  title: string;
  description: string;
  date: string;
};

type Question = {
  id: string;
  text: string;
  exam: { id: string; title: string } | null;
};

export default function ExamDetailsPage() {
  const params = useParams(); // dynamic route params
  const examId = params.id; 
  const router = useRouter();

  const [exam, setExam] = useState<Exam | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      fetchExamDetails();
      fetchQuestions();
    }
  }, [examId, token]);

  const fetchExamDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/exams/${examId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExam(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch exam details");
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/questions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const examQuestions = res.data.filter((q: Question) => q.exam?.id === examId);
      setQuestions(examQuestions);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch questions");
    }
  };

  if (loading) return <p className="text-black">Loading exam details...</p>;
  if (!exam) return <p className="text-black">Exam not found.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow rounded text-black">
      <h1 className="text-3xl font-bold mb-4 text-black">{exam.title}</h1>
      <p className="mb-2 text-black">{exam.description}</p>
      <p className="mb-4 text-sm text-black">
        Date: {new Date(exam.date).toLocaleString()}
      </p>

      <h2 className="text-2xl font-semibold mb-2 text-black">Questions</h2>
      <ul>
        {questions.length > 0 ? (
          questions.map((q) => (
            <li key={q.id} className="mb-1 text-black">
              {q.text}
            </li>
          ))
        ) : (
          <li className="text-black">No questions for this exam.</li>
        )}
      </ul>
    </div>
  );
}
