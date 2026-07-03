"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  HelpCircle,
  Home,
  LogIn,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { createClient } from "../../lib/supabase/client";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/modules", label: "Modules", icon: BookOpen },
  { href: "/progress", label: "Progress", icon: BarChart3 },
  { href: "/help", label: "Help", icon: HelpCircle },
];

export default function AppNavigation() {
  const pathname = usePathname();
  const router = useRouter();

  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function loadUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUserEmail(user?.email ?? null);
    }

    loadUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUserEmail(session?.user.email ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  function isActive(href: string) {
    if (href === "/") {
      return pathname === "/";
    }

    if (href === "/modules") {
      return pathname.startsWith("/modules") || pathname.startsWith("/quiz");
    }

    return pathname.startsWith(href);
  }

  async function handleLogout() {
    const supabase = createClient();

    await supabase.auth.signOut();

    setUserEmail(null);
    router.push("/login");
    router.refresh();
  }

  return (
    <>
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

        <div className="border-t border-slate-200 p-4">
          {userEmail ? (
            <div className="space-y-3">
              <p className="truncate text-xs text-slate-500">{userEmail}</p>

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 px-4 py-3 text-sm font-bold text-red-700 transition hover:bg-red-50"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
            >
              <LogIn className="h-4 w-4" />
              Log in
            </Link>
          )}
        </div>
      </aside>

      <nav className="fixed inset-x-0 bottom-0 z-[999] border-t border-slate-200 bg-white pb-[env(safe-area-inset-bottom)] shadow-[0_-4px_12px_rgba(15,23,42,0.08)] md:hidden">
        <div className="grid grid-cols-5">
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

          {userEmail ? (
            <button
              type="button"
              onClick={handleLogout}
              className="flex min-h-16 flex-col items-center justify-center gap-1 px-2 py-3 text-xs font-medium text-red-700 transition"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className={`flex min-h-16 flex-col items-center justify-center gap-1 px-2 py-3 text-xs font-medium transition ${
                pathname.startsWith("/login") ||
                pathname.startsWith("/register")
                  ? "text-blue-700"
                  : "text-slate-600"
              }`}
            >
              <LogIn className="h-5 w-5" />
              Login
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
