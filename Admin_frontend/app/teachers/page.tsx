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
  const id = params?.id;
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
