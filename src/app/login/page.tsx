"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { createClient } from "../../lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const visibleCharactersOnlyPattern = /^[\p{L}\p{M}\p{N}\p{P}\p{S}]+$/u;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const allowedCharactersMessage =
    "Only letters, numbers, and symbols are allowed. Spaces, tabs, and line breaks are not allowed.";

  function validateVisibleCharacters(fieldName: string, value: string) {
    if (value.length === 0) {
      return `${fieldName} is required. ${allowedCharactersMessage}`;
    }

    if (!visibleCharactersOnlyPattern.test(value)) {
      return `${fieldName}: ${allowedCharactersMessage}`;
    }

    return "";
  }

  function validateEmail(value: string) {
    const visibleCharactersError = validateVisibleCharacters("Email", value);

    if (visibleCharactersError) {
      return visibleCharactersError;
    }

    if (!emailPattern.test(value)) {
      return "Email must be a valid email address, for example you@example.com.";
    }

    return "";
  }

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");

    const emailValidationError = validateEmail(email);

    if (emailValidationError) {
      setIsLoading(false);
      setErrorMessage(emailValidationError);
      return;
    }

    const passwordValidationError = validateVisibleCharacters(
      "Password",
      password,
    );

    if (passwordValidationError) {
      setIsLoading(false);
      setErrorMessage(passwordValidationError);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    const searchParams = new URLSearchParams(window.location.search);
    const redirectedFrom = searchParams.get("redirectedFrom");

    const safeRedirectPath =
      redirectedFrom &&
      redirectedFrom.startsWith("/") &&
      !redirectedFrom.startsWith("//")
        ? redirectedFrom
        : "/";

    router.push(safeRedirectPath);
    router.refresh();
  }

  return (
    <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-md items-center px-6 py-12">
      <section className="w-full rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <ShieldCheck className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-3xl font-bold text-slate-900">Log in</h1>
            <p className="text-sm text-slate-500">
              Continue your cybersecurity learning.
            </p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-5" noValidate>
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email <span className="text-red-600">*</span>
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
              Password <span className="text-red-600">*</span>
            </label>

            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                placeholder="At least 6 characters"
              />

              <button
                type="button"
                onClick={() => setShowPassword((currentValue) => !currentValue)}
                className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 transition hover:text-slate-800"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {errorMessage && (
            <p className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
              {errorMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Do not have an account?{" "}
          <Link
            href="/register"
            className="font-bold text-blue-700 hover:underline"
          >
            Create one
          </Link>
        </p>
      </section>
    </div>
  );
}
