"use client";

import { useState } from "react";
import Link from "next/link";
import { QuizQuestion } from "../../types/quiz";
import { saveQuizResult } from "../../services/progressService";

interface QuizClientProps {
  questions: QuizQuestion[];
  moduleId: string;
}

export default function QuizClient({ questions, moduleId }: QuizClientProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  if (questions.length === 0) {
    return (
      <section className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="text-2xl font-bold text-slate-900">Quiz coming soon</h2>

        <p className="mt-4 text-slate-600">
          Questions for this module have not been added yet.
        </p>
      </section>
    );
  }

  const currentQuestion = questions[currentIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

  const finalScore = selectedAnswers.filter(
    (answer, index) => answer === questions[index].correctAnswer,
  ).length;

  function getScoreFeedback(score: number, total: number) {
    const percentage = (score / total) * 100;

    if (percentage === 100) {
      return {
        title: "Excellent work",
        message:
          "You answered every question correctly. You have a strong understanding of this topic.",
        style: "bg-green-50 text-green-800",
      };
    }

    if (percentage >= 80) {
      return {
        title: "Very good result",
        message:
          "You understand most of the topic well. Review the explanations for the questions you missed.",
        style: "bg-blue-50 text-blue-800",
      };
    }

    if (percentage >= 60) {
      return {
        title: "Good start",
        message:
          "You understand some important ideas, but it would be useful to review the module again.",
        style: "bg-yellow-50 text-yellow-800",
      };
    }

    return {
      title: "Review recommended",
      message:
        "This topic may need more practice. Read the module again and retake the quiz when you are ready.",
      style: "bg-red-50 text-red-800",
    };
  }

  function handleAnswer(answer: string) {
    if (selectedAnswer) return;

    setSelectedAnswer(answer);
    setSelectedAnswers((previousAnswers) => [...previousAnswers, answer]);
  }

  function handleNextQuestion() {
    if (currentIndex + 1 === questions.length) {
      const calculatedFinalScore = selectedAnswers.filter(
        (answer, index) => answer === questions[index].correctAnswer,
      ).length;

      saveQuizResult(moduleId, calculatedFinalScore, questions.length);
      setIsFinished(true);
      return;
    }

    setCurrentIndex((previousIndex) => previousIndex + 1);
    setSelectedAnswer(null);
  }

  function handleRetakeQuiz() {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setIsFinished(false);
  }

  if (isFinished) {
    const feedback = getScoreFeedback(finalScore, questions.length);

    return (
      <section className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
        <h2 className="mb-4 text-3xl font-bold text-slate-900">
          Quiz Completed
        </h2>

        <p className="text-lg text-slate-700">
          Your score:{" "}
          <span className="font-bold">
            {finalScore} / {questions.length}
          </span>
        </p>

        <div className={`mt-6 rounded-xl p-5 ${feedback.style}`}>
          <p className="font-bold">{feedback.title}</p>

          <p className="mt-2 leading-7">{feedback.message}</p>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={handleRetakeQuiz}
            className="rounded-xl bg-slate-900 px-5 py-3 text-center font-medium text-white transition hover:bg-slate-800"
          >
            Retake Quiz
          </button>

          <Link
            href={`/modules/${moduleId}`}
            className="rounded-xl border border-slate-300 px-5 py-3 text-center font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Review Module
          </Link>

          <Link
            href="/progress"
            className="rounded-xl bg-blue-600 px-5 py-3 text-center font-medium text-white transition hover:bg-blue-700"
          >
            View Progress
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
      <p className="mb-4 text-sm font-medium text-slate-500">
        Question {currentIndex + 1} of {questions.length}
      </p>

      {currentQuestion.scenario && (
        <div className="mb-6 rounded-xl border border-slate-200 bg-slate-50 p-5">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Scenario
          </p>

          <p className="whitespace-pre-line leading-7 text-slate-700">
            {currentQuestion.scenario}
          </p>
        </div>
      )}

      <h2 className="mb-6 text-2xl font-bold text-slate-900">
        {currentQuestion.question}
      </h2>

      <div className="space-y-3">
        {currentQuestion.options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isRightAnswer = option === currentQuestion.correctAnswer;

          let optionStyle = "border-slate-200 bg-white hover:bg-slate-50";

          if (selectedAnswer && isRightAnswer) {
            optionStyle = "border-green-500 bg-green-50";
          }

          if (selectedAnswer && isSelected && !isRightAnswer) {
            optionStyle = "border-red-500 bg-red-50";
          }

          return (
            <button
              key={option}
              onClick={() => handleAnswer(option)}
              className={`w-full rounded-xl border px-5 py-4 text-left transition ${optionStyle}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {selectedAnswer && (
        <div className="mt-6 rounded-xl bg-slate-100 p-5">
          <p className="font-bold text-slate-900">
            {isCorrect ? "Correct answer" : "Incorrect answer"}
          </p>

          <p className="mt-2 leading-7 text-slate-700">
            {currentQuestion.explanation}
          </p>

          <button
            onClick={handleNextQuestion}
            className="mt-5 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            {currentIndex + 1 === questions.length
              ? "Finish Quiz"
              : "Next Question"}
          </button>
        </div>
      )}
    </section>
  );
}
