"use client";

import { useState } from "react";
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

  if (isFinished) {
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

        <p className="mt-4 leading-7 text-slate-600">
          Good work. Review the module again if you want to improve your
          understanding.
        </p>
      </section>
    );
  }

  return (
    <section className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
      <p className="mb-4 text-sm font-medium text-slate-500">
        Question {currentIndex + 1} of {questions.length}
      </p>

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
