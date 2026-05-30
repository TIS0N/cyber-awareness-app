import Link from "next/link";

interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  color: string;
}

export default function ModuleCard({
  id,
  title,
  description,
  color,
}: ModuleCardProps) {
  return (
    <Link
      href={`/modules/${id}`}
      className={`${color} rounded-2xl border border-slate-200 p-6 transition hover:scale-[1.02] hover:shadow-md`}
    >
      <h2 className="mb-3 text-2xl font-bold text-slate-900">{title}</h2>

      <p className="text-sm leading-6 text-slate-700">{description}</p>
    </Link>
  );
}
