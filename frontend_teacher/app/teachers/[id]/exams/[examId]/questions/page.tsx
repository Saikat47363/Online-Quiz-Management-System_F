 
 
 
 
 
"use client";

import { useEffect, useState } from "react";

import api from "../../../../../../lib/axios";

import { useParams } from "next/navigation";
 
export default function ExamQuestionsPage() {

  const params = useParams();

  const teacherId = params?.id;

  const examId = params?.examId;

  const [questions, setQuestions] = useState<any[]>([]);
 
  useEffect(() => {

    if (teacherId && examId) {

      api

        .get(`/teachers/${teacherId}/exams/${examId}/questions`)

        .then((res) => setQuestions(res.data));

    }

  }, [teacherId, examId]);
 
  return (
<div>
<h2 className="text-2xl mb-4">📝 Questions for Exam {examId}</h2>
<ul className="space-y-2">

        {questions.map((q) => (
<li key={q.id} className="border p-3 rounded">
<p className="font-medium">{q.text}</p>
<p className="text-gray-600">Answer: {q.answer}</p>
</li>

        ))}
</ul>
</div>

  );

}

 