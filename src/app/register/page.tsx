"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { createClient } from "../../lib/supabase/client";

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (password.length < 6) {
      setIsLoading(false);
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
        },
      },
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSuccessMessage("Account created. You can now log in.");
    setDisplayName("");
    setEmail("");
    setPassword("");
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-md items-center px-6 py-12">
      <section className="w-full rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              Create account
            </h1>
            <p className="text-sm text-slate-500">
              Save your learning progress across devices.
            </p>
          </div>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div>
            <label
              htmlFor="displayName"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Display name
            </label>

            <input
              id="displayName"
              type="text"
              required
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="Adam"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              placeholder="At least 6 characters"
            />
          </div>

          {errorMessage && (
            <p className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <div className="rounded-xl bg-green-50 p-3 text-sm font-medium text-green-700">
              <p>{successMessage}</p>

              <Link
                href="/login"
                className="mt-2 inline-flex font-bold text-green-800 hover:underline"
              >
                Go to login
              </Link>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isLoading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-bold text-blue-700 hover:underline"
          >
            Log in
          </Link>
        </p>
      </section>
    </div>
  );
}
