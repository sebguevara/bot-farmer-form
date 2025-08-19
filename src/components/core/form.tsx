"use client";

import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsUp, MessageSquarePlus, Heart } from "lucide-react";
import { LikePostForm } from "./LikePost";
import { CommentPostForm } from "./CommentPost";
import { LikeCommentForm } from "./LikeComment";
import { NavList } from "./NavList";
import { postAgent } from "@/app/repositories/agent.repo";
import { Progress } from "../ui/progress";
import { toast } from "sonner";
import { Response } from "@/types/response.types";

export type GroupNumber = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
export type QueryPayload = { query: string };
export type ActionKind = "like-post" | "comment-post" | "like-comment";

export default function Panel() {
  const [active, setActive] = useState<ActionKind>("like-post");
  const [isLoading, setIsLoading] = useState(false);

  const [progress, setProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const timeoutsRef = useRef<number[]>([]);

  const clearTimers = () => {
    timeoutsRef.current.forEach((id) => clearTimeout(id));
    timeoutsRef.current = [];
  };

  useEffect(() => {
    if (isLoading) {
      clearTimers();
      setShowProgress(true);
      setProgress(0);

      const phases = [30, 45, 60];
      phases.forEach((val, idx) => {
        const t = window.setTimeout(() => setProgress(val), (idx + 1) * 2500);
        timeoutsRef.current.push(t);
      });
    } else {
      clearTimers();
      setProgress(100);
      const hide = window.setTimeout(() => {
        setShowProgress(false);
        setProgress(0);
      }, 700);
      timeoutsRef.current.push(hide);
    }

    return () => clearTimers();
  }, [isLoading]);

  const handleSubmit = async (payload: QueryPayload) => {
    try {
      setIsLoading(true);
      const res = await postAgent(payload.query) as unknown as Response;
      const response = res?.response?.split(".")[0];
      toast.success(response || "Acción realizada correctamente.");
    } catch (err: unknown) {
      toast.error(err instanceof Error ? err.message : "Ocurrió un error al procesar la solicitud.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex w-max justify-center">
      <div className="flex flex-col md:flex-row gap-4">
        <aside className="hidden md:block">
          <NavList active={active} onChange={setActive} disabled={isLoading} />
        </aside>

        <div className="md:hidden">
          <Tabs value={active} onValueChange={(v) => !isLoading && setActive(v as ActionKind)}>
            <TabsList className="w-full">
              <TabsTrigger value="like-post" className="flex-1" disabled={isLoading}>
                <ThumbsUp className="h-4 w-4 mr-2" />Like post
              </TabsTrigger>
              <TabsTrigger value="comment-post" className="flex-1" disabled={isLoading}>
                <MessageSquarePlus className="h-4 w-4 mr-2" />Comentar
              </TabsTrigger>
              <TabsTrigger value="like-comment" className="flex-1" disabled={isLoading}>
                <Heart className="h-4 w-4 mr-2" />Like a comentario
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <section className="min-w-[320px]">
          {active === "like-post" && <LikePostForm onSubmit={handleSubmit} isLoading={isLoading} />}
          {active === "comment-post" && <CommentPostForm onSubmit={handleSubmit} isLoading={isLoading} />}
          {active === "like-comment" && <LikeCommentForm onSubmit={handleSubmit} isLoading={isLoading} />}

          {showProgress && <Progress value={progress} className="h-2 my-4" />}
        </section>
      </div>
    </div>
  );
}
