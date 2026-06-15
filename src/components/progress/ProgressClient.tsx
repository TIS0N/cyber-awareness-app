"use client";

import { useState } from "react";
import Link from "next/link";
import { modules } from "../../data/modules";
import {
  getProgress,
  clearProgress,
  clearModuleProgress,
} from "../../services/progressService";
import { ModuleProgress } from "../../types/progress";

export default function ProgressClient() {
  const [progress, setProgress] = useState<ModuleProgress[]>(() =>
    getProgress(),
  );

  const completedModules = progress.length;
  const totalModules = modules.length;
  const completionPercentage =
    totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  function handleClearProgress() {
    clearProgress();
    setProgress([]);
  }

  function handleClearModuleProgress(moduleId: string) {
    clearModuleProgress(moduleId);

    setProgress((currentProgress) =>
      currentProgress.filter((item) => item.moduleId !== moduleId),
    );
  }

  function getModuleProgress(moduleId: string) {
    return progress.find((item) => item.moduleId === moduleId);
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-12">
      <section className="rounded-2xl bg-white p-8 shadow-sm">
        <h1 className="mb-4 text-4xl font-bold text-slate-900">
          Your Progress
        </h1>

        <p className="text-slate-600">
          Track completed modules and quiz results.
        </p>

        <div className="mt-8">
          <div className="mb-2 flex items-center justify-between text-sm text-slate-600">
            <span>Overall completion</span>
            <span>{completionPercentage}%</span>
          </div>

          <div className="h-3 rounded-full bg-slate-200">
            <div
              className="h-3 rounded-full bg-blue-600"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>

          <p className="mt-3 text-sm text-slate-500">
            {completedModules} of {totalModules} modules completed
          </p>
        </div>
      </section>

      <section className="mt-8 grid gap-5">
        {modules.map((module) => {
          const moduleProgress = getModuleProgress(module.id);
          const isCompleted = Boolean(moduleProgress);

          return (
            <div key={module.id} className="rounded-2xl bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-slate-900">
                    {module.title}
                  </h2>

                  <p className="mt-2 text-slate-600">{module.description}</p>

                  {isCompleted && moduleProgress ? (
                    <p className="mt-3 text-sm font-medium text-green-700">
                      Completed — Score: {moduleProgress.score} /{" "}
                      {moduleProgress.totalQuestions}
                    </p>
                  ) : (
                    <p className="mt-3 text-sm font-medium text-slate-500">
                      Not completed yet
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-3 sm:flex-row md:flex-col lg:flex-row">
                  <Link
                    href={`/modules/${module.id}`}
                    className="rounded-xl bg-blue-600 px-5 py-3 text-center font-medium text-white transition hover:bg-blue-700"
                  >
                    {isCompleted ? "Review Module" : "Start Module"}
                  </Link>

                  {isCompleted && (
                    <button
                      type="button"
                      onClick={() => handleClearModuleProgress(module.id)}
                      className="rounded-xl border border-red-300 px-5 py-3 text-center font-medium text-red-700 transition hover:bg-red-50"
                    >
                      Reset Module
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

      {progress.length > 0 && (
        <section className="mt-8 flex justify-end">
          <button
            onClick={handleClearProgress}
            className="rounded-xl border border-red-300 px-5 py-3 font-medium text-red-700 transition hover:bg-red-50"
          >
            Reset All Progress
          </button>
        </section>
      )}
    </div>
  );
}
