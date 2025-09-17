"use client";
import api from "../../../lib/axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DeleteResult() {
  const { id } = useParams();
  const router = useRouter();

  useEffect(() => {
    api.delete(`/results/${id}`).then(() => router.push("/results"));
  }, [id, router]);

  return <p>Deleting...</p>;
}
