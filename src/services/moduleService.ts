import { createClient } from "../lib/supabase/client";
import { Module } from "../types/module";

interface ModuleRow {
  id: string;
  title: string;
  description: string;
  color: string;
  estimated_time: string;
  difficulty: "Beginner" | "Intermediate";
  question: string;
  overview: string;
  example: string;
  order_index: number;
}

interface TextListRow {
  module_id: string;
  content: string;
  order_index: number;
}

function mapModuleRow(
  module: ModuleRow,
  warningSigns: TextListRow[],
  preventionTips: TextListRow[],
): Module {
  return {
    id: module.id,
    title: module.title,
    description: module.description,
    color: module.color,
    estimatedTime: module.estimated_time,
    difficulty: module.difficulty,
    question: module.question,
    overview: module.overview,
    example: module.example,
    warningSigns: warningSigns
      .filter((item) => item.module_id === module.id)
      .sort((a, b) => a.order_index - b.order_index)
      .map((item) => item.content),
    preventionTips: preventionTips
      .filter((item) => item.module_id === module.id)
      .sort((a, b) => a.order_index - b.order_index)
      .map((item) => item.content),
  };
}

export async function getModules(): Promise<Module[]> {
  const supabase = createClient();

  const { data: modules, error: modulesError } = await supabase
    .from("modules")
    .select("*")
    .order("order_index", { ascending: true });

  if (modulesError) {
    console.error("Failed to load modules:", modulesError.message);
    return [];
  }

  const { data: warningSigns, error: warningSignsError } = await supabase
    .from("module_warning_signs")
    .select("module_id, content, order_index")
    .order("order_index", { ascending: true });

  if (warningSignsError) {
    console.error(
      "Failed to load warning signs:",
      warningSignsError.message,
    );
    return [];
  }

  const { data: preventionTips, error: preventionTipsError } = await supabase
    .from("module_prevention_tips")
    .select("module_id, content, order_index")
    .order("order_index", { ascending: true });

  if (preventionTipsError) {
    console.error(
      "Failed to load prevention tips:",
      preventionTipsError.message,
    );
    return [];
  }

  return modules.map((module) =>
    mapModuleRow(module, warningSigns ?? [], preventionTips ?? []),
  );
}

export async function getModuleById(id: string): Promise<Module | undefined> {
  const supabase = createClient();

  const { data: module, error: moduleError } = await supabase
    .from("modules")
    .select("*")
    .eq("id", id)
    .single();

  if (moduleError || !module) {
    console.error("Failed to load module:", moduleError?.message);
    return undefined;
  }

  const { data: warningSigns, error: warningSignsError } = await supabase
    .from("module_warning_signs")
    .select("module_id, content, order_index")
    .eq("module_id", id)
    .order("order_index", { ascending: true });

  if (warningSignsError) {
    console.error(
      "Failed to load module warning signs:",
      warningSignsError.message,
    );
    return undefined;
  }

  const { data: preventionTips, error: preventionTipsError } = await supabase
    .from("module_prevention_tips")
    .select("module_id, content, order_index")
    .eq("module_id", id)
    .order("order_index", { ascending: true });

  if (preventionTipsError) {
    console.error(
      "Failed to load module prevention tips:",
      preventionTipsError.message,
    );
    return undefined;
  }

  return mapModuleRow(module, warningSigns ?? [], preventionTips ?? []);
}