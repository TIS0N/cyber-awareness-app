"use client";

import { useState } from "react";
import ModuleCard from "../../components/modules/ModuleCard";
import { modules } from "../../data/modules";
import { getProgress } from "../../services/progressService";
import { ModuleProgress } from "../../types/progress";

export default function ModulesClient() {
  const [progress] = useState<ModuleProgress[]>(() => getProgress());

  function getModuleProgress(moduleId: string) {
    return progress.find((item) => item.moduleId === moduleId);
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <section className="mb-10">
        <h1 className="mb-4 text-4xl font-bold text-slate-900">
          Learning Modules
        </h1>

        <p className="max-w-3xl text-slate-600">
          Choose a cybersecurity topic, learn the basics, complete interactive
          tasks, and test your knowledge.
        </p>
      </section>

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
              completed={Boolean(moduleProgress)}
              score={moduleProgress?.score}
              totalQuestions={moduleProgress?.totalQuestions}
            />
          );
        })}
      </div>
    </div>
  );
}
