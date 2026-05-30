import type { Metadata } from "next";
import "./globals.css";
import Navbar from "../components/layout/Navbar";

export const metadata: Metadata = {
  title: "CyberAware",
  description: "Educational cybersecurity awareness application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-white text-slate-900">
        <Navbar />

        <main>{children}</main>
      </body>
    </html>
  );
}
