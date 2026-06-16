import { BookOpen, Brain, ClipboardCheck } from "lucide-react";

interface ModulePathIndicatorProps {
  moduleId: string;
}

const pathThemes: Record<
  string,
  {
    hover: string;
    number: string;
    icon: string;
  }
> = {
  phishing: {
    hover: "hover:border-red-300 hover:bg-red-50",
    number: "bg-red-600",
    icon: "text-red-700",
  },
  passwords: {
    hover: "hover:border-green-300 hover:bg-green-50",
    number: "bg-green-600",
    icon: "text-green-700",
  },
  malware: {
    hover: "hover:border-amber-300 hover:bg-amber-50",
    number: "bg-amber-500",
    icon: "text-amber-700",
  },
  scams: {
    hover: "hover:border-blue-300 hover:bg-blue-50",
    number: "bg-blue-600",
    icon: "text-blue-700",
  },
};

export default function ModulePathIndicator({
  moduleId,
}: ModulePathIndicatorProps) {
  const theme = pathThemes[moduleId] ?? pathThemes.phishing;

  const steps = [
    {
      number: "1",
      title: "Learn",
      description: "Read the key safety concepts",
      href: "#learn",
      icon: BookOpen,
    },
    {
      number: "2",
      title: "Practice",
      description: "Analyze an interactive scenario",
      href: "#practice",
      icon: Brain,
    },
    {
      number: "3",
      title: "Quiz",
      description: "Test your understanding",
      href: "#quiz",
      icon: ClipboardCheck,
    },
  ];

  return (
    <section className="mt-8 rounded-2xl bg-white p-5 shadow-sm">
      <p className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">
        Module path
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {steps.map((step) => {
          const Icon = step.icon;

          return (
            <a
              key={step.title}
              href={step.href}
              className={`rounded-xl border border-slate-200 p-4 transition ${theme.hover}`}
            >
              <div className="mb-3 flex items-center gap-3">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold text-white ${theme.number}`}
                >
                  {step.number}
                </div>

                <Icon className={`h-5 w-5 ${theme.icon}`} />
              </div>

              <h3 className="font-bold text-slate-900">{step.title}</h3>

              <p className="mt-1 text-sm leading-6 text-slate-600">
                {step.description}
              </p>
            </a>
          );
        })}
      </div>
    </section>
  );
}
