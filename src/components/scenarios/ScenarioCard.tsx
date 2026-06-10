"use client";

import { useState } from "react";
import { Scenario } from "../../types/scenario";

interface ScenarioCardProps {
  scenario: Scenario;
}

export default function ScenarioCard({ scenario }: ScenarioCardProps) {
  const [selectedHotspots, setSelectedHotspots] = useState<string[]>([]);
  const [activeExplanation, setActiveExplanation] = useState<string | null>(
    null,
  );

  function handleHotspotClick(id: string, explanation: string) {
    if (!selectedHotspots.includes(id)) {
      setSelectedHotspots((previous) => [...previous, id]);
    }

    setActiveExplanation(explanation);
  }

  function getHotspotStyle(id: string) {
    const wasSelected = selectedHotspots.includes(id);

    return `
      cursor-pointer
      rounded-lg
      border
      px-2
      py-1
      transition
      ${
        wasSelected
          ? "border-red-400 bg-red-50 text-red-800"
          : "border-transparent hover:border-yellow-400 hover:bg-yellow-50"
      }
    `;
  }

  const totalHotspots = 4;

  return (
    <section className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-900">{scenario.title}</h2>

        <p className="mt-2 text-slate-600">{scenario.description}</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="mb-4 border-b border-slate-200 pb-4">
          <p className="text-sm text-slate-500">From:</p>
          <button
            type="button"
            onClick={() =>
              handleHotspotClick(
                scenario.email.from.id,
                scenario.email.from.explanation,
              )
            }
            className={getHotspotStyle(scenario.email.from.id)}
          >
            {scenario.email.from.label}
          </button>
        </div>

        <div className="mb-4 border-b border-slate-200 pb-4">
          <p className="text-sm text-slate-500">Subject:</p>
          <button
            type="button"
            onClick={() =>
              handleHotspotClick(
                scenario.email.subject.id,
                scenario.email.subject.explanation,
              )
            }
            className={getHotspotStyle(scenario.email.subject.id)}
          >
            {scenario.email.subject.label}
          </button>
        </div>

        <div className="space-y-4 leading-7 text-slate-700">
          <p>{scenario.email.greeting}</p>

          <button
            type="button"
            onClick={() =>
              handleHotspotClick(
                scenario.email.body.id,
                scenario.email.body.explanation,
              )
            }
            className={`${getHotspotStyle(scenario.email.body.id)} text-left`}
          >
            {scenario.email.body.label}
          </button>

          <div>
            <button
              type="button"
              onClick={() =>
                handleHotspotClick(
                  scenario.email.link.id,
                  scenario.email.link.explanation,
                )
              }
              className={`${getHotspotStyle(
                scenario.email.link.id,
              )} text-left text-blue-700 underline`}
            >
              {scenario.email.link.label}
            </button>
          </div>

          <p className="whitespace-pre-line">{scenario.email.footer}</p>
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-slate-100 p-5">
        <p className="font-medium text-slate-900">
          Found suspicious elements: {selectedHotspots.length} / {totalHotspots}
        </p>

        {activeExplanation ? (
          <p className="mt-3 leading-7 text-slate-700">{activeExplanation}</p>
        ) : (
          <p className="mt-3 text-slate-600">
            Click on suspicious parts of the email to see explanations.
          </p>
        )}

        {selectedHotspots.length === totalHotspots && (
          <p className="mt-4 font-medium text-green-700">
            Great job. You identified all suspicious elements in this email.
          </p>
        )}
      </div>
    </section>
  );
}
