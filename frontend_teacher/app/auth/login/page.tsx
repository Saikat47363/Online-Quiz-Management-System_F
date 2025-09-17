"use client";

import { useForm, Controller } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "../../../lib/axios"; // Axios instance
import FormInput from "../../../components/FormInput";
import Button from "../../../components/Button";

type LoginValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const router = useRouter();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginValues>({
    defaultValues: { email: "", password: "" },
  });

  const [message, setMessage] = useState<{ type: "success" | "error" | null; text: string }>({
    type: null,
    text: "",
  });

  const onSubmit = async (data: LoginValues) => {
    try {
      const res = await api.post("/auth/login", data);

      console.log("Backend response:", res.data); // Debug

      const token = res.data.access_token;

      if (token) {
        localStorage.setItem("token", token);

        setMessage({ type: "success", text: "Login successful!" });
        reset();
        router.push("/dashboard");
      } else {
        setMessage({ type: "error", text: "No token received from backend!" });
      }
    } catch (err: any) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Invalid credentials!",
      });
      console.error("Login error:", err);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto mt-10 bg-white p-6 shadow rounded text-black"
    >
      <h2 className="text-2xl mb-4 text-black">Login</h2>

      {message.type && (
        <p
          className={`mb-4 ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}

      <Controller
        name="email"
        control={control}
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Invalid email",
          },
        }}
        render={({ field }) => (
          <FormInput
            label="Email"
            type="email"
            {...field}
            error={errors.email?.message}
            className="text-black"
          />
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{ required: "Password is required" }}
        render={({ field }) => (
          <FormInput
            label="Password"
            type="password"
            {...field}
            error={errors.password?.message}
            className="text-black"
          />
        )}
      />

      <Button text="Login" type="submit" disabled={isSubmitting} className="text-black" />
    </form>
  );
}
