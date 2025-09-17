"use client";
import { useEffect, useState } from "react";
import api from "../../../lib/axios";
import { useParams, useRouter } from "next/navigation";

export default function EditResult() {
  const { id } = useParams();
  const router = useRouter();
  const [form, setForm] = useState({ score: "" });

  useEffect(() => {
    api.get(`/results/${id}`).then((res) => setForm({ score: res.data.score }));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.patch(`/results/${id}`, form);
    router.push("/results");
  };

  return (
    <div>
      <h1 className="text-xl font-bold">Edit Result</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="number"
          placeholder="Score"
          value={form.score}
          onChange={(e) => setForm({ ...form, score: e.target.value })}
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Update
        </button>
      </form>
    </div>
  );
}
