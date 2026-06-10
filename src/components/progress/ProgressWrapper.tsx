"use client";

import dynamic from "next/dynamic";

const ProgressClient = dynamic(() => import("./ProgressClient"), {
  ssr: false,
});

export default function ProgressWrapper() {
  return <ProgressClient />;
}
