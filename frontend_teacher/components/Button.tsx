
"use client";

import React from "react";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text?: string; // now optional
  children?: React.ReactNode;
};

export default function Button({ text, children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full mt-2 disabled:opacity-50`}
    >
      {children ?? text}
    </button>
  );
}
