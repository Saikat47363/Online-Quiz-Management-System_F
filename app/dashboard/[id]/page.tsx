"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "../../../lib/axios";
import NotificationsClient from "../../notifications/NotificationsClient"; // ✅ Import

export default function StudentDashboard() {
  const { id } = useParams();
  const router = useRouter();
  const [student, setStudent] = useState<any>(null);
  const [exams, setExams] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string>("");

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    className: "",
    subject: "",
  });

  useEffect(() => {
    if (id) {
      // ✅ Fetch student profile
      api.get(`/students/${id}`).then((res) => {
        setStudent(res.data);
        setEditForm({
          name: res.data.name,
          email: res.data.email,
          className: res.data.className,
          subject: res.data.subject,
        });
      });

      // ✅ Fetch available exams
      api
        .get("/exams")
        .then((res) => setExams(res.data))
        .catch(() => setError("Failed to load exams"));

      // ✅ Fetch results for this student
      api
        .get(`/results/student/${id}`)
        .then((res) => setResults(res.data))
        .catch(() => setError("Failed to load results"));
    }
  }, [id]);

  // ✅ Update Student Profile
  const handleUpdate = async () => {
    try {
      console.log("Updating student with data:", editForm);
      await api.put(`/students/${id}`, editForm);
      alert("Profile updated successfully!");
    } catch (err: any) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Failed to update profile");
    }
  };

  // ✅ Delete Account
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete your account?")) {
      try {
        console.log("Deleting student with ID:", id);
        await api.delete(`/students/${id}`);
        alert("Account deleted");
        localStorage.clear();
        router.push("/login");
      } catch (err: any) {
        console.error("Delete failed:", err.response?.data || err.message);
        alert("Failed to delete account");
      }
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!student) return <p>Loading...</p>;

  return (
    <div className="p-6">
      {/* ✅ Notification Listener */}
      <NotificationsClient />

      <h1 className="text-2xl font-bold mb-4">Welcome, {student.name}</h1>
      <p>Email: {student.email}</p>
      <p>Class: {student.className}</p>
      <p>Subject: {student.subject}</p>

      {/* ✅ Edit Profile */}
      <div className="mt-6 border p-4 rounded bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">Edit Profile</h2>
        <input
          type="text"
          value={editForm.name}
          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
          placeholder="Name"
          className="border p-2 w-full mb-2 rounded"
        />
        <input
          type="email"
          value={editForm.email}
          onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
          placeholder="Email"
          className="border p-2 w-full mb-2 rounded"
        />
        <input
          type="text"
          value={editForm.className}
          onChange={(e) =>
            setEditForm({ ...editForm, className: e.target.value })
          }
          placeholder="Class"
          className="border p-2 w-full mb-2 rounded"
        />
        <input
          type="text"
          value={editForm.subject}
          onChange={(e) =>
            setEditForm({ ...editForm, subject: e.target.value })
          }
          placeholder="Subject"
          className="border p-2 w-full mb-2 rounded"
        />
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Update Profile
        </button>
      </div>

      {/* ✅ Delete Account */}
      <div className="mt-4">
        <button
          onClick={handleDelete}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Delete Account
        </button>
      </div>

      {/* ✅ Take Exam Button */}
      <div className="mt-6">
        <button
          onClick={() => alert("Redirect to exam page")}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Take Exam
        </button>
      </div>

      {/* ✅ Available Exams */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Available Exams</h2>
        {exams.length > 0 ? (
          <ul className="list-disc pl-5">
            {exams.map((exam) => (
              <li key={exam.id}>
                {exam.title} - {exam.subject}
                <button
                  className="ml-3 px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() => alert(`Start exam ${exam.id}`)}
                >
                  Start
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No exams available.</p>
        )}
      </div>

      {/* ✅ My Results */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">My Results</h2>
        {results.length > 0 ? (
          <table className="border w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-2">Exam</th>
                <th className="border px-2">Score</th>
                <th className="border px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((res) => (
                <tr key={res.id}>
                  <td className="border px-2">{res.exam?.title}</td>
                  <td className="border px-2">{res.score ?? "N/A"}</td>
                  <td className="border px-2">{res.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No results yet.</p>
        )}
      </div>
    </div>
  );
}
