import Link from "next/link";
import { modules } from "../../../data/modules";
import { notFound } from "next/navigation";
import { scenarios } from "../../../data/scenarios";
import ScenarioCard from "../../../components/scenarios/ScenarioCard";

interface ModulePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function ModulePage({ params }: ModulePageProps) {
  const { id } = await params;

  const module1 = modules.find((m) => m.id === id);

  const moduleScenario = scenarios.find((scenario) => scenario.moduleId === id);

  if (!module1) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      {/* Header */}
      <div className={`${module1.color} rounded-2xl p-8`}>
        <h1 className="mb-3 text-4xl font-bold text-slate-900">
          {module1.title}
        </h1>

        <p className="text-lg leading-8 text-slate-700">
          {module1.description}
        </p>
      </div>

      {/* Main Explanation */}
      <section className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
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

      {moduleScenario && <ScenarioCard scenario={moduleScenario} />}

      <section className="mt-10 flex justify-end">
        <Link
          href={`/quiz/${module1.id}`}
          className="
      rounded-xl
      bg-blue-600
      px-6
      py-3
      font-medium
      text-white
      transition
      hover:bg-blue-700
    "
        >
          Start Quiz
        </Link>
      </section>
    </div>
  );
}
