"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BarChart3, BookOpen, Home, ShieldCheck } from "lucide-react";

const navItems = [
  {
    href: "/",
    label: "Home",
    icon: Home,
  },
  {
    href: "/modules",
    label: "Modules",
    icon: BookOpen,
  },
  {
    href: "/progress",
    label: "Progress",
    icon: BarChart3,
  },
];

export default function AppNavigation() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    if (href === "/modules") {
      return pathname.startsWith("/modules") || pathname.startsWith("/quiz");
    }

    return pathname.startsWith(href);
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden border-r border-slate-200 bg-white md:fixed md:inset-y-0 md:left-0 md:z-50 md:flex md:w-64 md:flex-col">
        <div className="flex h-20 items-center border-b border-slate-200 px-6">
          <Link href="/" className="flex items-center gap-2">
            <ShieldCheck className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900">CyberAware</span>
          </Link>
        </div>

        <nav className="flex flex-1 flex-col gap-2 px-4 py-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  active
                    ? "bg-blue-50 text-blue-700"
                    : "text-slate-700 hover:bg-slate-100"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-[999] border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(15,23,42,0.08)] md:hidden">
        <div className="grid grid-cols-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex min-h-16 flex-col items-center justify-center gap-1 px-2 py-3 text-xs font-medium transition ${
                  active ? "text-blue-700" : "text-slate-600"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </>
  );
}
