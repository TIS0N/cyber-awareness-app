import { createClient } from "../lib/supabase/client";
import { QuizQuestion } from "../types/quiz";

interface QuizRow {
  id: string;
  module_id: string;
  scenario: string | null;
  question: string;
  options: string[] | unknown;
  correct_answer: string;
  explanation: string;
  order_index: number;
}

function mapQuizRow(row: QuizRow): QuizQuestion {
  return {
    id: row.id,
    moduleId: row.module_id,
    scenario: row.scenario ?? undefined,
    question: row.question,
    options: Array.isArray(row.options) ? row.options.map(String) : [],
    correctAnswer: row.correct_answer,
    explanation: row.explanation,
  };
}

export async function getQuizQuestionsByModuleId(
  moduleId: string,
): Promise<QuizQuestion[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("quizzes")
    .select("*")
    .eq("module_id", moduleId)
    .order("order_index", { ascending: true });

  if (error) {
    console.error("Failed to load quiz questions:", error.message);
    return [];
  }

  return (data ?? []).map(mapQuizRow);
}