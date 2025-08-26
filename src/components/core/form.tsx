"use client";

import React, { useEffect, useRef, useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ThumbsUp, MessageSquarePlus, Heart } from "lucide-react";
import { LikeCommentForm } from "./LikeComment";
import { LikePostForm } from "./LikePost";
import { CommentPostForm } from "./CommentPost";
import { NavList } from "./NavList";
import { Progress } from "../ui/progress";

export type GroupNumber = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8";
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

  return (
    <div className="flex w-full justify-center max-w-[866px]">
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <aside className="hidden md:block">
          <NavList active={active} onChange={setActive} disabled={isLoading} />
        </aside>

        <div className="md:hidden w-full">
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

        <section className="min-w-[380px] w-full">
          {active === "like-post" && <LikePostForm isLoading={isLoading} setLoading={setIsLoading} />}
          {active === "comment-post" && <CommentPostForm isLoading={isLoading} setLoading={setIsLoading} />}
          {active === "like-comment" && <LikeCommentForm isLoading={isLoading} setLoading={setIsLoading} />}

          {showProgress && <Progress value={progress} className="h-2 my-4" />}
        </section>
      </div>
    </div>
  );
}
