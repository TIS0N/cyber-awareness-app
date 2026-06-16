import Link from "next/link";
import { Clock, Signal } from "lucide-react";

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  color: string;
  estimatedTime: string;
  difficulty: "Beginner" | "Intermediate";
  completed?: boolean;
  score?: number;
  totalQuestions?: number;
}

export default function ModuleCard({
  id,
  title,
  description,
  color,
  estimatedTime,
  difficulty,
  completed = false,
  score,
  totalQuestions,
}: ModuleCardProps) {
  return (
    <Link
      href={`/modules/${id}`}
      className={`rounded-2xl border bg-white p-6 transition hover:scale-[1.02] hover:shadow-md ${color}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>

        {completed && (
          <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
            Completed
          </span>
        )}
      </div>

      <p className="text-sm leading-6 text-slate-700">{description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700">
          <Clock className="h-3.5 w-3.5" />
          {estimatedTime}
        </span>

        <span className="inline-flex items-center gap-1 rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-700">
          <Signal className="h-3.5 w-3.5" />
          {difficulty}
        </span>
      </div>

      {completed && score !== undefined && totalQuestions !== undefined && (
        <p className="mt-4 text-sm font-medium text-green-800">
          Score: {score} / {totalQuestions}
        </p>
      )}
    </Link>
  );
}
