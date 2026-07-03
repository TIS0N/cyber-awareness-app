import Link from "next/link";
import { BookOpen, FileText, HelpCircle, ShieldCheck } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <section className="rounded-3xl bg-white p-8 shadow-sm">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
            <HelpCircle className="h-7 w-7" />
          </div>

          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Beginner help
            </p>
            <h1 className="text-4xl font-bold text-slate-900">
              How to use CyberAware
            </h1>
          </div>
        </div>

        <p className="max-w-3xl text-lg leading-8 text-slate-600">
          CyberAware helps you learn basic cybersecurity topics through short
          lessons, realistic examples, interactive scenarios, quizzes, and
          progress tracking.
        </p>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 p-5">
            <ShieldCheck className="mb-3 h-8 w-8 text-blue-700" />
            <h2 className="text-xl font-bold text-slate-900">
              1. Create an account
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              Register or log in so your quiz scores and learning progress can
              be saved.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <BookOpen className="mb-3 h-8 w-8 text-green-700" />
            <h2 className="text-xl font-bold text-slate-900">
              2. Complete modules
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              Open a topic, read the explanation, practice with a scenario, and
              finish the quiz.
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 p-5">
            <FileText className="mb-3 h-8 w-8 text-amber-700" />
            <h2 className="text-xl font-bold text-slate-900">
              3. Check progress
            </h2>
            <p className="mt-2 leading-7 text-slate-600">
              Visit the progress page to see completed modules, quiz scores, and
              earned badges.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/modules"
            className="inline-flex justify-center rounded-xl bg-blue-600 px-6 py-3 font-bold text-white transition hover:bg-blue-700"
          >
            Open learning modules
          </Link>

          <a
            href="/manuals/CyberAware_User_Manual.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex justify-center rounded-xl border border-slate-300 px-6 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
          >
            Open PDF user manual
          </a>
        </div>
      </section>
    </div>
  );
}
