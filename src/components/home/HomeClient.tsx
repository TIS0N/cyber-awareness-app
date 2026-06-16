"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowRight,
  BarChart3,
  BookOpen,
  CheckCircle2,
  Clock,
  Gem,
  GraduationCap,
  PlayCircle,
  ShieldCheck,
  Target,
  Trophy,
} from "lucide-react";
import { modules } from "../../data/modules";
import ModuleCard from "../../components/modules/ModuleCard";
import { getProgress } from "../../services/progressService";

const REQUIRED_BADGE_SCORE = 90;

const moduleThemes: Record<
  string,
  {
    soft: string;
    text: string;
    button: string;
  }
> = {
  phishing: {
    soft: "bg-red-50 border-red-200",
    text: "text-red-700",
    button: "bg-red-600 hover:bg-red-700",
  },
  passwords: {
    soft: "bg-green-50 border-green-200",
    text: "text-green-700",
    button: "bg-green-600 hover:bg-green-700",
  },
  malware: {
    soft: "bg-amber-50 border-amber-200",
    text: "text-amber-700",
    button: "bg-amber-500 hover:bg-amber-600",
  },
  scams: {
    soft: "bg-blue-50 border-blue-200",
    text: "text-blue-700",
    button: "bg-blue-600 hover:bg-blue-700",
  },
};

export default function HomeClient() {
  const [progress] = useState(() => getProgress());

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

  const hasEarnedBadge =
    totalModules > 0 &&
    completedCount === totalModules &&
    averageScore >= REQUIRED_BADGE_SCORE;

  const hasDiamondBadge = hasEarnedBadge && averageScore === 100;

  const nextModule =
    modules.find(
      (module) => !completedModules.some((item) => item.moduleId === module.id),
    ) ?? modules[0];

  const nextModuleTheme = moduleThemes[nextModule.id] ?? moduleThemes.phishing;

  function getModuleProgress(moduleId: string) {
    return progress.find((item) => item.moduleId === moduleId);
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      {/* Hero */}
      <section className="overflow-hidden rounded-3xl bg-slate-900 text-white shadow-sm">
        <div className="grid gap-8 p-8 md:grid-cols-[1.3fr_0.7fr] md:p-10">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-blue-100">
              <ShieldCheck className="h-4 w-4" />
              Cybersecurity awareness for everyday users
            </div>

            <h1 className="max-w-3xl text-4xl font-bold tracking-tight md:text-5xl">
              Learn how to recognize online threats before they become a
              problem.
            </h1>

            <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">
              Practice with realistic examples, interactive scenarios, and short
              quizzes focused on phishing, passwords, malware, and online scams.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/modules/${nextModule.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
              >
                Start learning
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/modules"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 font-bold text-slate-900 transition hover:bg-slate-100"
              >
                View all modules
                <BookOpen className="h-5 w-5" />
              </Link>
            </div>
          </div>

          <div className="rounded-2xl bg-white/10 p-5">
            <p className="text-sm font-medium uppercase tracking-wide text-slate-300">
              Your progress
            </p>

            <div className="mt-6">
              <div className="flex items-end justify-between">
                <span className="text-5xl font-bold">
                  {completionPercentage}%
                </span>
                <span className="text-sm text-slate-300">
                  {completedCount} / {totalModules} modules
                </span>
              </div>

              <div className="mt-4 h-3 rounded-full bg-white/10">
                <div
                  className="h-3 rounded-full bg-blue-500 transition-all"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
            </div>

            <div className="mt-6 grid gap-3">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-slate-300">Average quiz score</p>
                <p className="mt-1 text-2xl font-bold">
                  {totalQuestions > 0 ? `${averageScore}%` : "Not started"}
                </p>
              </div>

              {hasEarnedBadge && (
                <div
                  className={`rounded-xl border p-4 ${
                    hasDiamondBadge
                      ? "border-cyan-200/40 bg-cyan-300/15"
                      : "border-yellow-300/30 bg-yellow-400/15"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                        hasDiamondBadge
                          ? "bg-cyan-200 text-cyan-950"
                          : "bg-yellow-400 text-slate-950"
                      }`}
                    >
                      {hasDiamondBadge ? (
                        <Gem className="h-6 w-6" />
                      ) : (
                        <Trophy className="h-6 w-6" />
                      )}
                    </div>

                    <div>
                      <p className="text-sm font-bold text-yellow-100">
                        {hasDiamondBadge
                          ? "Diamond badge earned"
                          : "Badge earned"}
                      </p>

                      <p className="mt-1 text-lg font-bold text-white">
                        {hasDiamondBadge
                          ? "Perfect Cyber Awareness Mastery"
                          : "Cyber Awareness Completed"}
                      </p>

                      <p className="mt-1 text-sm leading-6 text-slate-300">
                        {hasDiamondBadge ? (
                          <>
                            You completed all modules with a perfect{" "}
                            <span className="font-bold text-white">100%</span>{" "}
                            score.
                          </>
                        ) : (
                          <>
                            You completed all modules with an average score of{" "}
                            <span className="font-bold text-white">
                              {averageScore}%
                            </span>
                            .
                          </>
                        )}
                        .
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Link
                href="/progress"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 px-4 py-3 text-sm font-bold text-white transition hover:bg-white/20"
              >
                {hasEarnedBadge ? "View earned badge" : "Open progress page"}
                <BarChart3 className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Summary cards */}
      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
            <GraduationCap className="h-6 w-6" />
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            Beginner friendly
          </h2>

          <p className="mt-2 leading-7 text-slate-600">
            Lessons use simple language and realistic examples instead of
            technical jargon.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-700">
            <Target className="h-6 w-6" />
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            Practice decisions
          </h2>

          <p className="mt-2 leading-7 text-slate-600">
            Interactive scenarios help users identify warning signs in messages,
            websites, downloads, and offers.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <Trophy className="h-6 w-6" />
          </div>

          <h2 className="text-lg font-bold text-slate-900">
            Track improvement
          </h2>

          <p className="mt-2 leading-7 text-slate-600">
            Quiz scores and completed modules are saved locally so users can see
            their learning progress.
          </p>
        </div>
      </section>

      {/* Continue learning */}
      <section
        className={`mt-8 rounded-2xl border p-6 shadow-sm ${nextModuleTheme.soft}`}
      >
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p
              className={`mb-2 text-sm font-bold uppercase tracking-wide ${nextModuleTheme.text}`}
            >
              Continue learning
            </p>

            <h2 className="text-2xl font-bold text-slate-900">
              {nextModule.title}
            </h2>

            <p className="mt-2 max-w-2xl leading-7 text-slate-700">
              {nextModule.description}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm">
                <Clock className="h-4 w-4" />
                {nextModule.estimatedTime}
              </span>

              <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700 shadow-sm">
                <CheckCircle2 className="h-4 w-4" />
                {nextModule.difficulty}
              </span>
            </div>
          </div>

          <Link
            href={`/modules/${nextModule.id}`}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold text-white transition ${nextModuleTheme.button}`}
          >
            Open module
            <PlayCircle className="h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Learning path */}
      <section className="mt-8 rounded-2xl bg-white p-6 shadow-sm">
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Learning path
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              How the app works
            </h2>
          </div>

          <Link
            href="/modules"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:underline"
          >
            Browse modules
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              1
            </div>
            <h3 className="font-bold text-slate-900">Learn</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Read a short explanation with warning signs and prevention tips.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              2
            </div>
            <h3 className="font-bold text-slate-900">Practice</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Click suspicious parts of an interactive real-world scenario.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
              3
            </div>
            <h3 className="font-bold text-slate-900">Quiz</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Answer questions, receive feedback, and save your result.
            </p>
          </div>
        </div>
      </section>

      {/* Module preview */}
      <section className="mt-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Module preview
            </p>

            <h2 className="mt-1 text-2xl font-bold text-slate-900">
              Start with one of the core topics
            </h2>
          </div>

          <Link
            href="/modules"
            className="inline-flex items-center gap-2 text-sm font-bold text-blue-700 hover:underline"
          >
            See full catalogue
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {modules.map((module) => {
            const moduleProgress = getModuleProgress(module.id);

            return (
              <ModuleCard
                key={module.id}
                id={module.id}
                title={module.title}
                description={module.description}
                color={module.color}
                estimatedTime={module.estimatedTime}
                difficulty={module.difficulty}
                completed={Boolean(moduleProgress)}
                score={moduleProgress?.score}
                totalQuestions={moduleProgress?.totalQuestions}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
