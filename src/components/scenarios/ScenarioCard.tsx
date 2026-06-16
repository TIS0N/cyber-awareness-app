"use client";

import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  FileWarning,
  Globe,
  Mail,
  MousePointerClick,
  ShoppingBag,
  Smartphone,
} from "lucide-react";
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
      return "border-slate-200 bg-white text-slate-800 hover:border-slate-300 hover:bg-slate-50";
    }

    if (element.isSuspicious) {
      return "border-green-500 bg-green-50 text-green-900 ring-1 ring-green-200";
    }

    return "border-amber-500 bg-amber-50 text-amber-900 ring-1 ring-amber-200";
  }

  function getScenarioInfo() {
    switch (scenario.type) {
      case "email":
        return {
          label: "Email message",
          icon: Mail,
          accent: "text-blue-700",
          soft: "bg-blue-50 text-blue-900",
        };
      case "sms":
        return {
          label: "SMS / chat message",
          icon: Smartphone,
          accent: "text-indigo-700",
          soft: "bg-indigo-50 text-indigo-900",
        };
      case "website":
        return {
          label: "Website page",
          icon: Globe,
          accent: "text-violet-700",
          soft: "bg-violet-50 text-violet-900",
        };
      case "download":
        return {
          label: "Download page",
          icon: FileWarning,
          accent: "text-amber-700",
          soft: "bg-amber-50 text-amber-900",
        };
      case "shop":
        return {
          label: "Online offer",
          icon: ShoppingBag,
          accent: "text-emerald-700",
          soft: "bg-emerald-50 text-emerald-900",
        };
      default:
        return {
          label: "Scenario",
          icon: MousePointerClick,
          accent: "text-blue-700",
          soft: "bg-blue-50 text-blue-900",
        };
    }
  }

  function ClickableElement({
    element,
    compact = false,
  }: {
    element: ScenarioElement;
    compact?: boolean;
  }) {
    const wasSelected = selectedElements.includes(element.id);

    return (
      <button
        type="button"
        onClick={() => handleElementClick(element)}
        className={`min-h-14 w-full rounded-xl border text-left transition ${getElementStyle(
          element,
        )} ${compact ? "px-4 py-3" : "p-4 sm:p-5"}`}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
              {element.label}
            </span>

            <span className="mt-1 block break-words leading-7">
              {element.content}
            </span>
          </div>

          {wasSelected && (
            <span className="shrink-0 pt-1">
              {element.isSuspicious ? (
                <CheckCircle2 className="h-5 w-5 text-green-700" />
              ) : (
                <AlertTriangle className="h-5 w-5 text-amber-700" />
              )}
            </span>
          )}
        </div>
      </button>
    );
  }

  function renderEmailScenario() {
    return (
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-100 px-4 py-3 sm:px-5">
          <div className="flex items-center justify-between gap-4">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-yellow-400" />
              <span className="h-3 w-3 rounded-full bg-green-400" />
            </div>

            <p className="text-xs font-medium text-slate-500">Inbox preview</p>
          </div>
        </div>

        <div className="space-y-3 p-4 sm:space-y-4 sm:p-6">
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
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 bg-slate-100 p-3 sm:p-4">
          <div className="rounded-full bg-white px-4 py-2 text-xs text-slate-600 shadow-sm sm:text-sm">
            secure-account-login-help.com
          </div>
        </div>

        <div className="p-4 sm:p-6">
          <div className="mb-5 rounded-2xl bg-slate-50 p-5 text-center">
            <Globe className="mx-auto mb-3 h-8 w-8 text-slate-500" />
            <h3 className="text-xl font-bold text-slate-900">
              Account Verification
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Review the page details before trusting it.
            </p>
          </div>

          <div className="space-y-3 sm:space-y-4">
            {scenario.elements.map((element) => (
              <ClickableElement key={element.id} element={element} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  function renderDownloadScenario() {
    return (
      <div className="rounded-2xl border border-slate-200 bg-slate-100 p-4 shadow-sm sm:p-6">
        <div className="mx-auto max-w-2xl rounded-2xl bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-3xl">
              📄
            </div>

            <div>
              <h3 className="text-xl font-bold text-slate-900">
                File Download
              </h3>
              <p className="text-sm leading-6 text-slate-500">
                Check the file and source before downloading.
              </p>
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4">
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
      <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="grid gap-6 md:grid-cols-[220px_1fr]">
          <div className="flex min-h-52 items-center justify-center rounded-2xl bg-slate-100 text-6xl">
            📱
          </div>

          <div>
            <div className="mb-5">
              <p className="text-sm font-medium text-slate-500">
                Promotional offer
              </p>
              <h3 className="text-2xl font-bold text-slate-900">
                Prize claim page
              </h3>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Decide which parts are warning signs.
              </p>
            </div>

            <div className="space-y-3 sm:space-y-4">
              {scenario.elements.map((element) => (
                <ClickableElement key={element.id} element={element} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderSmsScenario() {
    return (
      <div className="mx-auto max-w-md rounded-[2rem] border border-slate-300 bg-slate-900 p-3 shadow-sm sm:p-4">
        <div className="rounded-[1.5rem] bg-white p-4 sm:p-5">
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

  const scenarioInfo = getScenarioInfo();
  const ScenarioIcon = scenarioInfo.icon;

  return (
    <section className="mt-10 rounded-2xl bg-white p-5 shadow-sm sm:p-8">
      <div className="mb-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ${scenarioInfo.soft}`}
          >
            <ScenarioIcon className="h-4 w-4" />
            Interactive scenario · {scenarioInfo.label}
          </span>
        </div>

        <h2 className="text-2xl font-bold text-slate-900">{scenario.title}</h2>

        <p className="mt-2 leading-7 text-slate-600">{scenario.description}</p>

        <div className="mt-4 flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-700">
          <MousePointerClick className="mt-0.5 h-5 w-5 shrink-0 text-slate-500" />
          <p>{scenario.instruction}</p>
        </div>
      </div>

      {renderScenarioContent()}

      <div className="mt-6 rounded-xl bg-slate-100 p-4 sm:p-5">
        <div className="grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <div className="rounded-xl bg-white p-3">
            <p className="text-slate-500">Suspicious elements found</p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              {foundSuspiciousElements.length} / {suspiciousElements.length}
            </p>
          </div>

          <div className="rounded-xl bg-white p-3">
            <p className="text-slate-500">Wrong selections</p>
            <p className="mt-1 text-lg font-bold text-slate-900">
              {wrongSelections.length}
            </p>
          </div>
        </div>

        {activeElement ? (
          <div className="mt-4 rounded-xl bg-white p-4">
            <p
              className={`font-bold ${
                activeElement.isSuspicious ? "text-green-700" : "text-amber-700"
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
          <p className="mt-4 rounded-xl bg-white p-4 leading-7 text-slate-600">
            Click or tap parts of the scenario that you think are suspicious.
            Some parts are dangerous, while others are normal.
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
