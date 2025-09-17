 
"use client";
 
import { useState } from "react";
 
import axios from "axios";
 
import FormInput from "../../components/FormInput";
 
import Button from "../../components/Button";
 
export default function RegisterPage() {
 
  const [form, setForm] = useState({
 
    name: "",
 
    age: "",
 
    email: "",
 
    password: "",
 
    gender: "",
 
    phoneNumber: "",
 
  });
 
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
 
  const [success, setSuccess] = useState("");
 
  // ✅ FIX: handleChange এখন input বা select দুইটাই নিতে পারবে
 
  const handleChange = (
 
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
 
  ) => {
 
    setForm({ ...form, [e.target.name]: e.target.value });
 
  };
 
  const validate = () => {
 
    const newErrors: { [key: string]: string } = {};
 
    if (!form.name.trim()) {
 
      newErrors.name = "Name is required.";
 
    } else if (!/^[A-Za-z ]+$/.test(form.name)) {
 
      newErrors.name = "Name must contain only letters.";
 
    }
 
    if (!form.age) {
 
      newErrors.age = "Age is required.";
 
    } else if (!/^[0-9]+$/.test(form.age)) {
 
      newErrors.age = "Age must be a number.";
 
    } else if (parseInt(form.age) < 18) {
 
      newErrors.age = "You must be at least 18 years old.";
 
    }
 
    if (!form.email) {
 
      newErrors.email = "Email is required.";
 
    } else if (
 
      !/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(form.email)
 
    ) {
 
      newErrors.email = "Enter a valid email address.";
 
    }
 
    if (!form.password) {
 
      newErrors.password = "Password is required.";
 
    } else if (form.password.length < 6) {
 
      newErrors.password = "Password must be at least 6 characters.";
 
    }
 
    if (!form.gender) {
 
      newErrors.gender = "Gender is required.";
 
    } else if (
 
      !["male", "female", "other"].includes(form.gender.toLowerCase())
 
    ) {
 
      newErrors.gender = "Gender must be Male, Female, or Other.";
 
    }
 
    if (!form.phoneNumber) {
 
      newErrors.phoneNumber = "Phone number is required.";
 
    } else if (!/^(?:\+88|88)?(01[3-9]\d{8})$/.test(form.phoneNumber)) {
 
      newErrors.phoneNumber = "Enter a valid Bangladeshi phone number.";
 
    }
 
    setErrors(newErrors);
 
    return Object.keys(newErrors).length === 0;
 
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
 
    e.preventDefault();
 
    setSuccess("");
 
    if (!validate()) return;
 
    try {
 
      await axios.post("http://localhost:8080/admin/register", form);
 
      setSuccess("✅ Registration successful!");
 
      setForm({
 
        name: "",
 
        age: "",
 
        email: "",
 
        password: "",
 
        gender: "",
 
        phoneNumber: "",
 
      });
 
      setErrors({});
 
    } catch (error: any) {
 
      console.error("Registration error:", error.response?.data || error);
 
      setSuccess("❌ Error: Could not register.");
 
    }
 
  };
 
  return (
<div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow mt-10">
<h2 className="text-2xl font-bold text-center mb-4">Register</h2>
 
      <form onSubmit={handleSubmit} className="space-y-4">
 
        {/* Name */}
<div>
<FormInput
 
            label="Name"
 
            name="name"
 
            value={form.name}
 
            onChange={handleChange}
 
          />
 
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
</div>
 
        {/* Age */}
<div>
<FormInput
 
            label="Age"
 
            name="age"
 
            value={form.age}
 
            onChange={handleChange}
 
          />
 
          {errors.age && <p className="text-red-500 text-sm">{errors.age}</p>}
</div>
 
        {/* Email */}
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
 
        {/* Password */}
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
 
        {/* Gender */}
<div>
<label className="block mb-1">Gender</label>
<select
 
            name="gender"
 
            value={form.gender}
 
            onChange={handleChange}
 
            className="border p-2 w-full rounded"
>
<option value="">Select gender</option>
<option value="male">Male</option>
<option value="female">Female</option>
<option value="other">Other</option>
</select>
 
          {errors.gender && (
<p className="text-red-500 text-sm">{errors.gender}</p>
 
          )}
</div>
 
        {/* Phone */}
<div>
<FormInput
 
            label="Phone Number"
 
            name="phoneNumber"
 
            value={form.phoneNumber}
 
            onChange={handleChange}
 
          />
 
          {errors.phoneNumber && (
<p className="text-red-500 text-sm">{errors.phoneNumber}</p>
 
          )}
</div>
 
        <Button text="Register" type="submit" />
</form>
 
      {success && (
<p
 
          className={`mt-4 text-center font-medium ${
 
            success.startsWith("✅") ? "text-green-600" : "text-red-600"
 
          }`}
>
 
          {success}
</p>
 
      )}
</div>
 
  );
 
}
 
 