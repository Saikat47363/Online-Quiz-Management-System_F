"use client";
import { useEffect, useState } from "react";
import api from "../../../lib/axios";
import { useParams, useRouter } from "next/navigation";

export default function EditExam() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ title: "", date: "" });

  useEffect(() => {
    api.get(`/exams/${id}`).then((res) => setForm({ title: res.data.title, date: res.data.date }));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.patch(`/exams/${id}`, form);
    router.push("/exams");
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Edit Exam</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Exam Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
