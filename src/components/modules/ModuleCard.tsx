import Link from "next/link";

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  color: string;
  completed?: boolean;
  score?: number;
  totalQuestions?: number;
}

export default function ModuleCard({
  id,
  title,
  description,
  color,
  completed = false,
  score,
  totalQuestions,
}: ModuleCardProps) {
  return (
    <Link
      href={`/modules/${id}`}
      className={`${color} rounded-2xl border border-slate-200 p-6 transition hover:scale-[1.02] hover:shadow-md`}
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

      {completed && score !== undefined && totalQuestions !== undefined && (
        <p className="mt-4 text-sm font-medium text-green-800">
          Score: {score} / {totalQuestions}
        </p>
      )}
    </Link>
  );
}
