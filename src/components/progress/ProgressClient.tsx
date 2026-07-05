"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  CheckCircle2,
  Gem,
  Lock,
  RotateCcw,
  Trophy,
} from "lucide-react";
import { createClient } from "../../lib/supabase/client";
import { getModules } from "../../services/moduleService";
import {
  getUserProgress,
  resetAllUserProgress,
  resetUserModuleProgress,
} from "../../services/supabaseProgressService";
import { Module } from "../../types/module";
import { ModuleProgress } from "../../types/progress";

const REQUIRED_BADGE_SCORE = 90;

function formatDate(dateValue: string) {
  if (!dateValue) {
    return "Not completed";
  }

  const date = new Date(dateValue);

  if (Number.isNaN(date.getTime())) {
    return "Not completed";
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default function ProgressClient() {
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<ModuleProgress[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [resettingModuleId, setResettingModuleId] = useState<string | null>(
    null,
  );
  const [isResettingAll, setIsResettingAll] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadProgressPage() {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      let loadedDisplayName = "";

      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("display_name, email")
          .eq("id", user.id)
          .maybeSingle();

        loadedDisplayName =
          profile?.display_name?.trim() ||
          user.user_metadata?.display_name ||
          user.email?.split("@")[0] ||
          "User";
      }

      const [loadedModules, loadedProgress] = await Promise.all([
        getModules(),
        user ? getUserProgress() : Promise.resolve([]),
      ]);

      if (!isMounted) {
        return;
      }

      setIsLoggedIn(Boolean(user));
      setDisplayName(loadedDisplayName);
      setModules(loadedModules);
      setProgress(loadedProgress);
      setIsLoading(false);
    }

    void loadProgressPage();

    return () => {
      isMounted = false;
    };
  }, []);

  function getModuleProgress(moduleId: string) {
    return progress.find((item) => item.moduleId === moduleId);
  }

  async function handleResetModule(moduleId: string) {
    const shouldReset = window.confirm(
      "Reset progress for this module? This cannot be undone.",
    );

    if (!shouldReset) {
      return;
    }

    setResettingModuleId(moduleId);
    setStatusMessage("");
    setErrorMessage("");

    const result = await resetUserModuleProgress(moduleId);

    if (!result.success) {
      setErrorMessage(result.error ?? "Could not reset module progress.");
      setResettingModuleId(null);
      return;
    }

    const loadedProgress = await getUserProgress();

    setProgress(loadedProgress);
    setStatusMessage("Module progress was reset.");
    setResettingModuleId(null);
  }

  async function handleResetAllProgress() {
    const shouldReset = window.confirm(
      "Reset all progress? This will remove all completed modules and quiz scores.",
    );

    if (!shouldReset) {
      return;
    }

    setIsResettingAll(true);
    setStatusMessage("");
    setErrorMessage("");

    const result = await resetAllUserProgress();

    if (!result.success) {
      setErrorMessage(result.error ?? "Could not reset all progress.");
      setIsResettingAll(false);
      return;
    }

    setProgress([]);
    setStatusMessage("All progress was reset.");
    setIsResettingAll(false);
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-3xl bg-white p-8 shadow-sm">
          <div className="h-9 w-56 animate-pulse rounded bg-slate-200" />
          <div className="mt-5 h-5 w-full max-w-2xl animate-pulse rounded bg-slate-200" />

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-32 animate-pulse rounded-2xl bg-slate-200"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!isLoggedIn) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <section className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-blue-700">
            <Lock className="h-8 w-8" />
          </div>

          <h1 className="text-4xl font-bold text-slate-900">
            Log in to view progress
          </h1>

          <p className="mt-4 leading-7 text-slate-600">
            Log in or create an account to see your completed modules, quiz
            scores, and earned badges across devices.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/login"
              className="rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
            >
              Log in
            </Link>

            <Link
              href="/register"
              className="rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Create account
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const completedModules = progress.filter((item) => item.completed);
  const completedCount = completedModules.length;
  const totalModules = modules.length;

  const completionPercentage =
    totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;

  const totalScore = completedModules.reduce(
    (sum, item) => sum + item.score,
    0,
  );

  const totalQuestions = completedModules.reduce(
    (sum, item) => sum + item.totalQuestions,
    0,
  );

  const averageScore =
    totalQuestions > 0 ? Math.round((totalScore / totalQuestions) * 100) : 0;

  const hasCompletedAllModules =
    totalModules > 0 && completedCount === totalModules;

  const hasEarnedBadge =
    hasCompletedAllModules && averageScore >= REQUIRED_BADGE_SCORE;

  const hasDiamondBadge = hasEarnedBadge && averageScore === 100;

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Learning progress
          </p>

          <h1 className="mt-2 text-4xl font-bold text-slate-900">
            {displayName
              ? `Here is your progress, ${displayName}!`
              : "Your Progress"}
          </h1>

          <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
            Track completed modules, quiz results, and your CyberAware badge.
            This progress is saved to your Supabase account.
          </p>
        </div>
      </div>

      {statusMessage && (
        <p className="mb-6 rounded-xl bg-green-50 p-4 text-sm font-medium text-green-700">
          {statusMessage}
        </p>
      )}

      {errorMessage && (
        <p className="mb-6 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
          {errorMessage}
        </p>
      )}

      {/* Summary cards */}
      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <BarChart3 className="h-6 w-6" />
          </div>

          <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Completion
          </p>

          <p className="mt-2 text-4xl font-bold text-slate-900">
            {completionPercentage}%
          </p>

          <p className="mt-2 text-sm text-slate-600">
            {completedCount} of {totalModules} modules completed
          </p>

          <div className="mt-4 h-3 rounded-full bg-slate-200">
            <div
              className="h-3 rounded-full bg-blue-600 transition-all"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
            <CheckCircle2 className="h-6 w-6" />
          </div>

          <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Average score
          </p>

          <p className="mt-2 text-4xl font-bold text-slate-900">
            {totalQuestions > 0 ? `${averageScore}%` : "—"}
          </p>

          <p className="mt-2 text-sm text-slate-600">
            Based on {totalQuestions} answered quiz questions
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div
            className={`mb-4 flex h-11 w-11 items-center justify-center rounded-xl ${
              hasDiamondBadge
                ? "bg-cyan-50 text-cyan-700"
                : hasEarnedBadge
                  ? "bg-yellow-50 text-yellow-700"
                  : "bg-slate-100 text-slate-500"
            }`}
          >
            {hasDiamondBadge ? (
              <Gem className="h-6 w-6" />
            ) : (
              <Trophy className="h-6 w-6" />
            )}
          </div>

          <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
            Badge status
          </p>

          <p className="mt-2 text-2xl font-bold text-slate-900">
            {hasDiamondBadge
              ? "Diamond earned"
              : hasEarnedBadge
                ? "Badge earned"
                : "Locked"}
          </p>

          <p className="mt-2 text-sm leading-6 text-slate-600">
            Complete all modules with at least {REQUIRED_BADGE_SCORE}% average
            score to earn the badge.
          </p>
        </div>
      </section>

      {/* Badge section */}
      <section
        className={`mt-8 rounded-3xl border p-8 shadow-sm ${
          hasDiamondBadge
            ? "border-cyan-200 bg-cyan-50"
            : hasEarnedBadge
              ? "border-yellow-200 bg-yellow-50"
              : "border-slate-200 bg-white"
        }`}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-center">
          <div
            className={`flex h-20 w-20 shrink-0 items-center justify-center rounded-full ${
              hasDiamondBadge
                ? "bg-cyan-200 text-cyan-950"
                : hasEarnedBadge
                  ? "bg-yellow-400 text-slate-950"
                  : "bg-slate-100 text-slate-400"
            }`}
          >
            {hasDiamondBadge ? (
              <Gem className="h-10 w-10" />
            ) : hasEarnedBadge ? (
              <Trophy className="h-10 w-10" />
            ) : (
              <Lock className="h-10 w-10" />
            )}
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Completion badge
            </p>

            <h2 className="mt-2 text-3xl font-bold text-slate-900">
              {hasDiamondBadge
                ? "Perfect Cyber Awareness Mastery"
                : hasEarnedBadge
                  ? "Cyber Awareness Completed"
                  : "Cyber Awareness Badge Locked"}
            </h2>

            <p className="mt-3 max-w-3xl leading-7 text-slate-700">
              {hasDiamondBadge
                ? "You completed all learning modules with a perfect average score of 100%."
                : hasEarnedBadge
                  ? `You completed all modules with an average quiz score of ${averageScore}%.`
                  : `Complete all ${totalModules} modules and reach at least ${REQUIRED_BADGE_SCORE}% average score to unlock this badge.`}
            </p>
          </div>
        </div>
      </section>

      {/* Module progress list */}
      <section className="mt-8 rounded-3xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Module results
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Individual module progress
            </h2>
          </div>

          <button
            type="button"
            onClick={handleResetAllProgress}
            disabled={progress.length === 0 || isResettingAll}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-red-200 px-5 py-3 font-bold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400 disabled:hover:bg-transparent"
          >
            <RotateCcw className="h-5 w-5" />
            {isResettingAll ? "Resetting..." : "Reset all"}
          </button>
        </div>

        <div className="space-y-4">
          {modules.map((module) => {
            const moduleProgress = getModuleProgress(module.id);
            const isCompleted = Boolean(moduleProgress?.completed);

            const hasPerfectScore =
              isCompleted &&
              moduleProgress !== undefined &&
              moduleProgress.score === moduleProgress.totalQuestions &&
              moduleProgress.totalQuestions > 0;

            const scorePercentage =
              moduleProgress && moduleProgress.totalQuestions > 0
                ? Math.round(
                    (moduleProgress.score / moduleProgress.totalQuestions) *
                      100,
                  )
                : 0;

            return (
              <div
                key={module.id}
                className={`rounded-2xl border p-5 ${
                  hasPerfectScore
                    ? "border-green-200 bg-green-50"
                    : isCompleted
                      ? "border-blue-200 bg-blue-50"
                      : "border-slate-200 bg-white"
                }`}
              >
                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                  <div>
                    <div className="flex items-center gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-full ${
                          hasPerfectScore
                            ? "bg-amber-400 text-ashe"
                            : isCompleted
                              ? "bg-blue-600 text-white"
                              : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-6 w-6" />
                        ) : (
                          <Lock className="h-5 w-5" />
                        )}
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-slate-900">
                          {module.title}
                        </h3>

                        <p className="text-sm text-slate-600">
                          {isCompleted
                            ? `Completed on ${formatDate(
                                moduleProgress?.completedAt ?? "",
                              )}`
                            : "Not completed yet"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <div className="rounded-xl bg-white px-4 py-3 text-sm shadow-sm">
                      <p className="font-bold text-slate-900">
                        {isCompleted
                          ? `${moduleProgress?.score ?? 0} / ${
                              moduleProgress?.totalQuestions ?? 0
                            }`
                          : "—"}
                      </p>

                      <p className="text-slate-500">
                        {isCompleted ? `${scorePercentage}% score` : "No score"}
                      </p>
                    </div>

                    <Link
                      href={
                        isCompleted
                          ? `/quiz/${module.id}`
                          : `/modules/${module.id}`
                      }
                      className="inline-flex justify-center rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                    >
                      {isCompleted ? "Retake quiz" : "Start module"}
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleResetModule(module.id)}
                      disabled={!isCompleted || resettingModuleId === module.id}
                      className="inline-flex justify-center rounded-xl border border-red-200 px-5 py-3 text-sm font-bold text-red-700 transition hover:bg-red-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:text-slate-400 disabled:hover:bg-transparent"
                    >
                      {resettingModuleId === module.id
                        ? "Resetting..."
                        : "Reset"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
