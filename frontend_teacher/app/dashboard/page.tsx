
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

type Exam = {
  id: string;
  title: string;
  description: string;
  date: string;
};

type Question = {
  id: string;
  text: string;
  exam: { id: string; title: string } | null;
};

export default function Dashboard() {
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [newExam, setNewExam] = useState({ title: "", description: "" });
  const [newQuestion, setNewQuestion] = useState({ examId: "", text: "" });
  const [selectedExamId, setSelectedExamId] = useState(""); // For filtering questions

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      fetchExams();
      fetchQuestions();
    }
  }, [token, router]);

  const fetchExams = async () => {
    try {
      const res = await axios.get("http://localhost:8080/exams", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExams(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch exams");
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/questions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch questions");
    }
  };

  const addExam = async () => {
    if (!newExam.title || !newExam.description) return alert("Enter exam title and description");

    try {
      await axios.post(
        "http://localhost:8080/exams",
        { title: newExam.title, description: newExam.description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewExam({ title: "", description: "" });
      fetchExams();
      alert("Exam added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add exam");
    }
  };

  const updateExam = async (id: string) => {
    const exam = exams.find((e) => e.id === id);
    if (!exam) return alert("Exam not found");

    const newTitle = prompt("Enter new title for exam:", exam.title);
    if (!newTitle) return;
    const newDescription = prompt("Enter new description for exam:", exam.description);
    if (!newDescription) return;

    try {
      await axios.patch(
        `http://localhost:8080/exams/${id}`,
        { title: newTitle, description: newDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchExams();
      alert("Exam updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update exam");
    }
  };

  const deleteExam = async (id: string) => {
    if (!confirm("Are you sure you want to delete this exam?")) return;

    try {
      await axios.delete(`http://localhost:8080/exams/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchExams();
      alert("Exam deleted successfully!");
      if (selectedExamId === id) setSelectedExamId(""); // Clear selection if deleted
    } catch (err) {
      console.error(err);
      alert("Failed to delete exam");
    }
  };

  const addQuestion = async () => {
    if (!newQuestion.examId || !newQuestion.text) return alert("Select exam and enter question");

    try {
      await axios.post(
        "http://localhost:8080/questions",
        { examId: newQuestion.examId, text: newQuestion.text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewQuestion({ examId: "", text: "" });
      fetchQuestions();
      alert("Question added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add question");
    }
  };

  if (loading) return <p className="text-black">Loading dashboard...</p>;

  // Filter questions for the selected exam
  const filteredQuestions = selectedExamId
    ? questions.filter((q) => q.exam?.id === selectedExamId)
    : questions;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded text-black">
      <h1 className="text-3xl font-bold mb-6 text-black">Teacher Dashboard</h1>

    
      <section className="mb-8 text-black">
        <h2 className="text-2xl font-semibold mb-2">Add Exam</h2>
        <div className="flex mb-2">
          <input
            type="text"
            placeholder="Exam title"
            value={newExam.title}
            onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
            className="border p-2 mr-2 flex-1 text-black"
          />
          <input
            type="text"
            placeholder="Exam description"
            value={newExam.description}
            onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
            className="border p-2 mr-2 flex-1 text-black"
          />
          <button
            onClick={addExam}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Add Exam
          </button>
        </div>
      </section>

     
      <section className="mb-8 text-black">
        <h2 className="text-2xl font-semibold mb-2">Exams</h2>
        <ul>
          {exams.map((exam) => (
            <li key={exam.id} className="mb-2 flex justify-between items-center text-black">
              <div>
                <strong>{exam.title}</strong> - {exam.description} <br />
                <span className="text-sm text-black">
                  Date: {new Date(exam.date).toLocaleString()}
                </span>
              </div>
              <div>
                <button
                  onClick={() => updateExam(exam.id)}
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => setSelectedExamId(exam.id)}
                  className="ml-2 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  View Questions
                </button>
                <button
                  onClick={() => deleteExam(exam.id)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
                <button
  onClick={() => router.push(`/exams/${exam.id}`)}
  className="ml-2 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
>
  Exam Details
</button>
              </div>
            </li>
          ))}
        </ul>
      </section>

   
      <section className="mb-8 text-black">
        <h2 className="text-2xl font-semibold mb-2">Add Question</h2>
        <div className="flex mb-2">
          <select
            value={newQuestion.examId}
            onChange={(e) => setNewQuestion({ ...newQuestion, examId: e.target.value })}
            className="border p-2 mr-2 text-black"
          >
            <option value="">Select Exam</option>
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id} className="text-black">
                {exam.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter question"
            value={newQuestion.text}
            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
            className="border p-2 mr-2 flex-1 text-black"
          />
          <button
            onClick={addQuestion}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </section>

 
      <section className="text-black">
        <h2 className="text-2xl font-semibold mb-2">
          Questions {selectedExamId && `(Exam: ${exams.find((e) => e.id === selectedExamId)?.title})`}
        </h2>
        <ul>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => (
              <li key={q.id} className="mb-1 text-black">
                Question: {q.text}
              </li>
            ))
          ) : (
            <li className="text-black">No questions for this exam.</li>
          )}
        </ul>
      </section>
    </div>
  );
}

/*
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Pusher from "pusher-js";

type Exam = {
  id: string;
  title: string;
  description: string;
  date: string;
};

type Question = {
  id: string;
  text: string;
  exam: { id: string; title: string } | null;
};

export default function Dashboard() {
  const router = useRouter();
  const [exams, setExams] = useState<Exam[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [newExam, setNewExam] = useState({ title: "", description: "" });
  const [newQuestion, setNewQuestion] = useState({ examId: "", text: "" });
  const [selectedExamId, setSelectedExamId] = useState(""); // For filtering questions

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // ------------------- Fetch Data -------------------
  useEffect(() => {
    if (!token) {
      router.replace("/login");
    } else {
      fetchExams();
      fetchQuestions();

      // Setup Pusher
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      });
      const channel = pusher.subscribe("exam-channel");
      channel.bind("new-exam", (exam: Exam) => {
        setExams((prev) => [...prev, exam]);
      });

      return () => {
        channel.unbind_all();
        channel.unsubscribe();
      };
    }
  }, [token, router]);

  const fetchExams = async () => {
    try {
      const res = await axios.get("http://localhost:8080/exams", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExams(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch exams");
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      const res = await axios.get("http://localhost:8080/questions", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setQuestions(res.data);
    } catch (err) {
      console.error(err);
      alert("Failed to fetch questions");
    }
  };

  // ------------------- Exam Actions -------------------
  const addExam = async () => {
    if (!newExam.title || !newExam.description) return alert("Enter exam title and description");

    try {
      await axios.post(
        "http://localhost:8080/exams",
        { title: newExam.title, description: newExam.description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewExam({ title: "", description: "" });
      alert("Exam added successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to add exam");
    }
  };

  const updateExam = async (id: string) => {
    const exam = exams.find((e) => e.id === id);
    if (!exam) return alert("Exam not found");

    const newTitle = prompt("Enter new title:", exam.title);
    if (!newTitle) return;
    const newDescription = prompt("Enter new description:", exam.description);
    if (!newDescription) return;

    try {
      await axios.patch(
        `http://localhost:8080/exams/${id}`,
        { title: newTitle, description: newDescription },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchExams();
      alert("Exam updated successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to update exam");
    }
  };

  const deleteExam = async (id: string) => {
    if (!confirm("Are you sure you want to delete this exam?")) return;

    try {
      await axios.delete(`http://localhost:8080/exams/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setExams((prev) => prev.filter((e) => e.id !== id));
      if (selectedExamId === id) setSelectedExamId(""); // Clear selection if deleted
      alert("Exam deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("Failed to delete exam");
    }
  };

  // ------------------- Question Actions -------------------
  const addQuestion = async () => {
    if (!newQuestion.examId || !newQuestion.text) return alert("Select exam and enter question");

    try {
      await axios.post(
        "http://localhost:8080/questions",
        { examId: newQuestion.examId, text: newQuestion.text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewQuestion({ examId: "", text: "" });
      fetchQuestions();
      alert("Question added!");
    } catch (err) {
      console.error(err);
      alert("Failed to add question");
    }
  };

  if (loading) return <p className="text-black">Loading dashboard...</p>;

  const filteredQuestions = selectedExamId
    ? questions.filter((q) => q.exam?.id === selectedExamId)
    : questions;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow rounded text-black">
      <h1 className="text-3xl font-bold mb-6 text-black">Teacher Dashboard</h1>

     
      <section className="mb-8 text-black">
        <h2 className="text-2xl font-semibold mb-2">Add Exam</h2>
        <div className="flex mb-2">
          <input
            type="text"
            placeholder="Exam title"
            value={newExam.title}
            onChange={(e) => setNewExam({ ...newExam, title: e.target.value })}
            className="border p-2 mr-2 flex-1 text-black"
          />
          <input
            type="text"
            placeholder="Exam description"
            value={newExam.description}
            onChange={(e) => setNewExam({ ...newExam, description: e.target.value })}
            className="border p-2 mr-2 flex-1 text-black"
          />
          <button
            onClick={addExam}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Add Exam
          </button>
        </div>
      </section>

    
      <section className="mb-8 text-black">
        <h2 className="text-2xl font-semibold mb-2">Exams</h2>
        <ul>
          {exams.map((exam) => (
            <li key={exam.id} className="mb-2 flex justify-between items-center text-black">
              <div>
                <strong>{exam.title}</strong> - {exam.description} <br />
                <span className="text-sm text-black">
                  Date: {new Date(exam.date).toLocaleString()}
                </span>
              </div>
              <div>
                <button
                  onClick={() => updateExam(exam.id)}
                  className="ml-2 px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Update
                </button>
                <button
                  onClick={() => setSelectedExamId(exam.id)}
                  className="ml-2 px-2 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  View Questions
                </button>
                <button
                  onClick={() => deleteExam(exam.id)}
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-8 text-black">
        <h2 className="text-2xl font-semibold mb-2">Add Question</h2>
        <div className="flex mb-2">
          <select
            value={newQuestion.examId}
            onChange={(e) => setNewQuestion({ ...newQuestion, examId: e.target.value })}
            className="border p-2 mr-2 text-black"
          >
            <option value="">Select Exam</option>
            {exams.map((exam) => (
              <option key={exam.id} value={exam.id} className="text-black">
                {exam.title}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Enter question"
            value={newQuestion.text}
            onChange={(e) => setNewQuestion({ ...newQuestion, text: e.target.value })}
            className="border p-2 mr-2 flex-1 text-black"
          />
          <button
            onClick={addQuestion}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Add
          </button>
        </div>
      </section>

    
      <section className="text-black">
        <h2 className="text-2xl font-semibold mb-2">
          Questions {selectedExamId && `(Exam: ${exams.find((e) => e.id === selectedExamId)?.title})`}
        </h2>
        <ul>
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((q) => (
              <li key={q.id} className="mb-1 text-black">
                Question: {q.text}
              </li>
            ))
          ) : (
            <li className="text-black">No questions for this exam.</li>
          )}
        </ul>
      </section>
    </div>
  );
}
*/