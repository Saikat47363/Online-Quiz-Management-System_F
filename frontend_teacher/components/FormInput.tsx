"use client";
import React from "react";
 
export default function FormInput({ label, name, type = "text", value, onChange }: any) {
  return (
<div className="mb-3">
<label className="block text-sm font-medium mb-1">{label}</label>
<input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className="w-full border px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
</div>
  );
}