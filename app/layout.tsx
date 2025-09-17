import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Student Exam System",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Arial, sans-serif", background: "#f9f9f9" }}>
        <Header />
        <main style={{ minHeight: "80vh", padding: "20px" }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
