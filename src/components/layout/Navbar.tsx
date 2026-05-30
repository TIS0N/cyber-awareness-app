import Link from "next/link";
import { ShieldCheck } from "lucide-react";

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-slate-900"
        >
          <ShieldCheck className="h-7 w-7 text-blue-600" />
          CyberAware
        </Link>

        <nav className="flex items-center gap-6 text-sm font-medium text-slate-700">
          <Link href="/">Home</Link>
          <Link href="/modules">Modules</Link>
          <Link href="/progress">Progress</Link>
        </nav>
      </div>
    </header>
  );
}
