import QuizClient from "../../../components/quiz/QuizClient";

interface QuizPageProps {
  params: Promise<{
    moduleId: string;
  }>;
}

export default async function QuizPage({ params }: QuizPageProps) {
  const { moduleId } = await params;

  return <QuizClient moduleId={moduleId} />;
}
