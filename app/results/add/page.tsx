"use client";
import { useState } from "react";
import api from "../../../lib/axios";
import { useRouter } from "next/navigation";

export default function AddResultPage() {
  const router = useRouter();
  const [form, setForm] = useState({ studentId: "", score: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/results", form);
    router.push("/results");
  };

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Add Result</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Student ID"
          value={form.studentId}
          onChange={(e) => setForm({ ...form, studentId: e.target.value })}
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Score"
          value={form.score}
          onChange={(e) => setForm({ ...form, score: e.target.value })}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
          Save
        </button>
      </form>
    </div>
  );
}
