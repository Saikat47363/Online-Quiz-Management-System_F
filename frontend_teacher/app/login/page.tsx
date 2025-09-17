

"use client";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type LoginValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    // ✅ If already logged in, redirect to dashboard
    const token = localStorage.getItem("token");
    if (token) router.replace("/dashboard");
  }, [router]);

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginValues) => {
    try {
      const res = await axios.post("http://localhost:8080/auth/login", data);

      const token = res.data.access_token;
      if (!token) throw new Error("No token received");

      localStorage.setItem("token", token);

      // ✅ redirect to dashboard
      router.replace("/dashboard");
    } catch (err: any) {
      alert(err.response?.data?.message || err.message || "Invalid email or password");
      console.error(err);
    }
  };

  if (!isMounted) return null;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-black">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="email"
          control={control}
          rules={{ required: "Email required" }}
          render={({ field }) => <Input label="Email" type="email" {...field} error={errors.email?.message} />}
        />
        <Controller
          name="password"
          control={control}
          rules={{ required: "Password required" }}
          render={({ field }) => <Input label="Password" type="password" {...field} error={errors.password?.message} />}
        />
        <Button type="submit" disabled={isSubmitting}>
          Login
        </Button>
      </form>
    </div>
  );
}//////new commit
