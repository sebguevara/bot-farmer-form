"use client"

import Panel from "@/components/core/form";
import { DarkHeroBg } from "@/components/ui/gradient-bg";

export default function Home() {
  return (
    <div className="relative min-h-screen py-10 mx-auto w-full flex justify-center px-4 pt-8">
      <DarkHeroBg mode="auto" />
      <main className="relative z-10 w-full h-max flex justify-center items-center">
        <Panel />
      </main>
    </div>
  );
}
