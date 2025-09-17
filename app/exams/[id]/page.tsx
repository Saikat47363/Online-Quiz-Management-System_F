"use client";
import { useEffect, useState } from "react";
import api from "../../../lib/axios";
import { useParams } from "next/navigation";

export default function ExamDetail() {
  const { id } = useParams();
  const [exam, setExam] = useState<any>(null);

  useEffect(() => {
    api.get(`/exams/${id}`).then((res) => setExam(res.data));
  }, [id]);

  if (!exam) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold">Exam: {exam.title}</h1>
      <p>Date: {exam.date}</p>
    </div>
  );
}
