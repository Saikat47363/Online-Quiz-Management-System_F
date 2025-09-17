"use client";
import { useEffect, useState } from "react";
import api from "../../../lib/axios";
import { useParams } from "next/navigation";

export default function ResultDetail() {
  const { id } = useParams();
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    api.get(`/results/${id}`).then((res) => setResult(res.data));
  }, [id]);

  if (!result) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-xl font-bold">Result #{id}</h1>
      <p>Student: {result.studentId}</p>
      <p>Score: {result.score}</p>
    </div>
  );
}
