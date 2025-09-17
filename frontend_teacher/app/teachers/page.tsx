"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Teacher = {
  id: string;
  fullName: string;
  email: string;
  phone: string;
};

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get<Teacher[]>("/teachers"); // your API endpoint
        if (Array.isArray(res.data)) {
          setTeachers(res.data);
        } else {
          setTeachers([]);
        }
      } catch (err: any) {
        console.error(err);
        setError("Failed to fetch teachers");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachers();
  }, []);

  if (loading) return <p className="p-4">Loading teachers...</p>;
  if (error) return <p className="p-4 text-red-500">{error}</p>;
  if (!teachers.length) return <p className="p-4">No teachers found.</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Teachers</h1>
      <table className="border-collapse border border-gray-300 w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">ID</th>
            <th className="p-2 border">Full Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((teacher) => (
            <tr key={teacher.id} className="hover:bg-gray-100">
              <td className="p-2 border">{teacher.id}</td>
              <td className="p-2 border">{teacher.fullName}</td>
              <td className="p-2 border">{teacher.email}</td>
              <td className="p-2 border">{teacher.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
