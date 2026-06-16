"use client";

import { useState } from "react";
import ModuleCard from "../../components/modules/ModuleCard";
import { modules } from "../../data/modules";
import { getProgress } from "../../services/progressService";
import { ModuleProgress } from "../../types/progress";

export default function HomeClient() {
  const [progress] = useState<ModuleProgress[]>(() => getProgress());

  function getModuleProgress(moduleId: string) {
    return progress.find((item) => item.moduleId === moduleId);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <section className="mb-14">
        <h1 className="mb-6 text-5xl font-extrabold leading-tight text-slate-900">
          Stay Safe Online
        </h1>

        <p className="max-w-3xl text-lg leading-8 text-slate-600">
          Learn how to recognize online threats, avoid scams, and protect your
          personal information through interactive cybersecurity education.
        </p>
      </section>

      <section>
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold text-slate-900">
            Learning Modules
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
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
