{
  /*}
import Link from "next/link";
import { notFound } from "next/navigation";
import { modules } from "../../../data/modules";
import { scenarios } from "../../../data/scenarios";
import ScenarioCard from "../../../components/scenarios/ScenarioCard";
import ModulePathIndicator from "../../../components/modules/ModulePathIndicator";

interface ModulePageProps {
  params: Promise<{
    id: string;
  }>;
}

const quizThemes: Record<
  string,
  {
    section: string;
    button: string;
    label: string;
  }
> = {
  phishing: {
    section: "border-red-200 bg-white",
    button: "bg-red-500 text-white hover:bg-red-700",
    label: "text-red-500",
  },
  passwords: {
    section: "border-green-200 bg-white",
    button: "bg-green-600 text-white hover:bg-green-700",
    label: "text-green-700",
  },
  malware: {
    section: "border-yellow-200 bg-white",
    button: "bg-yellow-500 text-slate-950 hover:bg-yellow-600",
    label: "text-yellow-700",
  },
  scams: {
    section: "border-blue-200 bg-white",
    button: "bg-blue-600 text-white hover:bg-blue-700",
    label: "text-blue-700",
  },
};

export default async function ModulePage({ params }: ModulePageProps) {
  const { id } = await params;

  const module1 = modules.find((module) => module.id === id);

  if (!module1) {
    notFound();
  }

  const moduleScenarios = scenarios.filter(
    (scenario) => scenario.moduleId === id,
  );

  const quizTheme = quizThemes[module1.id] ?? quizThemes.phishing;

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
       Header
      <div className={`${module1.color} rounded-2xl border bg-white p-6`}>
        <h1 className="mb-3 text-4xl font-bold text-slate-900">
          {module1.title}
        </h1>

        <p className="text-lg leading-8 text-slate-700">
          {module1.description}
        </p>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700">
          Estimated time: {module1.estimatedTime}
        </span>

        <span className="rounded-full bg-white px-3 py-1 text-sm font-medium text-slate-700">
          Difficulty: {module1.difficulty}
        </span>
      </div>

      <ModulePathIndicator moduleId={module1.id} />

      <section
        id="learn"
        className="mt-10 scroll-mt-8 rounded-2xl bg-white p-8 shadow-sm"
      >
        <h2 className="mb-4 text-2xl font-bold text-slate-900">
          {module1.question}
        </h2>

        <p className="leading-8 text-slate-600">{module1.overview}</p>
      </section>

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

  
      {module1.example && (
        <section className="mt-8 rounded-2xl bg-white p-8 shadow-sm">
          <h2 className="mb-4 text-2xl font-bold text-slate-900">
            Example Scenario
          </h2>

          <p className="italic leading-7 text-slate-700">{module1.example}</p>
        </section>
      )}

  
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

      {moduleScenarios.length > 0 && (
        <section id="practice" className="scroll-mt-8">
          {moduleScenarios.map((scenario) => (
            <ScenarioCard key={scenario.id} scenario={scenario} />
          ))}
        </section>
      )}

      <section
        id="quiz"
        className={`mt-10 scroll-mt-8 rounded-2xl border p-8 shadow-sm ${quizTheme.section}`}
      >
        <p
          className={`mb-2 text-sm font-bold uppercase tracking-wide ${quizTheme.label}`}
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
          className={`inline-flex rounded-xl px-8 py-3 font-bold transition ${quizTheme.button}`}
        >
          Start Quiz
        </Link>
      </section>


    </div>
  );
}
{*/
}

import ModuleDetailClient from "../../../components/modules/ModuleDetailClient";

interface ModulePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { id } = await params;

  return <ModuleDetailClient moduleId={id} />;
}
