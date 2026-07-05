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

const moduleThemes: Record<
  string,
  {
    card: string;
    title: string;
    text: string;
    pill: string;
    completedBadge: string;
    score: string;
  }
> = {
  phishing: {
    card: "border-red-200 bg-red-50 hover:border-red-300",
    title: "text-red-950",
    text: "text-red-900/80",
    pill: "bg-white/80 text-red-900 ring-1 ring-red-200",
    completedBadge: "bg-green-100 text-green-700",
    score: "text-green-800",
  },
  passwords: {
    card: "border-green-200 bg-green-50 hover:border-green-300",
    title: "text-green-950",
    text: "text-green-900/80",
    pill: "bg-white/80 text-green-900 ring-1 ring-green-200",
    completedBadge: "bg-green-100 text-green-700",
    score: "text-green-800",
  },
  malware: {
    card: "border-amber-200 bg-amber-50 hover:border-amber-300",
    title: "text-amber-950",
    text: "text-amber-900/80",
    pill: "bg-white/80 text-amber-900 ring-1 ring-amber-200",
    completedBadge: "bg-green-100 text-green-700",
    score: "text-green-800",
  },
  scams: {
    card: "border-blue-200 bg-blue-50 hover:border-blue-300",
    title: "text-blue-950",
    text: "text-blue-900/80",
    pill: "bg-white/80 text-blue-900 ring-1 ring-blue-200",
    completedBadge: "bg-green-100 text-green-700",
    score: "text-green-800",
  },
};

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
  const theme = moduleThemes[id] ?? {
    card: `bg-white ${color}`,
    title: "text-slate-900",
    text: "text-slate-700",
    pill: "bg-white text-slate-700 ring-1 ring-slate-200",
    completedBadge: "bg-green-100 text-green-700",
    score: "text-green-800",
  };

  return (
    <Link
      href={`/modules/${id}`}
      className={`rounded-2xl border p-6 shadow-sm transition hover:scale-[1.02] hover:shadow-md ${theme.card}`}
    >
      <div className="mb-3 flex items-start justify-between gap-3">
        <h2 className={`text-2xl font-bold ${theme.title}`}>{title}</h2>

        {completed && (
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold ${theme.completedBadge}`}
          >
            Completed
          </span>
        )}
      </div>

      <p className={`text-sm leading-6 ${theme.text}`}>{description}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${theme.pill}`}
        >
          <Clock className="h-3.5 w-3.5" />
          {estimatedTime}
        </span>

        <span
          className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium ${theme.pill}`}
        >
          <Signal className="h-3.5 w-3.5" />
          {difficulty}
        </span>
      </div>

      {completed && score !== undefined && totalQuestions !== undefined && (
        <p className={`mt-4 text-sm font-medium ${theme.score}`}>
          Score: {score} / {totalQuestions}
        </p>
      )}
    </Link>
  );
}
