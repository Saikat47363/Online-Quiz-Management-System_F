"use client";
import { useEffect, useState } from "react";
import api from "../../../lib/axios";
import { useParams } from "next/navigation";
import Link from "next/link";
 
export default function TeacherDetailsPage() {
  const params = useParams();
  const teacherId = params?.id;
  const [teacher, setTeacher] = useState<any>(null);
  const [exams, setExams] = useState<any[]>([]);
 
  useEffect(() => {
    if (teacherId) {
      api.get(`/teachers/${teacherId}`).then((res) => setTeacher(res.data));
      api.get(`/teachers/${teacherId}/exams`).then((res) => setExams(res.data));
    }
  }, [teacherId]);
 
  return (
<div>
      {teacher && (
<div className="bg-white p-6 shadow rounded mb-4">
<h2 className="text-2xl font-bold">{teacher.name}</h2>
<p className="text-gray-600">{teacher.email}</p>
</div>
      )}
 
      <h3 className="text-xl font-semibold mb-2">📘 Exams</h3>
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