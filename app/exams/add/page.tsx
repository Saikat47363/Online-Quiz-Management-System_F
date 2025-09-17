"use client";
import { useState } from "react";
import api from "../../../lib/axios";
import { useRouter } from "next/navigation";

export default function AddExamPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", date: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/exams", form);
    router.push("/exams");
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Add Exam</h1>
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
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
