"use client";

import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";

type FormValues = {
  fullName: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  country: string;
};

const NAME_REGEX = /^[A-Za-z\s]+$/;
const PHONE_REGEX = /^\d{11}$/;
const PASSWORD_REGEX = /^(?=.*[@#$&]).{8,}$/;

export default function RegisterPage() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      country: "",
    },
  });

  const [message, setMessage] = useState<{
    type: "success" | "error" | null;
    text: string;
  }>({ type: null, text: "" });

  const onSubmit = async (data: FormValues) => {
    try {
      const { confirmPassword, ...payload } = data;
      await axios.post("http://localhost:8080/teachers", payload);

      setMessage({ type: "success", text: "Registration successful!" });
      reset();
    } catch (err) {
      setMessage({ type: "error", text: "Error during registration!" });
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded bg-white shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-black">Register</h2>

      {/* Show messages */}
      {message.type && (
        <p
          className={`mb-4 ${
            message.type === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message.text}
        </p>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <Controller
          name="fullName"
          control={control}
          rules={{
            required: "Name is required",
            pattern: { value: NAME_REGEX, message: "Only letters allowed" },
          }}
          render={({ field }) => <Input label="Full Name" {...field} />}
        />
        {errors.fullName && (
          <p className="text-red-500">{errors.fullName.message}</p>
        )}

        {/* Phone */}
        <Controller
          name="phone"
          control={control}
          rules={{
            required: "Phone number is required",
            pattern: { value: PHONE_REGEX, message: "Must be 11 digits" },
          }}
          render={({ field }) => <Input label="Phone" {...field} />}
        />
        {errors.phone && (
          <p className="text-red-500">{errors.phone.message}</p>
        )}

        {/* Email */}
        <Controller
          name="email"
          control={control}
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          }}
          render={({ field }) => <Input label="Email" type="email" {...field} />}
        />
        {errors.email && (
          <p className="text-red-500">{errors.email.message}</p>
        )}

        {/* Password */}
        <Controller
          name="password"
          control={control}
          rules={{
            required: "Password is required",
            pattern: {
              value: PASSWORD_REGEX,
              message:
                "Password must be at least 8 characters and include @, #, $, or &",
            },
          }}
          render={({ field }) => (
            <Input label="Password" type="password" {...field} />
          )}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        {/* Confirm Password */}
        <Controller
          name="confirmPassword"
          control={control}
          rules={{
            required: "Confirm password is required",
            validate: (value) =>
              value === watch("password") || "Passwords do not match",
          }}
          render={({ field }) => (
            <Input label="Confirm Password" type="password" {...field} />
          )}
        />
        {errors.confirmPassword && (
          <p className="text-red-500">{errors.confirmPassword.message}</p>
        )}

        {/* Country */}
        <Controller
          name="country"
          control={control}
          rules={{
            pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters allowed" },
          }}
          render={({ field }) => <Input label="Country" {...field} />}
        />
        {errors.country && (
          <p className="text-red-500">{errors.country.message}</p>
        )}

        <Button type="submit" disabled={isSubmitting}>
          Register
        </Button>
      </form>
    </div>
  );
}
