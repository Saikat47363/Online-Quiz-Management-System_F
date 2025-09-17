
"use client";
import * as React from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;                // optional: display an error inline
  containerClassName?: string;   // optional: wrapper styling
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, error, className, containerClassName, id, name, ...props },
  ref
) {
  const inputId = id || name;

  const classes = [
    "block w-full rounded border px-3 py-2 outline-none text-black", // ✅ added text-black here
    error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500",
    className || "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={["w-full", containerClassName || ""].filter(Boolean).join(" ")}>
      {label && (
        <label htmlFor={inputId} className="block mb-1 text-sm font-medium text-gray-700">
          {label}
        </label>
      )}

      <input
        ref={ref}
        id={inputId}
        name={name}
        className={classes}
        {...props}  // ✅ forwards inputMode, type, value, onChange, etc.
      />

      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
});

export default Input;
