"use client";
import api from "../../../lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DeleteExam() {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    api.delete(`/exams/${id}`).then(() => router.push("/exams"));
  }, [id, router]);

  return <p>Deleting...</p>;
}
