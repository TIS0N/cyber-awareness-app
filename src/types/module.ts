export interface Module {
  id: string;
  title: string;
  description: string;
  color: string;

  question: string;
  overview: string;
  warningSigns: string[];
  example: string;
  preventionTips: string[];
}