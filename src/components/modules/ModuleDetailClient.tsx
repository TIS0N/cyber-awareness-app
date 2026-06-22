"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import ModulePathIndicator from "../../components/modules/ModulePathIndicator";
import ScenarioCard from "../../components/scenarios/ScenarioCard";
import { getModuleById } from "../../services/moduleService";
import { getScenariosByModuleId } from "../../services/scenarioService";
import { Module } from "../../types/module";
import { Scenario } from "../../types/scenario";

interface ModuleDetailClientProps {
  moduleId: string;
}

const moduleThemes: Record<
  string,
  {
    header: string;
    title: string;
    description: string;
    pill: string;
    backLink: string;
    quizSection: string;
    quizButton: string;
    quizLabel: string;
  }
> = {
  phishing: {
    header: "border-red-200 bg-red-50",
    title: "text-red-950",
    description: "text-red-900/80",
    pill: "bg-white/80 text-red-900 ring-1 ring-red-200",
    backLink: "text-blue-700 hover:text-blue-800",
    quizSection: "border-red-200 bg-red-50",
    quizButton: "bg-red-600 text-white hover:bg-red-700",
    quizLabel: "text-red-700",
  },
  passwords: {
    header: "border-green-200 bg-green-50",
    title: "text-green-950",
    description: "text-green-900/80",
    pill: "bg-white/80 text-green-900 ring-1 ring-green-200",
    backLink: "text-blue-700 hover:text-blue-800",
    quizSection: "border-green-200 bg-green-50",
    quizButton: "bg-green-600 text-white hover:bg-green-700",
    quizLabel: "text-green-700",
  },
  malware: {
    header: "border-amber-200 bg-amber-50",
    title: "text-amber-950",
    description: "text-amber-900/80",
    pill: "bg-white/80 text-amber-900 ring-1 ring-amber-200",
    backLink: "text-blue-700 hover:text-blue-800",
    quizSection: "border-amber-200 bg-amber-50",
    quizButton: "bg-amber-500 text-slate-950 hover:bg-amber-600",
    quizLabel: "text-amber-700",
  },
  scams: {
    header: "border-blue-200 bg-blue-50",
    title: "text-blue-950",
    description: "text-blue-900/80",
    pill: "bg-white/80 text-blue-900 ring-1 ring-blue-200",
    backLink: "text-blue-700 hover:text-blue-800",
    quizSection: "border-blue-200 bg-blue-50",
    quizButton: "bg-blue-600 text-white hover:bg-blue-700",
    quizLabel: "text-blue-700",
  },
};

export default function ModuleDetailClient({
  moduleId,
}: ModuleDetailClientProps) {
  const [module1, setModule1] = useState<Module | null>(null);
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadModulePage() {
      const [loadedModule, loadedScenarios] = await Promise.all([
        getModuleById(moduleId),
        getScenariosByModuleId(moduleId),
      ]);

      if (!isMounted) {
        return;
      }

      setModule1(loadedModule ?? null);
      setScenarios(loadedScenarios);
      setIsLoading(false);
    }

    void loadModulePage();

    return () => {
      isMounted = false;
    };
  }, [moduleId]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/modules"
          className="mb-6 inline-flex text-sm font-medium text-blue-700 hover:text-blue-800 hover:underline"
        >
          ← Back to modules
        </Link>

        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="h-8 w-2/3 animate-pulse rounded bg-slate-200" />
          <div className="mt-4 h-5 w-full animate-pulse rounded bg-slate-200" />
          <div className="mt-2 h-5 w-5/6 animate-pulse rounded bg-slate-200" />
        </div>

        <div className="mt-8 h-40 animate-pulse rounded-2xl bg-slate-200" />
        <div className="mt-8 h-64 animate-pulse rounded-2xl bg-slate-200" />
      </div>
    );
  }

  if (!module1) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-12">
        <Link
          href="/modules"
          className="mb-6 inline-flex text-sm font-medium text-blue-700 hover:underline"
        >
          ← Back to modules
        </Link>

        <section className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">
            Module not found
          </h1>

          <p className="mt-3 leading-7 text-slate-600">
            This module could not be loaded from Supabase. Check that the module
            exists in the modules table.
          </p>
        </section>
      </div>
    );
  }

  const theme = moduleThemes[module1.id] ?? {
    header: `bg-white ${module1.color}`,
    title: "text-slate-900",
    description: "text-slate-700",
    pill: "bg-slate-100 text-slate-700",
    backLink: "text-blue-700 hover:text-blue-800",
    quizSection: "border-blue-200 bg-blue-50",
    quizButton: "bg-blue-600 text-white hover:bg-blue-700",
    quizLabel: "text-blue-700",
  };

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href="/modules"
        className={`mb-6 inline-flex text-sm font-medium hover:underline ${theme.backLink}`}
      >
        ← Back to modules
      </Link>

      {/* Header */}
      <div className={`rounded-2xl border p-8 shadow-sm ${theme.header}`}>
        <h1 className={`mb-3 text-4xl font-bold ${theme.title}`}>
          {module1.title}
        </h1>

        <p className={`text-lg leading-8 ${theme.description}`}>
          {module1.description}
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${theme.pill}`}
          >
            Estimated time: {module1.estimatedTime}
          </span>

          <span
            className={`rounded-full px-3 py-1 text-sm font-medium ${theme.pill}`}
          >
            Difficulty: {module1.difficulty}
          </span>
        </div>
      </div>

      <ModulePathIndicator moduleId={module1.id} />

      {/* Main Explanation */}
      <section
        id="learn"
        className="mt-10 scroll-mt-8 rounded-2xl bg-white p-8 shadow-sm"
      >
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          {module1.question}
        </h2>

        <p className="leading-8 text-slate-600">{module1.overview}</p>
      </section>

      {/* Warning Signs */}
      {module1.warningSigns.length > 0 && (
        <section className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Warning Signs
          </h2>

          <ul className="space-y-3 text-slate-700">
            {module1.warningSigns.map((sign) => (
              <li key={sign}>• {sign}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Example */}
      {module1.example && (
        <section className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Example Scenario
          </h2>

          <p className="italic leading-7 text-slate-700">{module1.example}</p>
        </section>
      )}

      {/* Prevention Tips */}
      {module1.preventionTips.length > 0 && (
        <section className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            How to Stay Safe
          </h2>

          <ul className="space-y-3 text-slate-700">
            {module1.preventionTips.map((tip) => (
              <li key={tip}>• {tip}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Interactive Scenarios */}
      {scenarios.length > 0 && (
        <section id="practice" className="scroll-mt-8">
          {scenarios.map((scenario) => (
            <ScenarioCard key={scenario.id} scenario={scenario} />
          ))}
        </section>
      )}

      {/* Quiz */}
      <section
        id="quiz"
        className={`mt-10 scroll-mt-8 rounded-2xl border p-8 shadow-sm ${theme.quizSection}`}
      >
        <p
          className={`mb-2 text-sm font-bold uppercase tracking-wide ${theme.quizLabel}`}
        >
          Final step
        </p>

        <h2 className="mb-3 text-2xl font-bold text-slate-900">
          Quiz & Review
        </h2>

        <p className="mb-6 max-w-2xl leading-7 text-slate-700">
          Test what you learned in this module. You will receive feedback after
          each answer and your score will be saved to your progress page.
        </p>

        <Link
          href={`/quiz/${module1.id}`}
          className={`inline-flex w-full justify-center rounded-xl px-8 py-3 font-bold transition sm:w-auto ${theme.quizButton}`}
        >
          Start Quiz
        </Link>
      </section>
    </div>
  );
}
