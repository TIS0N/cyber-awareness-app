"use client";

import dynamic from "next/dynamic";

const ModulesClient = dynamic(() => import("./ModulesClient"), {
  ssr: false,
});

export default function ModulesWrapper() {
  return <ModulesClient />;
}
