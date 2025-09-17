"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header
      style={{
        background: "#2563eb",
        color: "white",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <h1 style={{ fontWeight: "bold", fontSize: "20px", margin: 0 }}>online quiz</h1>

      <nav style={{ display: "flex", gap: "15px" }}>
        <Link href="/" passHref>
          <span style={{ cursor: "pointer", color: "white", textDecoration: "none" }}>Home</span>
        </Link>
        <Link href="/login" passHref>
          <span style={{ cursor: "pointer", color: "white", textDecoration: "none" }}>Login</span>
        </Link>
        <Link href="/register" passHref>
          <span style={{ cursor: "pointer", color: "white", textDecoration: "none" }}>Register</span>
        </Link>
        <Link href="/dashboard" passHref>
          <span style={{ cursor: "pointer", color: "white", textDecoration: "none" }}>Dashboard</span>
        </Link>
      </nav>
    </header>
  );
}
