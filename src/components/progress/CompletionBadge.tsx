import { Award, Gem, Lock, ShieldCheck, Sparkles, Trophy } from "lucide-react";

interface CompletionBadgeProps {
  completedCount: number;
  totalModules: number;
  averageScore: number | null;
}

const REQUIRED_SCORE = 90;

export default function CompletionBadge({
  completedCount,
  totalModules,
  averageScore,
}: CompletionBadgeProps) {
  const allModulesCompleted =
    totalModules > 0 && completedCount === totalModules;
  const hasRequiredScore =
    averageScore !== null && averageScore >= REQUIRED_SCORE;

  const isBadgeUnlocked = allModulesCompleted && hasRequiredScore;

  const hasPerfectScore = averageScore === 100;

  if (!allModulesCompleted) {
    return (
      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
              <Lock className="h-7 w-7" />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
                Completion badge locked
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Finish all modules to qualify for the badge
              </h2>

              <p className="mt-2 leading-7 text-slate-600">
                Complete every module quiz first. After that, your average quiz
                score must be at least {REQUIRED_SCORE}% to unlock the Cyber
                Awareness badge.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-slate-50 px-5 py-4 text-center">
            <p className="text-3xl font-bold text-slate-900">
              {completedCount}/{totalModules}
            </p>
            <p className="text-sm font-medium text-slate-500">
              modules completed
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!hasRequiredScore) {
    return (
      <section className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6 shadow-sm">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Award className="h-7 w-7" />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-amber-700">
                Badge almost unlocked
              </p>

              <h2 className="mt-1 text-2xl font-bold text-slate-900">
                Improve your average score to {REQUIRED_SCORE}% or higher
              </h2>

              <p className="mt-2 leading-7 text-slate-700">
                You completed all modules, but your current average score is{" "}
                <span className="font-bold">
                  {averageScore !== null ? `${averageScore}%` : "not available"}
                </span>
                . Review the modules and retake quizzes to improve your result.
              </p>
            </div>
          </div>

          <div className="rounded-2xl bg-white px-5 py-4 text-center shadow-sm">
            <p className="text-3xl font-bold text-slate-900">
              {averageScore !== null ? `${averageScore}%` : "N/A"}
            </p>
            <p className="text-sm font-medium text-slate-500">average score</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8 overflow-hidden rounded-3xl bg-slate-900 p-6 text-white shadow-sm sm:p-8">
      <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-center">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-yellow-400/15 px-4 py-2 text-sm font-bold text-yellow-200">
            <Sparkles className="h-4 w-4" />
            Badge unlocked
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {hasPerfectScore
              ? "Diamond Cyber Awareness Mastery"
              : "Cyber Awareness Completed"}
          </h2>

          <p className="mt-4 max-w-2xl leading-8 text-slate-300">
            {hasPerfectScore
              ? "Outstanding work. You completed all learning modules with a perfect quiz score, showing excellent understanding of phishing, passwords, malware, and online scams."
              : `Congratulations. You completed all learning modules and achieved an average quiz score of at least ${REQUIRED_SCORE}%, showing strong understanding of phishing, passwords, malware, and online scams.`}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <div className="rounded-2xl bg-white/10 px-5 py-4">
              <p className="text-sm text-slate-300">Modules completed</p>
              <p className="mt-1 text-2xl font-bold">
                {completedCount}/{totalModules}
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4">
              <p className="text-sm text-slate-300">Average quiz score</p>
              <p className="mt-1 text-2xl font-bold">
                {averageScore !== null ? `${averageScore}%` : "N/A"}
              </p>
            </div>

            <div className="rounded-2xl bg-white/10 px-5 py-4">
              <p className="text-sm text-slate-300">Required score</p>
              <p className="mt-1 text-2xl font-bold">{REQUIRED_SCORE}%</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/10 p-6 text-center">
          <div
            className={`mx-auto flex h-28 w-28 items-center justify-center rounded-full shadow-lg ${
              hasPerfectScore
                ? "bg-cyan-200 text-cyan-950"
                : "bg-yellow-400 text-slate-950"
            }`}
          >
            {hasPerfectScore ? (
              <Gem className="h-14 w-14" />
            ) : (
              <Trophy className="h-14 w-14" />
            )}
          </div>

          <h3 className="mt-5 text-2xl font-bold">
            {hasPerfectScore ? "Diamond Badge" : "Completion Badge"}
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-300">
            {hasPerfectScore
              ? "Awarded for completing all modules with a perfect quiz score."
              : "Awarded for completing all modules and reaching the required mastery score."}
          </p>

          <div className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-slate-900">
            <ShieldCheck className="h-4 w-4 text-green-700" />
            {hasPerfectScore ? "Perfect mastery" : "Mastery achieved"}
          </div>
        </div>
      </div>
    </section>
  );
}
