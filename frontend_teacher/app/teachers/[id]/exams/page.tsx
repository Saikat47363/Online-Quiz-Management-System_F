"use client";
import { useEffect, useState } from "react";
import api from "../../../../lib/axios";
import { useParams } from "next/navigation";
import Link from "next/link";
 
export default function TeacherExamsPage() {
  const params = useParams();
  const teacherId = params?.id;
  const [exams, setExams] = useState<any[]>([]);
 
  useEffect(() => {
    if (teacherId) {
      api.get(`/teachers/${teacherId}/exams`).then((res) => setExams(res.data));
    }
  }, [teacherId]);
 
  return (
<div>
<h2 className="text-2xl mb-4">📘 Teacher’s Exams</h2>
<ul className="space-y-2">
        {exams.map((exam) => (
<li key={exam.id} className="border p-3 rounded">
<Link href={`/teachers/${teacherId}/exams/${exam.id}/questions`}>
              {exam.title} ({exam.type})
</Link>
</li>
        ))}
</ul>
</div>
  );
}