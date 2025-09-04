"use client";

import Panel from "@/components/core/form";
import { useAuth } from "@/providers/authContext";
import { DarkHeroBg } from "@/components/ui/gradient-bg";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { isAuthenticated, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return (
      <div className="max-w-[1366px] relative min-h-screen py-10 mx-auto w-full flex flex-col px-4 pt-8">
        <DarkHeroBg mode="auto" />

        <div className="flex w-full justify-center items-center pt-2 mb-8">
          <div className="flex justify-between items-center w-full max-w-[866px]">
            <h1>Panel General</h1>
            <Button onClick={logout} variant="outline">
              Cerrar sesión
            </Button>
          </div>
        </div>
        <main className="relative z-10 w-full h-max flex justify-center items-center">
          <Panel />
        </main>
      </div>
    );
  }
}
