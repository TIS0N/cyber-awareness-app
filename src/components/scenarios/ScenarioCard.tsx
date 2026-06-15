"use client";

import { useState } from "react";
import { Scenario, ScenarioElement } from "../../types/scenario";

interface ScenarioCardProps {
  scenario: Scenario;
}

export default function ScenarioCard({ scenario }: ScenarioCardProps) {
  const [selectedElements, setSelectedElements] = useState<string[]>([]);
  const [activeElement, setActiveElement] = useState<ScenarioElement | null>(
    null,
  );

  const suspiciousElements = scenario.elements.filter(
    (element) => element.isSuspicious,
  );

  const foundSuspiciousElements = scenario.elements.filter(
    (element) => element.isSuspicious && selectedElements.includes(element.id),
  );

  const wrongSelections = scenario.elements.filter(
    (element) => !element.isSuspicious && selectedElements.includes(element.id),
  );

  function handleElementClick(element: ScenarioElement) {
    if (!selectedElements.includes(element.id)) {
      setSelectedElements((previousElements) => [
        ...previousElements,
        element.id,
      ]);
    }

    setActiveElement(element);
  }

  function getElementStyle(element: ScenarioElement) {
    const wasSelected = selectedElements.includes(element.id);

    if (!wasSelected) {
      return "border-slate-200 bg-white hover:bg-slate-50";
    }

    if (element.isSuspicious) {
      return "border-green-500 bg-green-50 text-green-900";
    }

    return "border-yellow-500 bg-yellow-50 text-yellow-900";
  }

  function getScenarioLabel() {
    switch (scenario.type) {
      case "email":
        return "Email message";
      case "sms":
        return "SMS / chat message";
      case "website":
        return "Website page";
      case "download":
        return "Download page";
      case "shop":
        return "Online offer";
      default:
        return "Scenario";
    }
  }

  return (
    <section className="mt-10 rounded-2xl bg-white p-8 shadow-sm">
      <div className="mb-6">
        <p className="mb-2 text-sm font-medium text-blue-700">
          Interactive scenario · {getScenarioLabel()}
        </p>

        <h2 className="text-2xl font-bold text-slate-900">{scenario.title}</h2>

        <p className="mt-2 leading-7 text-slate-600">{scenario.description}</p>

        <p className="mt-3 rounded-xl bg-blue-50 p-4 text-sm leading-6 text-blue-900">
          {scenario.instruction}
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="grid gap-4">
          {scenario.elements.map((element) => (
            <button
              key={element.id}
              type="button"
              onClick={() => handleElementClick(element)}
              className={`rounded-xl border p-4 text-left transition ${getElementStyle(
                element,
              )}`}
            >
              <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                {element.label}
              </span>

              <span className="mt-1 block leading-7">{element.content}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 rounded-xl bg-slate-100 p-5">
        <div className="flex flex-col gap-2 text-sm text-slate-700 sm:flex-row sm:items-center sm:justify-between">
          <p>
            Suspicious elements found:{" "}
            <span className="font-bold">
              {foundSuspiciousElements.length} / {suspiciousElements.length}
            </span>
          </p>

          <p>
            Wrong selections:{" "}
            <span className="font-bold">{wrongSelections.length}</span>
          </p>
        </div>

        {activeElement ? (
          <div className="mt-4">
            <p
              className={`font-bold ${
                activeElement.isSuspicious
                  ? "text-green-700"
                  : "text-yellow-700"
              }`}
            >
              {activeElement.isSuspicious
                ? "Good catch"
                : "Not the strongest warning sign"}
            </p>

            <p className="mt-2 leading-7 text-slate-700">
              {activeElement.explanation}
            </p>
          </div>
        ) : (
          <p className="mt-4 leading-7 text-slate-600">
            Click on the parts of the scenario that you think are suspicious.
          </p>
        )}

        {foundSuspiciousElements.length === suspiciousElements.length && (
          <p className="mt-4 rounded-xl bg-green-50 p-4 font-medium text-green-800">
            Great job. You found all important suspicious elements in this
            scenario.
          </p>
        )}
      </div>
    </section>
  );
}
