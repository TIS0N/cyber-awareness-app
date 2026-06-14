import { ModuleProgress, ProgressData } from "../types/progress";

const STORAGE_KEY = "cyber-awareness-progress";

export function getProgress(): ProgressData {
  if (typeof window === "undefined") {
    return [];
  }

  const savedProgress = localStorage.getItem(STORAGE_KEY);

  if (!savedProgress) {
    return [];
  }

  try {
    return JSON.parse(savedProgress) as ProgressData;
  } catch {
    return [];
  }
}

export function saveQuizResult(
  moduleId: string,
  score: number,
  totalQuestions: number
): void {
  if (typeof window === "undefined") {
    return;
  }

  const currentProgress = getProgress();

  const newProgressItem: ModuleProgress = {
    moduleId,
    completed: true,
    score,
    totalQuestions,
    completedAt: new Date().toISOString(),
  };

  const updatedProgress = currentProgress.filter(
    (item) => item.moduleId !== moduleId
  );

  updatedProgress.push(newProgressItem);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));
}

export function getModuleProgress(
  moduleId: string
): ModuleProgress | undefined {
  const progress = getProgress();

  return progress.find((item) => item.moduleId === moduleId);
}

export function clearProgress(): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
}

export function clearModuleProgress(moduleId: string): void {
  if (typeof window === "undefined") {
    return;
  }

  const currentProgress = getProgress();

  const updatedProgress = currentProgress.filter(
    (item) => item.moduleId !== moduleId,
  );

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProgress));
}