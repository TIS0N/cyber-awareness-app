import Link from "next/link";
import { quizQuestions } from "../../../data/quizzes";
import { modules } from "../../../data/modules";
import { notFound } from "next/navigation";
import QuizClient from "../../../components/quiz/QuizClient";

interface QuizPageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { moduleId } = await params;

  const module1 = modules.find((m) => m.id === moduleId);

  if (!module1) {
    notFound();
  }

  const questions = quizQuestions.filter(
    (question) => question.moduleId === moduleId,
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <Link
        href={`/modules/${moduleId}`}
        className="mb-6 inline-flex text-sm font-medium text-blue-700 hover:underline"
      >
        ← Back to module
      </Link>
      <div className={`${module1.color} rounded-2xl p-8`}>
        <h1 className="mb-3 text-4xl font-bold text-slate-900">
          {module1.title} Quiz
        </h1>

        <p className="text-lg text-slate-700">
          Test what you learned in this module.
        </p>
      </div>

      <QuizClient questions={questions} moduleId={moduleId} />
    </div>
  );
}
