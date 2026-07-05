"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import { createClient } from "../../lib/supabase/client";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [canUpdatePassword, setCanUpdatePassword] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const visibleCharactersOnlyPattern = /^[\p{L}\p{M}\p{N}\p{P}\p{S}]+$/u;

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

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === "PASSWORD_RECOVERY" || session) {
        setCanUpdatePassword(true);
      }

      setIsCheckingSession(false);
    });

    async function checkExistingSession() {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (session) {
        setCanUpdatePassword(true);
      }

      setIsCheckingSession(false);
    }

    checkExistingSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleUpdatePassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!canUpdatePassword) {
      setIsLoading(false);
      setErrorMessage(
        "This password reset link is invalid or expired. Please request a new reset link.",
      );
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

    const confirmPasswordValidationError = validateVisibleCharacters(
      "Confirm password",
      confirmPassword,
    );

    if (confirmPasswordValidationError) {
      setIsLoading(false);
      setErrorMessage(confirmPasswordValidationError);
      return;
    }

    if (password.length < 6) {
      setIsLoading(false);
      setErrorMessage("Password must be at least 6 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setIsLoading(false);
      setErrorMessage("Passwords do not match.");
      return;
    }

    const supabase = createClient();

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setIsLoading(false);
      setErrorMessage(error.message);
      return;
    }

    await supabase.auth.signOut();

    setIsLoading(false);
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
    setSuccessMessage("Password updated successfully. You can now log in.");
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
              Reset password
            </h1>
            <p className="text-sm text-slate-500">
              Choose a new password for your account.
            </p>
          </div>
        </div>

        {isCheckingSession ? (
          <p className="rounded-xl bg-blue-50 p-3 text-sm font-medium text-blue-700">
            Checking password reset link...
          </p>
        ) : (
          <form
            onSubmit={handleUpdatePassword}
            className="space-y-5"
            noValidate
          >
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                New password <span className="text-red-600">*</span>
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
                  onClick={() =>
                    setShowPassword((currentValue) => !currentValue)
                  }
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

            <div>
              <label
                htmlFor="confirmPassword"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Confirm new password <span className="text-red-600">*</span>
              </label>

              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-12 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  placeholder="Repeat your new password"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirmPassword((currentValue) => !currentValue)
                  }
                  className="absolute inset-y-0 right-0 flex items-center px-4 text-slate-500 transition hover:text-slate-800"
                  aria-label={
                    showConfirmPassword
                      ? "Hide confirmed password"
                      : "Show confirmed password"
                  }
                >
                  {showConfirmPassword ? (
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
              disabled={isLoading || !canUpdatePassword}
              className="w-full rounded-xl bg-blue-600 px-5 py-3 font-bold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {isLoading ? "Updating password..." : "Update password"}
            </button>

            {!canUpdatePassword && !successMessage && (
              <p className="text-center text-sm text-slate-600">
                The reset link may be invalid or expired.{" "}
                <Link
                  href="/forgot-password"
                  className="font-bold text-blue-700 hover:underline"
                >
                  Request a new link
                </Link>
              </p>
            )}
          </form>
        )}
      </section>
    </div>
  );
}
