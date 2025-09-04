"use client";

import { useMemo, useState } from "react";
import { splitToArray } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquarePlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FieldRow, Helper } from "./Utils";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { commentPost } from "@/repositories/agent.repo";
import { CommentPostPayload } from "@/types";
import { toast } from "sonner";
import { Response } from "@/types/index";

export const CommentPostForm = ({
  isLoading,
  setLoading,
}: {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}) => {
  const [usernames, setUsernames] = useState("");
  const [posts, setPosts] = useState("");
  const [comments, setComments] = useState("");

  const postsArr = useMemo(() => splitToArray(posts), [posts]);
  const commentsArr = useMemo(
    () =>
      comments
        .split(/\n+/)
        .map((s) => s.trim())
        .filter(Boolean),
    [comments]
  );

  const isDisabled = useMemo(() => {
    return !usernames || postsArr.length === 0 || comments.length === 0;
  }, [usernames, postsArr.length, comments.length]);

  const handleSubmit = async () => {
    if (!usernames || postsArr.length === 0 || comments.length === 0) return;
    setLoading(true);
    const payload = {
      post_id: posts,
      message: comments,
      username: usernames,
    } as CommentPostPayload;
    try {
      const res: Response = await commentPost(
        payload.post_id,
        payload.message,
        payload.username
      );
      if (res.status === "success") {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (err: unknown) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Ocurrió un error al procesar la solicitud."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="rounded-2xl w-full min-w-[380px]">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquarePlus className="h-5 w-5" />
          Crear comentario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <FieldRow>
          <div className="flex-1 md:flex-none w-max">
            <Label className="pb-2">Cuenta</Label>
            <Input
              className="border border-accent-foreground"
              disabled={isLoading}
              placeholder="@cuenta"
              value={usernames}
              onChange={(e) => setUsernames(e.target.value)}
            />
            <Helper text="Cuenta que comentará" />
          </div>
          <div className="flex-1">
            <Label className="pb-2">ID del Post</Label>
            <Input
              className="border border-accent-foreground"
              disabled={isLoading}
              placeholder="DJaJ14DtKqd"
              value={posts}
              onChange={(e) => setPosts(e.target.value)}
            />
            <Helper text="ID de la publicación." />
          </div>
        </FieldRow>
        <div>
          <Label className="pb-2">Comentario</Label>
          <Input
            className="border border-accent-foreground"
            disabled={isLoading}
            placeholder={`Comentario para la publicación ${posts}`}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          <Helper text="Comentario para la publicación." />
          {postsArr.length !== commentsArr.length && (posts || comments) && (
            <p className="text-xs text-red-300 mt-1">Añade un comentario</p>
          )}
        </div>
        <div className="flex gap-2 w-full">
          <Button
            disabled={isDisabled || isLoading}
            aria-disabled={isLoading}
            className="w-full"
            onClick={handleSubmit}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Procesando...
              </>
            ) : (
              "Comentar"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
