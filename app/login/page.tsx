

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../lib/axios"; // ✅ axios instance

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", form);

      if (res.data.access_token) {
        // ✅ Save JWT in localStorage
        localStorage.setItem("token", res.data.access_token);

        // ✅ Save student info (convert everything to string)
        if (res.data.user) {
          localStorage.setItem("studentId", String(res.data.user.id));
          localStorage.setItem("studentName", res.data.user.name);
          localStorage.setItem("studentEmail", res.data.user.email);

          // ✅ Redirect to dashboard with studentId
          router.push(`/dashboard/${res.data.user.id}`);
        } else {
          router.push("/dashboard"); // fallback
        }
      } else {
        setError("Invalid login response: token missing");
      }
    } catch (err: any) {
      console.error("Login error:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Password"
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
}


