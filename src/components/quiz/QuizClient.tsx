"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  LogIn,
  RotateCcw,
  UserPlus,
  XCircle,
} from "lucide-react";
import { createClient } from "../../lib/supabase/client";
import { getQuizQuestionsByModuleId } from "../../services/quizService";
import { saveUserQuizResult } from "../../services/supabaseProgressService";
import { QuizQuestion } from "../../types/quiz";

interface QuizClientProps {
  moduleId: string;
}

interface SelectedAnswer {
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
}

function shuffleArray<T>(items: T[]) {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    [shuffledItems[index], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[index],
    ];
  }

  return shuffledItems;
}

function shuffleQuestionOptions(question: QuizQuestion): QuizQuestion {
  return {
    ...question,
    options: shuffleArray(question.options),
  };
}

function getScoreFeedback(score: number, totalQuestions: number) {
  const percentage =
    totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;

  if (percentage === 100) {
    return {
      title: "Excellent work",
      message:
        "You answered every question correctly. This shows very strong understanding of the topic.",
      className: "border-green-200 bg-green-50 text-green-800",
    };
  }

  if (percentage >= 80) {
    return {
      title: "Very good result",
      message:
        "You understand the topic well. Review the explanations for any missed questions.",
      className: "border-blue-200 bg-blue-50 text-blue-800",
    };
  }

  if (percentage >= 60) {
    return {
      title: "Good start",
      message:
        "You understood some important ideas, but it would be useful to review the module again.",
      className: "border-amber-200 bg-amber-50 text-amber-800",
    };
  }

  return {
    title: "Review recommended",
    message:
      "This topic may still be unclear. Review the module and retake the quiz when ready.",
    className: "border-red-200 bg-red-50 text-red-800",
  };
}

export default function QuizClient({ moduleId }: QuizClientProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswer[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [saveErrorMessage, setSaveErrorMessage] = useState("");

  useEffect(() => {
    async function loadQuizQuestions() {
      setIsLoading(true);

      const loadedQuestions = await getQuizQuestionsByModuleId(moduleId);

      setQuestions(loadedQuestions.map(shuffleQuestionOptions));
      setIsLoading(false);
    }

    loadQuizQuestions();
  }, [moduleId]);

  useEffect(() => {
    const supabase = createClient();
    let isMounted = true;

    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (isMounted) {
        setIsLoggedIn(Boolean(user));
        setIsCheckingAuth(false);
      }
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session?.user));
      setIsCheckingAuth(false);
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const currentQuestion = questions[currentIndex];

  const finalScore = selectedAnswers.filter(
    (answer) => answer.isCorrect,
  ).length;

  function handleAnswerClick(option: string) {
    if (!currentQuestion || selectedAnswer) {
      return;
    }

    const isCorrect = option === currentQuestion.correctAnswer;

    setSelectedAnswer(option);

    setSelectedAnswers((previousAnswers) => [
      ...previousAnswers,
      {
        questionId: currentQuestion.id,
        selectedOption: option,
        isCorrect,
      },
    ]);
  }

  async function handleNextQuestion() {
    if (currentIndex === questions.length - 1) {
      const calculatedFinalScore = selectedAnswers.filter(
        (answer) => answer.isCorrect,
      ).length;

      const result = await saveUserQuizResult(
        moduleId,
        calculatedFinalScore,
        questions.length,
      );

      if (result.success) {
        setSaveMessage("Your quiz result was saved to your account.");
        setSaveErrorMessage("");
      } else {
        setSaveMessage("");
        setSaveErrorMessage(
          result.error ?? "Your quiz result could not be saved.",
        );
      }

      setIsFinished(true);
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex + 1);
    setSelectedAnswer(null);
  }

  function handleRetakeQuiz() {
    setQuestions((previousQuestions) =>
      previousQuestions.map(shuffleQuestionOptions),
    );
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setSaveMessage("");
    setSaveErrorMessage("");
    setIsFinished(false);
  }

  function getOptionClass(option: string) {
    if (!selectedAnswer || !currentQuestion) {
      return "border-slate-200 bg-white text-slate-800 hover:border-blue-300 hover:bg-blue-50";
    }

    if (option === currentQuestion.correctAnswer) {
      return "border-green-500 bg-green-50 text-green-900";
    }

    if (option === selectedAnswer && option !== currentQuestion.correctAnswer) {
      return "border-red-500 bg-red-50 text-red-900";
    }

    return "border-slate-200 bg-white text-slate-500";
  }

  if (isLoading) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <div className="rounded-2xl bg-white p-8 shadow-sm">
          <div className="h-7 w-1/2 animate-pulse rounded bg-slate-200" />
          <div className="mt-6 h-5 w-full animate-pulse rounded bg-slate-200" />
          <div className="mt-3 h-5 w-5/6 animate-pulse rounded bg-slate-200" />

          <div className="mt-8 space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-14 animate-pulse rounded-xl bg-slate-200"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <section className="rounded-2xl bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold text-slate-900">Quiz not found</h1>

          <p className="mt-3 leading-7 text-slate-600">
            No quiz questions were loaded for this module. Check the Supabase
            quizzes table and make sure the module_id matches this module.
          </p>

          <Link
            href={`/modules/${moduleId}`}
            className="mt-6 inline-flex rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Back to module
          </Link>
        </section>
      </div>
    );
  }

  if (isFinished) {
    const feedback = getScoreFeedback(finalScore, questions.length);
    const percentage = Math.round((finalScore / questions.length) * 100);

    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <section className="rounded-2xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-700">
            <CheckCircle2 className="h-9 w-9" />
          </div>

          <h1 className="text-4xl font-bold text-slate-900">Quiz Completed</h1>

          <p className="mt-4 text-lg text-slate-600">Your score:</p>

          <p className="mt-2 text-5xl font-bold text-slate-900">
            {finalScore} / {questions.length}
          </p>

          <p className="mt-2 text-xl font-semibold text-slate-700">
            {percentage}%
          </p>

          <div
            className={`mt-8 rounded-2xl border p-5 text-left ${feedback.className}`}
          >
            <h2 className="text-xl font-bold">{feedback.title}</h2>
            <p className="mt-2 leading-7">{feedback.message}</p>
          </div>

          {saveMessage && (
            <p className="mt-4 rounded-xl bg-green-50 p-3 text-sm font-medium text-green-700">
              {saveMessage}
            </p>
          )}

          {saveErrorMessage && !isLoggedIn && (
            <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-left text-amber-900">
              <h2 className="font-bold">Result not saved</h2>

              <p className="mt-2 text-sm leading-6">
                Your quiz result was not saved because you are not logged in. To
                save future quiz results and track your progress, please log in
                or create an account before taking a quiz.
              </p>

              <div className="mt-4 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={`/login?redirectedFrom=/quiz/${moduleId}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
                >
                  <LogIn className="h-4 w-4" />
                  Log in
                </Link>

                <Link
                  href="/register"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-300 bg-white px-4 py-3 text-sm font-bold text-amber-900 transition hover:bg-amber-100"
                >
                  <UserPlus className="h-4 w-4" />
                  Create account
                </Link>
              </div>
            </div>
          )}

          {saveErrorMessage && isLoggedIn && (
            <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
              {saveErrorMessage}
            </p>
          )}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <button
              type="button"
              onClick={handleRetakeQuiz}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-5 py-3 font-medium text-slate-700 transition hover:bg-slate-50"
            >
              <RotateCcw className="h-5 w-5" />
              Retake Quiz
            </button>

            <Link
              href={`/modules/${moduleId}`}
              className="rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
            >
              Review Module
            </Link>

            <Link
              href="/progress"
              className="rounded-xl bg-slate-700 px-5 py-3 font-medium text-white transition hover:bg-slate-600"
            >
              View Progress
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link
        href={`/modules/${moduleId}`}
        className="mb-6 inline-flex text-sm font-medium text-blue-700 hover:underline"
      >
        ← Back to module
      </Link>

      <section className="rounded-2xl bg-white p-8 shadow-sm">
        {!isCheckingAuth && !isLoggedIn && (
          <div className="mb-6 rounded-2xl border border-amber-200 bg-amber-50 p-5 text-amber-900">
            <h2 className="font-bold">Progress will not be saved</h2>

            <p className="mt-2 text-sm leading-6">
              You can complete this quiz without an account, but your result
              will not be saved. Log in or create an account before starting if
              you want to save your progress.
            </p>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Link
                href={`/login?redirectedFrom=/quiz/${moduleId}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white transition hover:bg-blue-700"
              >
                <LogIn className="h-4 w-4" />
                Log in
              </Link>

              <Link
                href="/register"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-amber-300 bg-white px-4 py-3 text-sm font-bold text-amber-900 transition hover:bg-amber-100"
              >
                <UserPlus className="h-4 w-4" />
                Create account
              </Link>
            </div>
          </div>
        )}

        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-bold uppercase tracking-wide text-slate-500">
              Question {currentIndex + 1} of {questions.length}
            </p>

            <div className="mt-3 h-2 rounded-full bg-slate-200">
              <div
                className="h-2 rounded-full bg-blue-600 transition-all"
                style={{
                  width: `${((currentIndex + 1) / questions.length) * 100}%`,
                }}
              />
            </div>
          </div>
        </div>

        {currentQuestion.scenario && (
          <div className="mb-6 whitespace-pre-line rounded-2xl border border-slate-200 bg-slate-50 p-5 leading-7 text-slate-700">
            <p className="mb-2 text-sm font-bold uppercase tracking-wide text-slate-500">
              Scenario
            </p>
            {currentQuestion.scenario}
          </div>
        )}

        <h1 className="text-2xl font-bold leading-9 text-slate-900">
          {currentQuestion.question}
        </h1>

        <div className="mt-8 grid gap-3">
          {currentQuestion.options.map((option) => {
            const isSelected = selectedAnswer === option;
            const isCorrect = option === currentQuestion.correctAnswer;

            return (
              <button
                key={option}
                type="button"
                onClick={() => handleAnswerClick(option)}
                className={`rounded-xl border p-4 text-left font-medium transition ${getOptionClass(
                  option,
                )}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <span>{option}</span>

                  {selectedAnswer && isCorrect && (
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-green-700" />
                  )}

                  {selectedAnswer && isSelected && !isCorrect && (
                    <XCircle className="h-5 w-5 shrink-0 text-red-700" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {selectedAnswer && (
          <div className="mt-6 rounded-2xl bg-slate-50 p-5">
            <p
              className={`font-bold ${
                selectedAnswer === currentQuestion.correctAnswer
                  ? "text-green-700"
                  : "text-red-700"
              }`}
            >
              {selectedAnswer === currentQuestion.correctAnswer
                ? "Correct"
                : "Incorrect"}
            </p>

            <p className="mt-2 leading-7 text-slate-700">
              {currentQuestion.explanation}
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-end">
          <button
            type="button"
            onClick={handleNextQuestion}
            disabled={!selectedAnswer}
            className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {currentIndex === questions.length - 1
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        </div>
      </section>
    </div>
  );
}
