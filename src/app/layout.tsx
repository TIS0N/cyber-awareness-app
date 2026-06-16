import type { Metadata } from "next";
import "./globals.css";
import AppNavigation from "../components/layout/AppNavigation";

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
      <body className="bg-slate-50 text-slate-900">
        <AppNavigation />

        <main className="pb-28 md:ml-64 md:pb-0">{children}</main>
      </body>
    </html>
  );
}
