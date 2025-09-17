
"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
 
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
 
export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState("");
  const router = useRouter();
 
  // ✅ handleChange
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  // ✅ validate
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
 
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format.";
    }
 
    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  // ✅ handleSubmit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
 
    try {
      const res = await axios.post("http://localhost:8080/admin/login", {
        email: form.email,
        password: form.password,
      });
 
      // save token
      localStorage.setItem("token", res.data.access_token);
 
      alert("✅ Login successful!");
      router.push("/dashboard");
    } catch (err) {
      const error = err as AxiosError<any>;
      const errorData = error.response?.data;
 
      console.error("Login Error:", errorData || error.message);
      setApiError(
        errorData?.message || "Login failed. Please check your credentials."
      );
    }
  };
 
  return (
<div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-10">
<h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
 
      {apiError && <p className="text-red-500">{apiError}</p>}
 
      <form onSubmit={handleSubmit} className="space-y-4">
      
<div>
<FormInput
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
          />
          {errors.email && (
<p className="text-red-500 text-sm">{errors.email}</p>
          )}
</div>
 
       
<div>
<FormInput
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
<p className="text-red-500 text-sm">{errors.password}</p>
          )}
</div>
 
       
<Button text="Login" type="submit" />
</form>
</div>
  );
}
/*
"use client";
 
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
 
import FormInput from "../../components/FormInput";
import Button from "../../components/Button";
 
export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [apiError, setApiError] = useState("");
  const router = useRouter();
 
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
 
  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Invalid email format.";
    }
    if (!form.password.trim()) {
      newErrors.password = "Password is required.";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
 
    try {
      const res = await axios.post("http://localhost:8080/admin/login", {
        email: form.email,
        password: form.password,
      });
 
      localStorage.setItem("token", res.data.access_token);
 
      alert("✅ Login successful!");
      router.push("/dashboard");
    } catch (err) {
      const error = err as AxiosError<any>;
      const errorData = error.response?.data;
      console.error("Login Error:", errorData || error.message);
      setApiError(
        errorData?.message || "Login failed. Please check your credentials."
      );
    }
  };
 
  return (
<div className="min-h-screen bg-gray-100 flex flex-col">
   
<nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow">
<h1 className="text-xl font-bold">MyApp</h1>
<div className="space-x-4">
<a href="/" className="hover:underline">
            Home
</a>
<a href="/register" className="hover:underline">
            Register
</a>
</div>
</nav>
 
      
<div className="flex flex-1 items-center justify-center">
<div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
<h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
            Login
</h2>
 
          {apiError && <p className="text-red-500 text-center">{apiError}</p>}
 
          <form onSubmit={handleSubmit} className="space-y-4">
           
<div>
<FormInput
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
              />
              {errors.email && (
<p className="text-red-500 text-sm">{errors.email}</p>
              )}
</div>
 
            
<div>
<FormInput
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
              />
              {errors.password && (
<p className="text-red-500 text-sm">{errors.password}</p>
              )}
</div>
 
            
<Button text="Login" type="submit" />
</form>
</div>
</div>
</div>
  );
}*/