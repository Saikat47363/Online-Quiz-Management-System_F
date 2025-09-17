<<<<<<< HEAD
/*"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "../../../lib/axios";
 
export default function TeacherDetails() {
  const params = useParams();
  const [teacher, setTeacher] = useState<any>(null);
 
  useEffect(() => {
    if (params?.id) {
      api.get(`/teachers/${params.id}`).then((res) => setTeacher(res.data));
    }
  }, [params?.id]);
 
  if (!teacher) return <p>Loading...</p>;
 
  return (
<div className="p-4 border rounded">
<h2 className="text-xl font-bold">{teacher.name}</h2>
<p>Subject: {teacher.subject}</p>
<p>Email: {teacher.email}</p>
</div>
  );
}*/
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";

type Teacher = {
  id: number;
  name: string;
  email: string;
  subject: string;
  status: string;
  adminid: number;
};

export default function TeacherDetailsPage() {
  const params = useParams();
  const id = params?.id; // get teacher ID from URL
  const [teacher, setTeacher] = useState<Teacher | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchTeacher = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/teachers/${id}`);
        setTeacher(res.data);
      } catch (err) {
        console.error("❌ Error fetching teacher:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTeacher();
  }, [id]);

  if (loading) return <p className="text-center">⏳ Loading teacher...</p>;

  if (!teacher) return <p className="text-center text-red-500">Teacher not found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">👨‍🏫 Teacher Details</h1>
      <p><strong>ID:</strong> {teacher.id}</p>
      <p><strong>Name:</strong> {teacher.name}</p>
      <p><strong>Email:</strong> {teacher.email}</p>
      <p><strong>Subject:</strong> {teacher.subject}</p>
      <p><strong>Status:</strong> {teacher.status}</p>
      <p><strong>Admin ID:</strong> {teacher.adminid}</p>
    </div>
  );
}
=======
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
>>>>>>> f30c23ed12ebe6dac7180569303d24026584a117
