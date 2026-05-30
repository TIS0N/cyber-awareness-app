import ModuleCard from "../../components/modules/ModuleCard";
import { modules } from "../../data/modules";

export default function ModulesPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      <h1 className="mb-10 text-4xl font-bold text-slate-900">
        All Learning Modules
      </h1>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {modules.map((module) => (
          <ModuleCard
            key={module.id}
            id={module.id}
            title={module.title}
            description={module.description}
            color={module.color}
          />
        ))}
      </div>
    </div>
  );
}
