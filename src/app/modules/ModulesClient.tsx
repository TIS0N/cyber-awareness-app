"use client";

import { useEffect, useState } from "react";
import ModuleCard from "../../components/modules/ModuleCard";
import { getModules } from "../../services/moduleService";
import { getProgress } from "../../services/progressService";
import { Module } from "../../types/module";
import { ModuleProgress } from "../../types/progress";

export default function ModulesClient() {
  const [modules, setModules] = useState<Module[]>([]);
  const [progress, setProgress] = useState<ModuleProgress[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadModules() {
      setIsLoading(true);

      const loadedModules = await getModules();

      setModules(loadedModules);
      setProgress(getProgress());
      setIsLoading(false);
    }

    loadModules();
  }, []);

  function getModuleProgress(moduleId: string) {
    return progress.find((item) => item.moduleId === moduleId);
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900">Modules</h1>

        <p className="mt-3 text-lg text-slate-600">Loading course modules...</p>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-52 animate-pulse rounded-2xl bg-slate-200"
            />
          ))}
        </div>
      </div>
    );
  }

  if (modules.length === 0) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-12">
        <h1 className="text-4xl font-bold text-slate-900">Modules</h1>

        <p className="mt-3 text-lg text-red-600">
          No modules were loaded. Check your Supabase database connection and
          the modules table.
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <div className="mb-8">
        <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
          Course catalogue
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          Learning Modules
        </h1>

        <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-600">
          Choose a cybersecurity topic and learn through explanations, realistic
          examples, interactive scenarios, and quizzes.
        </p>
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
    </div>
  );
}
