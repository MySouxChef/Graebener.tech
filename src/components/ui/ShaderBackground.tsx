"use client";

import dynamic from "next/dynamic";

const CyberneticGridShader = dynamic(
  () =>
    import("@/components/ui/CyberneticGridShader").then(
      (mod) => mod.CyberneticGridShader
    ),
  { ssr: false }
);

export function ShaderBackground() {
  return <CyberneticGridShader />;
}
