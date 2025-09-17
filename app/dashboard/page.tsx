"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "./../../lib/axios";

export default function StudentDashboard() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const [student, setStudent] = useState<any>(null);
  const [error, setError] = useState<string>(""); 

  useEffect(() => {
    if (id) {
      api.get(`/students/${id}`)
        .then((res) => setStudent(res.data))
        .catch((err) => {
          console.error("Error fetching student:", err);
          setError("Failed to load student data.");
        });
    }
  }, [id]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!student) return <p>Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {student.name}</h1>
      <p>Email: {student.email}</p>
      <p>Class: {student.className}</p>
      <p>Subject: {student.subject}</p>
    </div>
  );
}
