export interface QuizQuestion {
  id: string;
  moduleId: string;
  scenario?: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}