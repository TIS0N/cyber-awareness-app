export type ScenarioType = "email" | "sms" | "website" | "download" | "shop";

export interface ScenarioElement {
  id: string;
  label: string;
  content: string;
  isSuspicious: boolean;
  explanation: string;
}

export interface Scenario {
  id: string;
  moduleId: string;
  type: ScenarioType;
  title: string;
  description: string;
  instruction: string;
  elements: ScenarioElement[];
}