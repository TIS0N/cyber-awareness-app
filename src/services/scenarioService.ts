import { createClient } from "../lib/supabase/client";
import { Scenario, ScenarioElement, ScenarioType } from "../types/scenario";

interface ScenarioRow {
  id: string;
  module_id: string;
  type: ScenarioType;
  title: string;
  description: string;
  instruction: string;
  order_index: number;
}

interface ScenarioElementRow {
  id: string;
  scenario_id: string;
  label: string;
  content: string;
  is_suspicious: boolean;
  explanation: string;
  order_index: number;
}

function mapScenarioElementRow(row: ScenarioElementRow): ScenarioElement {
  return {
    id: row.id,
    label: row.label,
    content: row.content,
    isSuspicious: row.is_suspicious,
    explanation: row.explanation,
  };
}

function mapScenarioRow(
  scenario: ScenarioRow,
  elements: ScenarioElementRow[],
): Scenario {
  return {
    id: scenario.id,
    moduleId: scenario.module_id,
    type: scenario.type,
    title: scenario.title,
    description: scenario.description,
    instruction: scenario.instruction,
    elements: elements
      .filter((element) => element.scenario_id === scenario.id)
      .sort((a, b) => a.order_index - b.order_index)
      .map(mapScenarioElementRow),
  };
}

export async function getScenariosByModuleId(
  moduleId: string,
): Promise<Scenario[]> {
  const supabase = createClient();

  const { data: scenarios, error: scenariosError } = await supabase
    .from("scenarios")
    .select("*")
    .eq("module_id", moduleId)
    .order("order_index", { ascending: true });

  if (scenariosError) {
    console.error("Failed to load scenarios:", scenariosError.message);
    return [];
  }

  if (!scenarios || scenarios.length === 0) {
    return [];
  }

  const scenarioIds = scenarios.map((scenario) => scenario.id);

  const { data: elements, error: elementsError } = await supabase
    .from("scenario_elements")
    .select("*")
    .in("scenario_id", scenarioIds)
    .order("order_index", { ascending: true });

  if (elementsError) {
    console.error(
      "Failed to load scenario elements:",
      elementsError.message,
    );
    return [];
  }

  return scenarios.map((scenario) =>
    mapScenarioRow(scenario, elements ?? []),
  );
}