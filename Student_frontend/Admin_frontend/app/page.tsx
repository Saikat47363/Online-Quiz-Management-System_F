export default function Home() {
  return (
<div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
<h1 className="text-2xl font-bold">Welcome to the online Quiz System</h1>

</div>
  );
}
/*
"use client";
import { useEffect, useState } from "react";
import api from "./../lib/axios";
import Link from "next/link";
 
export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
 
  useEffect(() => {
    api.get("/teachers").then((res) => setTeachers(res.data));
  }, []);
 
  return (
<div>
<h1 className="text-2xl font-bold mb-4">Teachers</h1>
<ul>
        {teachers.map((t) => (
<li key={t.id} className="border p-2 mb-2">
<Link href={`/teachers/${t.id}`} className="text-blue-600 underline">
              {t.name} - {t.subject}
</Link>
</li>
        ))}
</ul>
</div>
  );
}*/