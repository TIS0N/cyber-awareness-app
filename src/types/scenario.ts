export interface ScenarioHotspot {
  id: string;
  label: string;
  explanation: string;
}

export interface Scenario {
  id: string;
  moduleId: string;
  title: string;
  description: string;
  email: {
    from: ScenarioHotspot;
    subject: ScenarioHotspot;
    greeting: string;
    body: ScenarioHotspot;
    link: ScenarioHotspot;
    footer: string;
  };
}