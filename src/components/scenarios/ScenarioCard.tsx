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
      return "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50";
    }

    if (element.isSuspicious) {
      return "border-green-500 bg-green-50 text-green-900";
    }

    return "border-yellow-500 bg-yellow-50 text-yellow-900";
  }

  function ClickableElement({
    element,
    compact = false,
  }: {
    element: ScenarioElement;
    compact?: boolean;
  }) {
    return (
      <button
        type="button"
        onClick={() => handleElementClick(element)}
        className={`w-full rounded-xl border text-left transition ${getElementStyle(
          element,
        )} ${compact ? "px-3 py-2" : "p-4"}`}
      >
        <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
          {element.label}
        </span>

        <span className="mt-1 block whitespace-pre-line leading-7">
          {element.content}
        </span>
      </button>
    );
  }

  function renderEmailScenario() {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 bg-slate-100 px-5 py-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-yellow-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
          </div>
        </div>

        <div className="space-y-4 p-6">
          {scenario.elements.map((element, index) => (
            <ClickableElement
              key={element.id}
              element={element}
              compact={index < 2}
            />
          ))}
        </div>
      </div>
    );
  }

  function renderWebsiteScenario() {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 bg-slate-100 p-4">
          <div className="rounded-full bg-white px-4 py-2 text-sm text-slate-600 shadow-sm">
            Website preview
          </div>
        </div>

        <div className="space-y-5 p-6">
          {scenario.elements.map((element, index) => {
            if (index === 0) {
              return (
                <div key={element.id}>
                  <p className="mb-2 text-sm font-medium text-slate-500">
                    Address bar
                  </p>
                  <ClickableElement element={element} compact />
                </div>
              );
            }

            return <ClickableElement key={element.id} element={element} />;
          })}
        </div>
      </div>
    );
  }

  function renderDownloadScenario() {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-sm">
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-100 text-2xl">
              📄
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                File Download
              </h3>
              <p className="text-sm text-slate-500">
                Review the download details carefully.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {scenario.elements.map((element) => (
              <ClickableElement key={element.id} element={element} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderShopScenario() {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <div className="flex h-56 items-center justify-center rounded-2xl bg-slate-100 text-6xl">
            📱
          </div>

          <div className="space-y-4">
            {scenario.elements.map((element) => (
              <ClickableElement key={element.id} element={element} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderSmsScenario() {
    return (
      <div className="mx-auto max-w-md rounded-[2rem] border border-slate-300 bg-slate-900 p-4 shadow-sm">
        <div className="rounded-[1.5rem] bg-white p-5">
          <div className="mb-4 text-center text-sm font-medium text-slate-500">
            SMS / Chat message
          </div>

          <div className="space-y-3">
            {scenario.elements.map((element) => (
              <ClickableElement key={element.id} element={element} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderScenarioContent() {
    switch (scenario.type) {
      case "email":
        return renderEmailScenario();
      case "website":
        return renderWebsiteScenario();
      case "download":
        return renderDownloadScenario();
      case "shop":
        return renderShopScenario();
      case "sms":
        return renderSmsScenario();
      default:
        return renderEmailScenario();
    }
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

      {renderScenarioContent()}

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
            Click parts of the scenario that you think are suspicious. Some
            parts are dangerous, while others are normal.
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
