export interface Module {
  id: string;
  title: string;
  description: string;
  color: string;

  estimatedTime: string;
  difficulty: "Beginner" | "Intermediate";

  question: string;
  overview: string;
  warningSigns: string[];
  example: string;
  preventionTips: string[];
}