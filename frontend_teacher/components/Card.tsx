"use client";

import React, { ReactNode } from "react";
 
interface CardProps {

  title?: string;

  children: ReactNode;

  footer?: ReactNode;

}
 
export default function Card({ title, children, footer }: CardProps) {

  return (
<div className="bg-white shadow-md rounded-lg p-6 hover:shadow-lg transition">

      {title && <h3 className="text-xl font-semibold mb-3">{title}</h3>}
<div className="text-gray-800">{children}</div>

      {footer && <div className="mt-4 border-t pt-2 text-sm text-gray-600">{footer}</div>}
</div>

  );

}

 