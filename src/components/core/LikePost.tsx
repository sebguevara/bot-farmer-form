"use client"

import { useMemo, useState } from "react";
import { GroupNumber } from "./form";
import { groups, splitToArray } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ThumbsUp, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FieldRow, Helper } from "./Utils";
import { Input } from "../ui/input";
import { likePost, likePostSingle } from "@/repositories/agent.repo";
import { LikePostPayload, LikePostSinglePayload } from "@/types";
import { toast } from "sonner";

export const LikePostForm = ({
  isLoading,
  setLoading,
}: {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
}) => {
  const [modeSingle, setModeSingle] = useState(false);
  const [username, setUsername] = useState("");
  const [group, setGroup] = useState<GroupNumber>("1");
  const [posts, setPosts] = useState("");

  const postsArr = useMemo(() => splitToArray(posts), [posts]);

  const isDisabled = useMemo(() => {
    if (modeSingle) {
      return !username || postsArr.length === 0;
    } else {
      return !group || postsArr.length === 0;
    }
  }, [modeSingle, username, postsArr.length, group]);

  const handleSubmit = async () => {
    if (modeSingle) {
      if (!username || postsArr.length === 0) return;
      setLoading(true);
      const payload = { post_id: posts, username } as LikePostSinglePayload;
      try{
        const res = await likePostSingle(payload.post_id, payload.username);
        if (res.status === "success") {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } catch (err: unknown) {
        toast.error(err instanceof Error ? err.message : "Ocurrió un error al procesar la solicitud.");
      } finally {
        setLoading(false);
      }
    } else {
      if (!group || postsArr.length === 0) return;
      setLoading(true);
      const payload = { post_id: posts, group_id: group } as LikePostPayload;
      try{
        const res = await likePost(payload.post_id, payload.group_id);
        if (res.status === "success") {
          toast.success(res.message);
        } else {
          toast.error(res.message);
        }
      } catch (err: unknown) {
        
        toast.error(err instanceof Error ? err.message : "Ocurrió un error al procesar la solicitud.");
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <Card className="rounded-2xl relative w-full min-w-[380px]">
      <CardHeader>
        <div className="flex items-center justify-between">
        <CardTitle className="flex items-center gap-2">
          <ThumbsUp className="h-5 w-5" />
          Dar like a publicaciones
        </CardTitle>
        <div className="flex items-center gap-2">
            <Badge variant={modeSingle ? "outline" : "secondary"}>
              {modeSingle ? "Cuenta" : "Grupo"}
            </Badge>
            <Switch
              checked={modeSingle}
              onCheckedChange={(v) => !isLoading && setModeSingle(v)}
              aria-label="toggle-mode"
              disabled={isLoading}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {modeSingle ? (
          <FieldRow>
            <div className="flex-1">
              <Label className="pb-2">Usuario</Label>
              <Input
                className="border border-accent-foreground"
                placeholder="@cuenta"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
              <Helper text="Cuenta que dará like." />
            </div>
            <div className="flex-1">
              <Label className="pb-2">ID del Post</Label>
              <Input
                className="border border-accent-foreground"
                placeholder="DJaJ14DtKqd"
                value={posts}
                onChange={(e) => setPosts(e.target.value)}
                disabled={isLoading}
              />
              <Helper text="ID de la publicación." />
            </div>
          </FieldRow>
        ) : (
          <FieldRow>
            <div>
              <Label className="pb-2">Número de Grupo</Label>
              <Select
                value={group}
                onValueChange={(v) => !isLoading && (
                  setGroup(v as GroupNumber)
                )}
                disabled={isLoading}
              >
                <SelectTrigger className="border border-accent-foreground"><SelectValue placeholder="Elige grupo" /></SelectTrigger>
                <SelectContent>
                  {groups.map((g) => (
                    <SelectItem key={g} value={g}>{g}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Helper text="Grupo de cuentas (1..8)." />
            </div>
            <div className="flex-1">
              <Label className="pb-2">ID del Post</Label>
              <Input
                className="border border-accent-foreground"
                placeholder="DJaJ14DtKqd"
                value={posts}
                onChange={(e) => setPosts(e.target.value)}
                disabled={isLoading}
              />
              <Helper text="ID de la publicación." />
            </div>
          </FieldRow>
        )}

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
              "Dar like"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>

  );
};
