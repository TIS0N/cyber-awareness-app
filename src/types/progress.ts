export interface ModuleProgress {
  moduleId: string;
  completed: boolean;
  score: number;
  totalQuestions: number;
  completedAt: string;
}

export type ProgressData = ModuleProgress[];