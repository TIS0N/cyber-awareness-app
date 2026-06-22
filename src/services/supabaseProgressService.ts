import { createClient } from "../lib/supabase/client";
import { ModuleProgress } from "../types/progress";

interface UserProgressRow {
  module_id: string;
  completed: boolean;
  score: number;
  total_questions: number;
  completed_at: string | null;
}

interface ProgressResult {
  success: boolean;
  error?: string;
}

function mapProgressRow(row: UserProgressRow): ModuleProgress {
  return {
    moduleId: row.module_id,
    completed: row.completed,
    score: row.score,
    totalQuestions: row.total_questions,
    completedAt: row.completed_at ?? "",
  };
}

export async function getUserProgress(): Promise<ModuleProgress[]> {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return [];
  }

  const { data, error } = await supabase
    .from("user_progress")
    .select("module_id, completed, score, total_questions, completed_at")
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Failed to load user progress:", error.message);
    return [];
  }

  return (data ?? []).map(mapProgressRow);
}

export async function saveUserQuizResult(
  moduleId: string,
  score: number,
  totalQuestions: number,
): Promise<ProgressResult> {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      error: "You need to log in before your quiz result can be saved.",
    };
  }

  const now = new Date().toISOString();

  const { error } = await supabase.from("user_progress").upsert(
    {
      user_id: user.id,
      module_id: moduleId,
      completed: true,
      score,
      total_questions: totalQuestions,
      completed_at: now,
      updated_at: now,
    },
    {
      onConflict: "user_id,module_id",
    },
  );

  if (error) {
    console.error("Failed to save quiz result:", error.message);

    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
  };
}

export async function resetUserModuleProgress(
  moduleId: string,
): Promise<ProgressResult> {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      error: "You need to log in before progress can be reset.",
    };
  }

  const { error } = await supabase
    .from("user_progress")
    .delete()
    .eq("user_id", user.id)
    .eq("module_id", moduleId);

  if (error) {
    console.error("Failed to reset module progress:", error.message);

    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
  };
}

export async function resetAllUserProgress(): Promise<ProgressResult> {
  const supabase = createClient();

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return {
      success: false,
      error: "You need to log in before progress can be reset.",
    };
  }

  const { error } = await supabase
    .from("user_progress")
    .delete()
    .eq("user_id", user.id);

  if (error) {
    console.error("Failed to reset all progress:", error.message);

    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
  };
}