"use client";
import React, { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

type Mode = "auto" | "light" | "dark";

function noiseDataURI(alpha = 0.55, freq = 0.75, seed = 3) {
  const svg = `
  <svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'>
    <filter id='n'>
      <feTurbulence type='fractalNoise' baseFrequency='${freq}' numOctaves='3' seed='${seed}' stitchTiles='stitch'/>
      <feColorMatrix type='saturate' values='0'/>
      <feComponentTransfer><feFuncA type='table' tableValues='0 ${alpha}'/></feComponentTransfer>
    </filter>
    <rect width='100%' height='100%' filter='url(#n)'/>
  </svg>`;
  return `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`;
}

const midnightBG = [
  "radial-gradient(560px 320px at 20% 18%, rgba(59,130,246,.38), transparent 70%)",
  "radial-gradient(640px 380px at 80% 70%, rgba(168,85,247,.34), transparent 70%)",
  "radial-gradient(520px 300px at 50% 110%, rgba(16,185,129,.22), transparent 65%)",
  "linear-gradient(120deg, #070b13 0%, #0a0f1e 32%, #0b132b 66%, #070b13 100%)",
].join(",");

const sunsetClasses =
  "bg-gradient-to-br from-rose-400/30 via-amber-300/20 to-fuchsia-400/30 " +
  "dark:from-rose-500/25 dark:via-amber-400/15 dark:to-fuchsia-500/25";

export function DarkHeroBg({
  mode = "auto",
  className,
  vignette = 0.6,
}: {
  mode?: Mode;
  className?: string;
  vignette?: number;
}) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const isDark = useMemo(
    () => (mode === "dark") || (mode === "auto" && resolvedTheme === "dark"),
    [mode, resolvedTheme]
  );

  if (!mounted) return <div className={cn("absolute inset-0 -z-10", className)} />;

  const gridMain = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.10)";
  const gridSub  = isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)";
  const gridOpacity = isDark ? 0.24 : 0.0;
  const noiseOpacity = isDark ? 0.5 : 0.18;
  const vignetteNow = isDark ? vignette : 0.35;

  return (
    <div className={cn("absolute inset-0 -z-10 overflow-hidden", className)}>
      {isDark ? (
        <div className="absolute inset-0" style={{ backgroundImage: midnightBG }} />
      ) : (
        <div className={cn("absolute inset-0", sunsetClasses)} />
      )}

      <div
        className="absolute inset-0"
        style={{
          opacity: gridOpacity,
          mixBlendMode: "overlay",
          backgroundImage: `
            linear-gradient(${gridMain} 1px, transparent 1px),
            linear-gradient(90deg, ${gridSub} 1px, transparent 1px)
          `,
          backgroundSize: "44px 44px, 44px 44px",
          backgroundPosition: "0 0, 0 0",
        }}
      />

      <div
        className="absolute inset-0"
        style={{
          opacity: noiseOpacity,
          mixBlendMode: "soft-light",
          backgroundImage: noiseDataURI(isDark ? 0.55 : 0.25, isDark ? 0.75 : 0.65),
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(70% 60% at 50% 35%, rgba(0,0,0,0) 0%, rgba(0,0,0,${vignetteNow}) 75%)`,
        }}
      />
    </div>
  );
}
