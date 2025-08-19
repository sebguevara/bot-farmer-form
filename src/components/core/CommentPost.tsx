import { useMemo, useState } from "react";
import { splitToArray } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquarePlus } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { FieldRow, Helper } from "./Utils";
import { QueryPayload } from "./form";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";

export const CommentPostForm = ({ onSubmit, isLoading }: { onSubmit?: (p: QueryPayload) => void, isLoading: boolean }) => {
    const [usernames, setUsernames] = useState("");
    const [posts, setPosts] = useState("");
    const [comments, setComments] = useState("");

    const postsArr = useMemo(() => splitToArray(posts), [posts]);
    const commentsArr = useMemo(() => comments.split(/\n+/).map((s) => s.trim()).filter(Boolean), [comments]);

    const isDisabled = useMemo(() => {
      return !usernames || postsArr.length === 0;
    }, [usernames, postsArr.length]);

    const handleSubmit = () => {
      if (!usernames || postsArr.length === 0) return;
      onSubmit?.({ query: `Comentar en el post ${posts} con la cuenta ${usernames} el comentario "${comments}"` });

      setUsernames("");
      setPosts("");
      setComments("");
    }

    return (
      <Card className="rounded-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MessageSquarePlus className="h-5 w-5"/>Crear comentario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FieldRow>
            <div className="flex-1 md:flex-none w-max">
              <Label className="pb-2">Cuenta</Label>
              <Input className="border border-accent-foreground" disabled={isLoading} placeholder="@cuenta" value={usernames} onChange={(e) => setUsernames(e.target.value)} />
              <Helper text="Cuenta que comentará" />
            </div>
            <div className="flex-1">
              <Label className="pb-2">ID del Post</Label>
              <Input className="border border-accent-foreground" disabled={isLoading} placeholder="DJaJ14DtKqd" value={posts} onChange={(e) => setPosts(e.target.value)} />
              <Helper text="ID de la publicación." />
            </div>
          </FieldRow>
          <div>
            <Label className="pb-2">Comentario</Label>
            <Input className="border border-accent-foreground" disabled={isLoading} placeholder={`Comentario para la publicación ${posts}`} value={comments} onChange={(e) => setComments(e.target.value)} />
            <Helper text="Comentario para la publicación." />
            {postsArr.length !== commentsArr.length && (posts || comments) && (
              <p className="text-xs text-red-300 mt-1">Añade un comentario</p>
            )}
          </div>
          <div className="flex gap-2 w-full">
            <Button disabled={isDisabled || isLoading} aria-disabled={isLoading} className="w-full" onClick={handleSubmit}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Procesando...
                </>
              ) : (
                "Comentar"
              )}</Button>
          </div>
        </CardContent>
      </Card>
    );
  };