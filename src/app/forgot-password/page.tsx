"use client";

import { useState } from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { createClient } from "../../lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
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

  async function handlePasswordReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const emailValidationError = validateEmail(email);

    if (emailValidationError) {
      setIsLoading(false);
      setErrorMessage(emailValidationError);
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    setIsLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    setSuccessMessage(
      "If an account with this email exists, a password reset link has been sent.",
    );
    setEmail("");
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
              Forgot password
            </h1>
            <p className="text-sm text-slate-500">
              Enter your email and we will send you a password reset link.
            </p>
          </div>
        </div>

        <form onSubmit={handlePasswordReset} className="space-y-5" noValidate>
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

          {errorMessage && (
            <p className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
              {errorMessage}
            </p>
          )}

          {successMessage && (
            <p className="rounded-xl bg-green-50 p-3 text-sm font-medium text-green-700">
              {successMessage}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {isLoading ? "Sending reset link..." : "Send reset link"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Remembered your password?{" "}
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
