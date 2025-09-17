"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

type Teacher = {
  id: number;
  name: string;
  email: string;
  subject: string;
  status: string;
  adminid: number;
};

export default function DashboardPage() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [form, setForm] = useState<Omit<Teacher, "id">>({
    name: "",
    email: "",
    subject: "",
    status: "active",
    adminid: 1,
  });

  // Fetch all teachers
  const fetchTeachers = async () => {
    try {
      const res = await axios.get("http://localhost:8080/teachers");
      setTeachers(res.data);
    } catch (err) {
      console.error("❌ Error fetching teachers:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add or update teacher
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTeacher) {
        await axios.put(`http://localhost:8080/teachers/${editingTeacher.id}`, form);
        setEditingTeacher(null);
      } else {
        await axios.post("http://localhost:8080/teachers", form);
      }
      setForm({ name: "", email: "", subject: "", status: "active", adminid: 1 });
      fetchTeachers();
    } catch (err) {
      console.error("❌ Error saving teacher:", err);
    }
  };

  // Edit teacher
  const startEdit = (teacher: Teacher) => {
    setEditingTeacher(teacher);
    setForm({
      name: teacher.name,
      email: teacher.email,
      subject: teacher.subject,
      status: teacher.status,
      adminid: teacher.adminid,
    });
  };

  // Delete teacher
  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8080/teachers/${id}`);
      fetchTeachers();
    } catch (err) {
      console.error("❌ Error deleting teacher:", err);
    }
  };

  if (loading) return <p className="text-center">⏳ Loading teachers...</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">📊 Dashboard</h1>

      {/* Teacher Table */}
      <table className="w-full border border-gray-300 mb-6">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Subject</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {teachers.map((t) => (
            <tr key={t.id} className="text-center">
              <td className="border p-2">{t.id}</td>
              <td className="border p-2">{t.name}</td>
              <td className="border p-2">{t.email}</td>
              <td className="border p-2">{t.subject}</td>
              <td className="border p-2">{t.status}</td>
              <td className="border p-2 space-x-2">
                <Link
                  href={`/teachers/${t.id}`}
                  className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                >
                  View
                </Link>
                <button
                  onClick={() => startEdit(t)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(t.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add / Edit Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <h2 className="text-xl font-bold">
          {editingTeacher ? "✏️ Edit Teacher" : "➕ Add Teacher"}
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {editingTeacher ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}
