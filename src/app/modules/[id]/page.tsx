import { modules } from "../../../data/modules";
import { notFound } from "next/navigation";

interface ModulePageProps {
  params: {
    id: string;
  };
}

export default function ModulePage({ params }: ModulePageProps) {
  const module1 = modules.find((m) => m.id === params.id);

  if (!module1) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <div className={`${module1.color} rounded-2xl p-8`}>
        <h1 className="mb-4 text-4xl font-bold text-slate-900">
          {module1.title}
        </h1>

        <p className="text-lg leading-8 text-slate-700">
          {module1.description}
        </p>
      </div>

      <section className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-2xl font-bold">Module Content</h2>

        <p className="leading-7 text-slate-600">
          Educational content for this module will be added here.
        </p>
      </section>
    </div>
  );
}
